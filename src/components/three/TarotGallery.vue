<script setup lang="ts">
import { ref, onMounted, onUnmounted, shallowRef, watch } from 'vue';
import * as THREE from 'three';
import gsap from 'gsap';
import { ALL_CARDS, CARDS_BY_CATEGORY, getCardImagePath, type CardInfo } from '@/data/cards';

// Props
const props = withDefaults(
  defineProps<{
    filter?: 'all' | 'major';
  }>(),
  {
    filter: 'all',
  }
);

// Emits
const emit = defineEmits<{
  cardSelected: [card: CardInfo | null];
}>();

// Refs
const containerRef = ref<HTMLElement | null>(null);
const selectedCard = shallowRef<CardInfo | null>(null);
const isTransitioning = ref(false);

// Three.js objects
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let animationFrameId: number;
let raycaster: THREE.Raycaster;
let mouse: THREE.Vector2;
let cardMeshes: THREE.Mesh[] = [];
let cardMap: Map<THREE.Mesh, CardInfo> = new Map();
let hoveredCard: THREE.Mesh | null = null;
let focusedCard: THREE.Mesh | null = null;
let cameraLight: THREE.SpotLight; // Light that follows camera
let centerHighlight: THREE.PointLight; // Highlight for center card

// Camera state - Position camera to face The Magician (a01)
// After reversing, a01 is at index 21, angle = 21 * 0.45 ≈ 9.45 rad ≈ 3.17 rad (after subtracting 2π)
// This places it roughly at angle π, on the negative X axis
// theta = -PI/2 places camera on negative X axis to face The Magician
const defaultCameraPosition = new THREE.Vector3(-40, 0, 0);
const defaultCameraLookAt = new THREE.Vector3(0, 0, 0);

// Manual camera control state
let isDragging = false;
let hasUserInteracted = false; // Track if user has manually controlled the view
let previousMousePosition = { x: 0, y: 0 };
// theta = -PI/2 means camera on negative X axis
let sphericalPosition = { theta: -Math.PI / 2, phi: Math.PI / 2, radius: 40 };
const MIN_RADIUS = 15;
const MAX_RADIUS = 80;
const MIN_PHI = 0.2; // Prevent camera from going too vertical
const MAX_PHI = Math.PI - 0.2;

// Card dimensions (tarot ratio ~1:1.75)
const CARD_WIDTH = 1.4;
const CARD_HEIGHT = 2.45;
const CARD_DEPTH = 0.02;

// Layout constants
const SPIRAL_RADIUS_START = 6;
const SPIRAL_RADIUS_INCREMENT = 0.25;
const SPIRAL_ANGLE_INCREMENT = 0.45;
const SPIRAL_Y_INCREMENT = 0.12;

function initScene(): void {
  if (!containerRef.value) return;

  const width = containerRef.value.clientWidth;
  const height = containerRef.value.clientHeight;

  // Scene with gradient background
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a0a14);
  scene.fog = new THREE.Fog(0x0a0a14, 30, 80);

  // Camera
  camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 200);
  camera.position.copy(defaultCameraPosition);
  camera.lookAt(defaultCameraLookAt);

  // Renderer
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  containerRef.value.appendChild(renderer.domElement);

  // Raycaster for mouse interaction
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  // Lighting
  setupLighting();

  // Create ambient particles
  createParticles();

  // Load cards
  loadCards();

  // Event listeners
  renderer.domElement.addEventListener('mousemove', onMouseMove);
  renderer.domElement.addEventListener('mousedown', onMouseDown);
  renderer.domElement.addEventListener('mouseup', onMouseUp);
  renderer.domElement.addEventListener('mouseleave', onMouseUp);
  renderer.domElement.addEventListener('wheel', onWheel, { passive: false });
  renderer.domElement.addEventListener('click', onClick);

  // Start render loop
  animate();
}

