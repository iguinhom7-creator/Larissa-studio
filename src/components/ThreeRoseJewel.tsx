/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Sparkles, RotateCw, Eye, EyeOff, Palette, Sun } from 'lucide-react';

export type FinishType = 'rose_satin' | 'rose_gold' | 'nude_pearl';

interface ThreeRoseJewelProps {
  className?: string;
  initialFinish?: FinishType;
}

export const ThreeRoseJewel: React.FC<ThreeRoseJewelProps> = ({
  className = '',
  initialFinish = 'rose_satin',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [currentFinish, setCurrentFinish] = useState<FinishType>(initialFinish);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [lightingPreset, setLightingPreset] = useState<'studio' | 'warm'>('studio');
  const [isRotating, setIsRotating] = useState(true);

  // References to keep mutable states across render loops
  const finishRef = useRef<FinishType>(currentFinish);
  finishRef.current = currentFinish;

  const rotatingRef = useRef(isRotating);
  rotatingRef.current = isRotating;

  const lightingRef = useRef(lightingPreset);
  lightingRef.current = lightingPreset;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL to adapt frame pacing and features
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    // Width and height
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 420;

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.background = null; // transparent background so it integrates into white canvas
    scene.fog = new THREE.FogExp2('#fff5f8', 0.08);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 3.8);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Studio Environment map via PMREMGenerator
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    const envTexture = pmremGenerator.fromScene(roomEnv, 0.04).texture;
    scene.environment = envTexture;
    pmremGenerator.dispose();

    // Lighting Rig (3-point balanced studio rig)
    const keyLight = new THREE.DirectionalLight('#fff5ea', 2.4);
    keyLight.position.set(3, 4, 3);
    keyLight.castShadow = !isSoftwareGl;
    if (keyLight.castShadow) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const fillLight = new THREE.HemisphereLight('#ffffff', '#fdf2f4', 1.1);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight('#f9a8d4', 1.6);
    rimLight.position.set(-3, 2, -3);
    scene.add(rimLight);

    // Procedural Contact Shadow Ground
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const grad = sCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, 'rgba(157, 50, 84, 0.22)');
      grad.addColorStop(0.4, 'rgba(157, 50, 84, 0.08)');
      grad.addColorStop(1, 'rgba(157, 50, 84, 0)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    shadowTexture.colorSpace = THREE.SRGBColorSpace;
    const shadowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(3.5, 3.5),
      new THREE.MeshBasicMaterial({
        map: shadowTexture,
        transparent: true,
        opacity: 0.7,
        depthWrite: false,
      })
    );
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.92;
    scene.add(shadowPlane);

    // Composite 3–12 Part Procedural Model: "Emblema Rosa Escultural & Pérola"
    const jewelGroup = new THREE.Group();
    scene.add(jewelGroup);

    // Material definitions for finishes
    const materials = {
      rose_satin: {
        petal: new THREE.MeshPhysicalMaterial({
          color: new THREE.Color('#f4a6b8'),
          roughness: 0.22,
          metalness: 0.08,
          clearcoat: 0.8,
          clearcoatRoughness: 0.15,
          sheen: 0.9,
          sheenColor: new THREE.Color('#fce7f3'),
        }),
        metalRing: new THREE.MeshStandardMaterial({
          color: new THREE.Color('#e0a4b3'),
          roughness: 0.25,
          metalness: 0.88,
        }),
      },
      rose_gold: {
        petal: new THREE.MeshStandardMaterial({
          color: new THREE.Color('#e8a1b0'),
          roughness: 0.18,
          metalness: 0.85,
        }),
        metalRing: new THREE.MeshStandardMaterial({
          color: new THREE.Color('#f2b4c2'),
          roughness: 0.15,
          metalness: 0.95,
        }),
      },
      nude_pearl: {
        petal: new THREE.MeshPhysicalMaterial({
          color: new THREE.Color('#fcf2f4'),
          roughness: 0.15,
          metalness: 0.15,
          clearcoat: 1.0,
          clearcoatRoughness: 0.08,
          ior: 1.55,
          transmission: isSoftwareGl ? 0 : 0.25,
        }),
        metalRing: new THREE.MeshStandardMaterial({
          color: new THREE.Color('#d98b9f'),
          roughness: 0.28,
          metalness: 0.82,
        }),
      },
    };

    const pearlMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#fff9fa'),
      roughness: 0.12,
      metalness: 0.25,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      sheen: 1.0,
      sheenColor: new THREE.Color('#fbcfe8'),
    });

    const dewMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#ffffff'),
      roughness: 0.04,
      metalness: 0.0,
      transmission: isSoftwareGl ? 0 : 0.85,
      ior: 1.45,
      transparent: true,
      opacity: 0.9,
    });

    // Sub-part 1: Central Lustrous Natural Pearl
    const pearlGeo = new THREE.SphereGeometry(0.3, 32, 32);
    const pearl = new THREE.Mesh(pearlGeo, pearlMaterial);
    pearl.position.y = 0.15;
    pearl.castShadow = !isSoftwareGl;
    jewelGroup.add(pearl);

    // Array to track petal meshes for finish updates
    const petalMeshes: THREE.Mesh[] = [];
    const ringMeshes: THREE.Mesh[] = [];

    // Helper to create curved sculptural petals
    function createPetalMesh(radius: number, angleSpan: number, heightSpan: number) {
      const shape = new THREE.Shape();
      const hw = radius * 0.8;
      shape.moveTo(0, 0);
      shape.quadraticCurveTo(hw, heightSpan * 0.5, 0, heightSpan);
      shape.quadraticCurveTo(-hw, heightSpan * 0.5, 0, 0);

      const extrudeSettings = {
        steps: 2,
        depth: 0.04,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.02,
        bevelSegments: 3,
      };
      return new THREE.ExtrudeGeometry(shape, extrudeSettings);
    }

    // Sub-parts 2: Inner blooming spiral petals (3 petals)
    const innerPetalGeo = createPetalMesh(0.28, 1.2, 0.55);
    for (let i = 0; i < 3; i++) {
      const angle = (i * Math.PI * 2) / 3;
      const mesh = new THREE.Mesh(innerPetalGeo, materials.rose_satin.petal);
      mesh.rotation.y = angle;
      mesh.rotation.x = 0.35;
      mesh.rotation.z = -0.15;
      mesh.position.set(Math.sin(angle) * 0.12, 0.05, Math.cos(angle) * 0.12);
      mesh.castShadow = !isSoftwareGl;
      jewelGroup.add(mesh);
      petalMeshes.push(mesh);
    }

    // Sub-parts 3: Middle blooming petals (4 petals)
    const midPetalGeo = createPetalMesh(0.42, 1.5, 0.75);
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI * 2) / 4 + 0.45;
      const mesh = new THREE.Mesh(midPetalGeo, materials.rose_satin.petal);
      mesh.rotation.y = angle;
      mesh.rotation.x = 0.55;
      mesh.position.set(Math.sin(angle) * 0.28, -0.05, Math.cos(angle) * 0.28);
      mesh.castShadow = !isSoftwareGl;
      jewelGroup.add(mesh);
      petalMeshes.push(mesh);
    }

    // Sub-parts 4: Outer flared sculptural petals (5 petals)
    const outerPetalGeo = createPetalMesh(0.55, 1.8, 0.95);
    for (let i = 0; i < 5; i++) {
      const angle = (i * Math.PI * 2) / 5 + 0.2;
      const mesh = new THREE.Mesh(outerPetalGeo, materials.rose_satin.petal);
      mesh.rotation.y = angle;
      mesh.rotation.x = 0.85;
      mesh.position.set(Math.sin(angle) * 0.45, -0.18, Math.cos(angle) * 0.45);
      mesh.castShadow = !isSoftwareGl;
      jewelGroup.add(mesh);
      petalMeshes.push(mesh);
    }

    // Sub-part 5: Rose Gold Floral Collar Ring
    const collarGeo = new THREE.TorusGeometry(0.68, 0.045, 16, 48);
    const collar = new THREE.Mesh(collarGeo, materials.rose_satin.metalRing);
    collar.rotation.x = Math.PI / 2;
    collar.position.y = -0.28;
    collar.castShadow = !isSoftwareGl;
    jewelGroup.add(collar);
    ringMeshes.push(collar);

    // Sub-part 6: Polished Beveled Pedestal Base
    const baseGeo = new THREE.CylinderGeometry(0.45, 0.65, 0.15, 32);
    const baseMesh = new THREE.Mesh(baseGeo, materials.rose_satin.metalRing);
    baseMesh.position.y = -0.58;
    baseMesh.castShadow = !isSoftwareGl;
    jewelGroup.add(baseMesh);
    ringMeshes.push(baseMesh);

    // Sub-part 7: Accent Dew Droplets on Petals
    const dew1 = new THREE.Mesh(new THREE.SphereGeometry(0.06, 16, 16), dewMaterial);
    dew1.position.set(0.45, 0.28, 0.35);
    jewelGroup.add(dew1);

    const dew2 = new THREE.Mesh(new THREE.SphereGeometry(0.045, 16, 16), dewMaterial);
    dew2.position.set(-0.35, 0.12, 0.52);
    jewelGroup.add(dew2);

    const dew3 = new THREE.Mesh(new THREE.SphereGeometry(0.05, 16, 16), dewMaterial);
    dew3.position.set(0.18, 0.45, -0.28);
    jewelGroup.add(dew3);

    // Smooth Interactive Mouse & Touch Damping
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationX = 0.2;
    let targetRotationY = 0.5;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      container.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      targetRotationY += deltaX * 0.008;
      targetRotationX += deltaY * 0.008;
      // Clamp X rotation so it doesn't flip underneath
      targetRotationX = Math.max(-0.4, Math.min(0.9, targetRotationX));
    };

    const onPointerUp = (e: PointerEvent) => {
      isDragging = false;
      try {
        container.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    };

    container.addEventListener('pointerdown', onPointerDown);
    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerup', onPointerUp);
    container.addEventListener('pointercancel', onPointerUp);

    // Resize Observer
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      if (newWidth === 0 || newHeight === 0) return;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop with exponential damping
    let frameId = 0;
    const clock = new THREE.Clock();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function tick() {
      const delta = clock.getDelta();

      // Idle auto-rotation if enabled and not dragging
      if (rotatingRef.current && !isDragging) {
        targetRotationY += delta * 0.35;
      }

      // Smooth exponential damping
      jewelGroup.rotation.y = THREE.MathUtils.damp(jewelGroup.rotation.y, targetRotationY, 4.5, delta);
      jewelGroup.rotation.x = THREE.MathUtils.damp(jewelGroup.rotation.x, targetRotationX, 4.5, delta);

      // Subtle breathing float on Y
      jewelGroup.position.y = Math.sin(clock.getElapsedTime() * 1.5) * 0.035;

      // Update finish if changed
      const currentFinishStyle = materials[finishRef.current];
      if (currentFinishStyle) {
        petalMeshes.forEach((mesh) => {
          if (mesh.material !== currentFinishStyle.petal) {
            mesh.material = currentFinishStyle.petal;
          }
        });
        ringMeshes.forEach((mesh) => {
          if (mesh.material !== currentFinishStyle.metalRing) {
            mesh.material = currentFinishStyle.metalRing;
          }
        });
      }

      // Update lighting presets
      if (lightingRef.current === 'warm') {
        keyLight.color.set('#fde68a');
        keyLight.intensity = 2.8;
        rimLight.color.set('#fb7185');
      } else {
        keyLight.color.set('#fff5ea');
        keyLight.intensity = 2.4;
        rimLight.color.set('#f9a8d4');
      }

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    tick();

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointerdown', onPointerDown);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerup', onPointerUp);
      container.removeEventListener('pointercancel', onPointerUp);

      // Dispose resources
      renderer.dispose();
      envTexture.dispose();
      shadowTexture.dispose();
      pearlGeo.dispose();
      innerPetalGeo.dispose();
      midPetalGeo.dispose();
      outerPetalGeo.dispose();
      collarGeo.dispose();
      baseGeo.dispose();
      pearlMaterial.dispose();
      dewMaterial.dispose();
      Object.values(materials).forEach((m) => {
        m.petal.dispose();
        m.metalRing.dispose();
      });

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className={`relative flex flex-col items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-b from-rose-50/40 via-white to-pink-50/30 border border-rose-100/80 shadow-sm ${className}`}>
      {/* Discreet 3D badge indicator */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 text-xs text-rose-900/70 font-medium bg-white/90 px-3 py-1 rounded-full border border-rose-200/50 shadow-xs">
        <Sparkles className="w-3.5 h-3.5 text-rose-400" />
        <span>Emblema 3D Interativo</span>
        <span className="text-rose-300">·</span>
        <span className="text-neutral-500 font-normal">Arraste para girar</span>
      </div>

      {/* Quick toggle for auto-rotation */}
      <button
        onClick={() => setIsRotating((prev) => !prev)}
        title={isRotating ? 'Pausar rotação automática' : 'Ativar rotação automática'}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 text-rose-700 hover:text-rose-900 border border-rose-200/50 hover:bg-white shadow-xs transition-colors"
      >
        <RotateCw className={`w-3.5 h-3.5 transition-transform ${isRotating ? 'animate-spin-slow' : 'opacity-60'}`} />
      </button>

      {/* WebGL Canvas mount */}
      <div
        ref={mountRef}
        className="w-full h-80 sm:h-96 cursor-grab active:cursor-grabbing touch-none select-none"
      />

      {/* Collapsible Unified Bottom Control Dock (Three.js Skill Directive: <= 15% footprint, solid/rgba surfaces) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 w-[92%] max-w-sm">
        <div className="flex flex-col items-center">
          {/* Collapse / Expand Toggle Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="mb-1.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[11px] font-medium text-rose-800 border border-rose-200/70 shadow-xs hover:bg-rose-50 transition-colors"
          >
            {isCollapsed ? (
              <>
                <Eye className="w-3 h-3 text-rose-500" />
                <span>Personalizar Acabamento 3D</span>
              </>
            ) : (
              <>
                <EyeOff className="w-3 h-3 text-neutral-400" />
                <span>Ocultar Controles</span>
              </>
            )}
          </button>

          {/* Controls Bar */}
          {!isCollapsed && (
            <div className="w-full bg-white/95 rounded-2xl p-2.5 border border-rose-200/70 shadow-md flex items-center justify-between gap-2">
              <div className="flex items-center gap-1">
                <Palette className="w-3.5 h-3.5 text-rose-500 ml-1 mr-1" />
                <button
                  onClick={() => setCurrentFinish('rose_satin')}
                  className={`px-2 py-1 text-[11px] font-medium rounded-lg transition-colors ${
                    currentFinish === 'rose_satin'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'text-neutral-600 hover:text-rose-900 hover:bg-rose-50'
                  }`}
                >
                  Rosa Cetim
                </button>
                <button
                  onClick={() => setCurrentFinish('rose_gold')}
                  className={`px-2 py-1 text-[11px] font-medium rounded-lg transition-colors ${
                    currentFinish === 'rose_gold'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'text-neutral-600 hover:text-rose-900 hover:bg-rose-50'
                  }`}
                >
                  Ouro Rosé
                </button>
                <button
                  onClick={() => setCurrentFinish('nude_pearl')}
                  className={`px-2 py-1 text-[11px] font-medium rounded-lg transition-colors ${
                    currentFinish === 'nude_pearl'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'text-neutral-600 hover:text-rose-900 hover:bg-rose-50'
                  }`}
                >
                  Pérola
                </button>
              </div>

              <div className="h-4 w-px bg-rose-200" />

              {/* Lighting preset */}
              <button
                onClick={() => setLightingPreset((prev) => (prev === 'studio' ? 'warm' : 'studio'))}
                title="Alternar iluminação estúdio / quente"
                className="p-1.5 rounded-lg text-rose-700 hover:bg-rose-50 text-[11px] flex items-center gap-1 transition-colors"
              >
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span className="hidden sm:inline text-[10px] text-neutral-500">
                  {lightingPreset === 'studio' ? 'Estúdio' : 'Quente'}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
