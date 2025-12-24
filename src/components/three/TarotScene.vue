<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import gsap from 'gsap';

const { t } = useI18n();

const containerRef = ref<HTMLElement | null>(null);
const isAnimating = ref(false);

let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let controls: OrbitControls;
let cardMesh: THREE.Mesh;
let animationFrameId: number;

function initScene(): void {
  if (!containerRef.value) return;

  const width = containerRef.value.clientWidth;
  const height = containerRef.value.clientHeight;

  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1a1a2e);

  // Camera
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 5;

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  containerRef.value.appendChild(renderer.domElement);

  // Controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  // Card mesh
  const cardGeometry = new THREE.BoxGeometry(1.4, 2.4, 0.05);
  const cardMaterial = new THREE.MeshStandardMaterial({
    color: 0xc9a227,
    metalness: 0.3,
    roughness: 0.4,
  });
  cardMesh = new THREE.Mesh(cardGeometry, cardMaterial);
  scene.add(cardMesh);

  // Initial animation
  gsap.from(cardMesh.scale, {
    x: 0,
    y: 0,
    z: 0,
    duration: 1,
    ease: 'elastic.out(1, 0.5)',
  });

  // Start render loop
  animate();
}

function animate(): void {
  animationFrameId = requestAnimationFrame(animate);
  controls.update();
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

function flipCard(): void {
  if (isAnimating.value || !cardMesh) return;

  isAnimating.value = true;

  gsap.to(cardMesh.rotation, {
    y: cardMesh.rotation.y + Math.PI,
    duration: 0.8,
    ease: 'power2.inOut',
    onComplete: () => {
      isAnimating.value = false;
    },
  });
}

function cleanup(): void {
  cancelAnimationFrame(animationFrameId);
  gsap.killTweensOf(cardMesh?.rotation);
  gsap.killTweensOf(cardMesh?.scale);

  controls?.dispose();
  renderer?.dispose();

  if (containerRef.value && renderer?.domElement) {
    containerRef.value.removeChild(renderer.domElement);
  }
}

onMounted(() => {
  initScene();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  cleanup();
});
</script>

<template>
  <div class="tarot-scene">
    <div ref="containerRef" class="scene-container" />

    <div class="scene-controls">
      <button class="control-button" :disabled="isAnimating" @click="flipCard">
        {{ t('actions.flip') }}
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tarot-scene {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: $spacing-4;
}

.scene-container {
  flex: 1;
  min-height: 400px;
  border-radius: $radius-lg;
  overflow: hidden;
  box-shadow: $shadow-lg;
}

.scene-controls {
  display: flex;
  justify-content: center;
  gap: $spacing-4;
}

.control-button {
  padding: $spacing-3 $spacing-8;
  font-size: $font-size-base;
  font-weight: $font-weight-semibold;
  color: $color-bg-dark;
  background: $gradient-primary;
  border-radius: $radius-md;
  transition:
    transform $transition-base,
    box-shadow $transition-base;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: $shadow-glow-primary-intense;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}
</style>