function setupLighting(): void {
  // Strong ambient light for base illumination
  const ambient = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambient);

  // Hemisphere light for natural sky/ground lighting
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444466, 0.6);
  hemiLight.position.set(0, 50, 0);
  scene.add(hemiLight);

  // Main spotlight from above
  const spotLight = new THREE.SpotLight(0xffffff, 3);
  spotLight.position.set(0, 40, 30);
  spotLight.angle = Math.PI / 3;
  spotLight.penumbra = 0.5;
  spotLight.decay = 1;
  spotLight.distance = 150;
  scene.add(spotLight);

  // Secondary spotlight from the side
  const spotLight2 = new THREE.SpotLight(0xffffff, 2);
  spotLight2.position.set(30, 20, 30);
  spotLight2.angle = Math.PI / 4;
  spotLight2.penumbra = 0.8;
  spotLight2.decay = 1;
  spotLight2.distance = 100;
  scene.add(spotLight2);

  // Accent lights for mystical atmosphere
  const goldLight = new THREE.PointLight(0xc9a227, 2, 80);
  goldLight.position.set(-20, 15, 15);
  scene.add(goldLight);

  const goldLight2 = new THREE.PointLight(0xf4d03f, 1.5, 80);
  goldLight2.position.set(20, -15, 15);
  scene.add(goldLight2);

  const blueLight = new THREE.PointLight(0x3b82f6, 0.8, 60);
  blueLight.position.set(15, -10, 20);
  scene.add(blueLight);

  // Camera-following spotlight to illuminate the active view area
  cameraLight = new THREE.SpotLight(0xffffff, 2);
  cameraLight.angle = Math.PI / 4;
  cameraLight.penumbra = 0.6;
  cameraLight.decay = 1;
  cameraLight.distance = 100;
  scene.add(cameraLight);
  scene.add(cameraLight.target); // Required for spotlight target updates

  // Center highlight - subtle glow for the most centered card
  centerHighlight = new THREE.PointLight(0xc9a227, 0, 15);
  scene.add(centerHighlight);
}

function createParticles(): void {
  const particleCount = 500;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0xc9a227,
    size: 0.1,
    transparent: true,
    opacity: 0.6,
    sizeAttenuation: true,
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  // Animate particles
  gsap.to(particles.rotation, {
    y: Math.PI * 2,
    duration: 200,
    repeat: -1,
    ease: 'none',
  });
}

function loadCards(): void {
  const textureLoader = new THREE.TextureLoader();
  const cardGeometry = new THREE.BoxGeometry(CARD_WIDTH, CARD_HEIGHT, CARD_DEPTH);

  // Get cards based on filter and reverse so first card is on the outside
  const cardsToLoad = (props.filter === 'major' ? CARDS_BY_CATEGORY.major : ALL_CARDS)
    .slice()
    .reverse();

  cardsToLoad.forEach((cardInfo, index) => {
    const texture = textureLoader.load(getCardImagePath(cardInfo));
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    // Card back texture (gold pattern)
    const backMaterial = new THREE.MeshStandardMaterial({
      color: 0xc9a227,
      metalness: 0.5,
      roughness: 0.3,
    });

    // Card front with image
    const frontMaterial = new THREE.MeshStandardMaterial({
      map: texture,
      metalness: 0.1,
      roughness: 0.4,
    });

    // Card edge
    const edgeMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5f5dc,
      metalness: 0.1,
      roughness: 0.8,
    });

    // Materials: right, left, top, bottom, front, back
    const materials = [
      edgeMaterial,
      edgeMaterial,
      edgeMaterial,
      edgeMaterial,
      frontMaterial,
      backMaterial,
    ];

    const mesh = new THREE.Mesh(cardGeometry, materials);

    // Spiral layout
    const angle = index * SPIRAL_ANGLE_INCREMENT;
    const radius = SPIRAL_RADIUS_START + index * SPIRAL_RADIUS_INCREMENT;
    const y = (index - cardsToLoad.length / 2) * SPIRAL_Y_INCREMENT;

    mesh.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);

    // Face toward center, tilted slightly
    mesh.lookAt(0, y, 0);
    mesh.rotateY(Math.PI); // Face outward

    // Store reference including original rotation
    mesh.userData = {
      cardInfo,
      originalPosition: mesh.position.clone(),
      originalRotation: mesh.rotation.clone(),
    };
    cardMap.set(mesh, cardInfo);
    cardMeshes.push(mesh);
    scene.add(mesh);

    // Entrance animation
    const targetPos = mesh.position.clone();
    mesh.position.set(0, -50, 0);
    mesh.scale.set(0, 0, 0);

    gsap.to(mesh.position, {
      x: targetPos.x,
      y: targetPos.y,
      z: targetPos.z,
      duration: 1.5,
      delay: index * 0.02,
      ease: 'power3.out',
    });

    gsap.to(mesh.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 1,
      delay: index * 0.02,
      ease: 'elastic.out(1, 0.5)',
    });
  });
}

function onMouseMove(event: MouseEvent): void {
  if (!containerRef.value) return;

  const rect = containerRef.value.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  // Handle dragging for camera rotation (only when not focused on a card)
  if (isDragging && !focusedCard) {
    hasUserInteracted = true; // User has manually controlled the view
    const deltaX = event.clientX - previousMousePosition.x;
    const deltaY = event.clientY - previousMousePosition.y;

    // Rotate camera around center (spherical coordinates)
    sphericalPosition.theta -= deltaX * 0.005;
    sphericalPosition.phi += deltaY * 0.005;

    // Clamp phi to prevent flipping
    sphericalPosition.phi = Math.max(MIN_PHI, Math.min(MAX_PHI, sphericalPosition.phi));

    // Update camera position from spherical coordinates
    updateCameraFromSpherical();

    previousMousePosition.x = event.clientX;
    previousMousePosition.y = event.clientY;
    return;
  }

  if (isTransitioning.value) return;

  // Raycast for hover
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(cardMeshes);

  if (intersects.length > 0) {
    const newHovered = intersects[0]?.object as THREE.Mesh;
    if (newHovered !== hoveredCard && newHovered !== focusedCard) {
      // Reset previous hovered
      if (hoveredCard && hoveredCard !== focusedCard) {
        gsap.to(hoveredCard.scale, { x: 1, y: 1, z: 1, duration: 0.3 });
      }
      // Highlight new hovered
      hoveredCard = newHovered;
      gsap.to(hoveredCard.scale, { x: 1.1, y: 1.1, z: 1.1, duration: 0.3 });
      containerRef.value.style.cursor = 'pointer';
    }
  } else {
    if (hoveredCard && hoveredCard !== focusedCard) {
      gsap.to(hoveredCard.scale, { x: 1, y: 1, z: 1, duration: 0.3 });
    }
    hoveredCard = null;
    if (containerRef.value) {
      containerRef.value.style.cursor = isDragging ? 'grabbing' : 'grab';
    }
  }
}

function onMouseDown(event: MouseEvent): void {
  // Only start dragging if not clicking on a card
  if (!focusedCard && !hoveredCard) {
    isDragging = true;
    previousMousePosition.x = event.clientX;
    previousMousePosition.y = event.clientY;
    if (containerRef.value) {
      containerRef.value.style.cursor = 'grabbing';
    }
  }
}

function onMouseUp(): void {
  isDragging = false;
  if (containerRef.value && !hoveredCard) {
    containerRef.value.style.cursor = 'grab';
  }
}

function onWheel(event: WheelEvent): void {
  // Only zoom when not focused on a card
  if (focusedCard) return;

  event.preventDefault();
  hasUserInteracted = true; // User has manually controlled the view

  // Zoom in/out
  sphericalPosition.radius += event.deltaY * 0.05;
  sphericalPosition.radius = Math.max(MIN_RADIUS, Math.min(MAX_RADIUS, sphericalPosition.radius));

  updateCameraFromSpherical();
}

function updateCameraFromSpherical(): void {
  // Convert spherical to cartesian coordinates
  const x =
    sphericalPosition.radius * Math.sin(sphericalPosition.phi) * Math.sin(sphericalPosition.theta);
  const y = sphericalPosition.radius * Math.cos(sphericalPosition.phi);
  const z =
    sphericalPosition.radius * Math.sin(sphericalPosition.phi) * Math.cos(sphericalPosition.theta);

  camera.position.set(x, y, z);
  camera.lookAt(defaultCameraLookAt);
}

function onClick(): void {
  if (isTransitioning.value) return;

  if (hoveredCard) {
    if (focusedCard === hoveredCard) {
      // Clicking focused card - unfocus
      unfocusCard();
    } else {
      // Focus on this card
      focusOnCard(hoveredCard);
    }
  } else if (focusedCard) {
    // Clicking empty space - unfocus
    unfocusCard();
  }
}

function focusOnCard(mesh: THREE.Mesh): void {
  isTransitioning.value = true;
  const cardInfo = cardMap.get(mesh);
  selectedCard.value = cardInfo ?? null;
  emit('cardSelected', cardInfo ?? null);

  // Reset previous focused card
  if (focusedCard && focusedCard !== mesh) {
    const prevOriginal = focusedCard.userData.originalPosition;
    gsap.to(focusedCard.position, {
      x: prevOriginal.x,
      y: prevOriginal.y,
      z: prevOriginal.z,
      duration: 0.8,
      ease: 'power2.out',
    });
    gsap.to(focusedCard.rotation, {
      x: focusedCard.userData.originalRotation.x,
      y: focusedCard.userData.originalRotation.y,
      z: focusedCard.userData.originalRotation.z,
      duration: 0.8,
      ease: 'power2.out',
    });
    gsap.to(focusedCard.scale, { x: 1, y: 1, z: 1, duration: 0.5 });
  }

  focusedCard = mesh;

  // Store original rotation if not already stored
  if (!mesh.userData.originalRotation) {
    mesh.userData.originalRotation = mesh.rotation.clone();
  }

  // Calculate the distance needed for the card to appear at 80% of screen height
  // Using: apparent_height = real_height * (1 / (2 * tan(fov/2))) * (screen_height / distance)
  // Solving for distance: distance = real_height / (2 * tan(fov/2) * target_screen_ratio)
  const targetScreenRatio = 0.8; // 80% of screen height
  const fovRad = (camera.fov * Math.PI) / 180;
  const cardDistance = CARD_HEIGHT / (2 * Math.tan(fovRad / 2) * targetScreenRatio);

  // Position the card at a fixed distance in front of the camera
  const cameraDirection = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
  const focusedCardPosition = camera.position
    .clone()
    .add(cameraDirection.multiplyScalar(cardDistance));

  // Animate card moving to position in front of camera
  gsap.to(mesh.position, {
    x: focusedCardPosition.x,
    y: focusedCardPosition.y,
    z: focusedCardPosition.z,
    duration: 1,
    ease: 'power2.out',
  });

  // Calculate rotation to face camera with front side visible
  // The front material is at index 4 which corresponds to +Z face
  // lookAt makes -Z point toward target, so we need to flip 180° around Y
  const targetQuaternion = new THREE.Quaternion();
  const up = new THREE.Vector3(0, 1, 0);
  const rotMatrix = new THREE.Matrix4().lookAt(focusedCardPosition, camera.position, up);
  targetQuaternion.setFromRotationMatrix(rotMatrix);

  // Flip 180° around Y to show front face (+Z) instead of back face (-Z)
  const flipRotation = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI);
  targetQuaternion.multiply(flipRotation);

  // Convert quaternion to euler for GSAP animation
  const targetEuler = new THREE.Euler().setFromQuaternion(targetQuaternion);

  // Create a dramatic rotation animation with an extra spin
  // First, add a full rotation to the current Y rotation for a spinning effect
  const currentRotation = mesh.rotation.clone();
  const spinAmount = Math.PI * 2; // Full 360° spin

  // Animate with a spin: go through intermediate rotation then to final
  gsap.to(mesh.rotation, {
    x: targetEuler.x,
    y: currentRotation.y + spinAmount, // Spin first
    z: targetEuler.z,
    duration: 0.6,
    ease: 'power2.in',
    onComplete: () => {
      // Then settle to final rotation
      gsap.to(mesh.rotation, {
        x: targetEuler.x,
        y: targetEuler.y,
        z: targetEuler.z,
        duration: 0.5,
        ease: 'power2.out',
        onComplete: () => {
          isTransitioning.value = false;
        },
      });
    },
  });

  // Reset scale to 1 since sizing is handled by distance
  gsap.to(mesh.scale, { x: 1, y: 1, z: 1, duration: 0.8, ease: 'power2.out' });

  // Dim other cards
  cardMeshes.forEach((card) => {
    if (card !== mesh) {
      const materials = card.material as THREE.MeshStandardMaterial[];
      materials.forEach((mat) => {
        gsap.to(mat, { opacity: 0.3, duration: 0.5 });
        mat.transparent = true;
      });
    }
  });
}

function unfocusCard(): void {
  isTransitioning.value = true;
  selectedCard.value = null;
  emit('cardSelected', null);

  if (focusedCard) {
    // Restore position
    const originalPos = focusedCard.userData.originalPosition as THREE.Vector3;
    gsap.to(focusedCard.position, {
      x: originalPos.x,
      y: originalPos.y,
      z: originalPos.z,
      duration: 0.8,
      ease: 'power2.out',
    });

    // Restore rotation
    if (focusedCard.userData.originalRotation) {
      const originalRot = focusedCard.userData.originalRotation;
      gsap.to(focusedCard.rotation, {
        x: originalRot.x,
        y: originalRot.y,
        z: originalRot.z,
        duration: 0.8,
        ease: 'power2.out',
      });
    }

    gsap.to(focusedCard.scale, { x: 1, y: 1, z: 1, duration: 0.5 });
    focusedCard = null;
  }

  // Restore all cards opacity
  cardMeshes.forEach((card) => {
    const materials = card.material as THREE.MeshStandardMaterial[];
    materials.forEach((mat) => {
      gsap.to(mat, { opacity: 1, duration: 0.5 });
    });
  });

  // Mark transition complete after animations
  setTimeout(() => {
    isTransitioning.value = false;
  }, 800);
}

function animate(): void {
  animationFrameId = requestAnimationFrame(animate);

  // Update camera-following light
  if (cameraLight) {
    cameraLight.position.copy(camera.position);
    const cameraDirection = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
    cameraLight.target.position.copy(
      camera.position.clone().add(cameraDirection.multiplyScalar(20))
    );
    cameraLight.target.updateMatrixWorld();
  }

  // Find and highlight the card closest to the center of the view (when not focused)
  if (!focusedCard && cardMeshes.length > 0) {
    const cameraDirection = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
    let closestCard: THREE.Mesh | undefined;
    let closestDot = -Infinity;

    for (const mesh of cardMeshes) {
      const toCard = new THREE.Vector3().subVectors(mesh.position, camera.position).normalize();
      const dot = toCard.dot(cameraDirection);
      if (dot > closestDot) {
        closestDot = dot;
        closestCard = mesh;
      }
    }

    // Update center highlight position
    if (closestCard && centerHighlight) {
      centerHighlight.position.copy(closestCard.position);
      // Animate intensity for smooth transition
      gsap.to(centerHighlight, { intensity: 3, duration: 0.3, overwrite: true });
    }
  } else if (focusedCard && centerHighlight) {
    // Highlight the focused card
    centerHighlight.position.copy(focusedCard.position);
    gsap.to(centerHighlight, { intensity: 5, duration: 0.3, overwrite: true });
  }

  // Only auto-rotate when user hasn't interacted and no card is focused
  if (!focusedCard && !isTransitioning.value && !hasUserInteracted && !isDragging) {
    cardMeshes.forEach((mesh) => {
      mesh.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), 0.0003);
      // Update original position to match auto-rotation
      (mesh.userData.originalPosition as THREE.Vector3).copy(mesh.position);
      mesh.lookAt(0, mesh.position.y, 0);
      mesh.rotateY(Math.PI);
      // Update original rotation to match auto-rotation
      (mesh.userData.originalRotation as THREE.Euler).copy(mesh.rotation);
    });
  }

  renderer.render(scene, camera);
}

function handleResize(): void {
  if (!containerRef.value) return;

  const width = containerRef.value.clientWidth;
  const height = containerRef.value.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

function cleanup(): void {
  cancelAnimationFrame(animationFrameId);

  // Kill all GSAP animations
  gsap.killTweensOf(camera.position);
  cardMeshes.forEach((mesh) => {
    gsap.killTweensOf(mesh.position);
    gsap.killTweensOf(mesh.scale);
    gsap.killTweensOf(mesh.rotation);
  });

  renderer.domElement.removeEventListener('mousemove', onMouseMove);
  renderer.domElement.removeEventListener('mousedown', onMouseDown);
  renderer.domElement.removeEventListener('mouseup', onMouseUp);
  renderer.domElement.removeEventListener('mouseleave', onMouseUp);
  renderer.domElement.removeEventListener('wheel', onWheel);
  renderer.domElement.removeEventListener('click', onClick);
  renderer.dispose();

  if (containerRef.value && renderer?.domElement) {
    containerRef.value.removeChild(renderer.domElement);
  }
}

function clearCards(): void {
  // Kill animations for existing cards
  cardMeshes.forEach((mesh) => {
    gsap.killTweensOf(mesh.position);
    gsap.killTweensOf(mesh.scale);
    gsap.killTweensOf(mesh.rotation);

    // Remove from scene
    scene.remove(mesh);

    // Dispose geometry and materials
    mesh.geometry.dispose();
    const materials = mesh.material as THREE.Material[];
    materials.forEach((mat) => mat.dispose());
  });

  // Clear arrays and map
  cardMeshes = [];
  cardMap.clear();
  hoveredCard = null;
  focusedCard = null;
  selectedCard.value = null;
}

function reloadCards(): void {
  if (!scene || !renderer) return;

  // Clear existing cards
  clearCards();

  // Reset camera to default
  hasUserInteracted = false;
  sphericalPosition = { theta: -Math.PI / 2, phi: Math.PI / 2, radius: 40 };
  camera.position.copy(defaultCameraPosition);
  camera.lookAt(defaultCameraLookAt);

  // Load new cards
  loadCards();
}

// Watch for filter changes
watch(
  () => props.filter,
  () => {
    reloadCards();
  }
);

onMounted(() => {
  initScene();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  cleanup();
});

// Expose method for external reset
defineExpose({ unfocusCard });
</script>

<template>
  <div ref="containerRef" class="tarot-gallery" />
</template>

<style scoped lang="scss">
.tarot-gallery {
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, $color-bg-medium 0%, $color-bg-dark 100%);
  cursor: grab;
}
</style>
