"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import styles from "./CinematicLayer.module.css";

export default function CinematicLayer() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Renderer ─────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      52,
      window.innerWidth / window.innerHeight,
      0.1,
      140
    );
    camera.position.z = 36;

    // ── Particles ─────────────────────────────────────────────────
    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile ? 80 : 160;

    const positions = new Float32Array(COUNT * 3);
    const colors    = new Float32Array(COUNT * 3);
    const sizes     = new Float32Array(COUNT);
    const baseData  = [];

    // Palette: warm amber, cream, faint electric-blue
    const PALETTE = [
      new THREE.Color(0xffa05c), // amber
      new THREE.Color(0xffcf99), // peach
      new THREE.Color(0xfff5e8), // cream
      new THREE.Color(0x90c8ff), // cool blue accent
      new THREE.Color(0xffdc96), // warm gold
    ];

    for (let i = 0; i < COUNT; i++) {
      const x = (Math.random() - 0.5) * 80;
      const y = (Math.random() - 0.5) * 48;
      const z = (Math.random() - 0.5) * 52;

      positions[i * 3]     = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      baseData.push({
        x, y, z,
        phase:  Math.random() * Math.PI * 2,
        phase2: Math.random() * Math.PI * 2,
        speedX: 0.16 + Math.random() * 0.28,
        speedY: 0.12 + Math.random() * 0.20,
        ampX:   0.55 + Math.random() * 0.9,
        ampY:   0.40 + Math.random() * 0.7,
      });

      // Weighted palette: mostly amber/cream, occasional blue
      const roll = Math.random();
      const c =
        roll < 0.38 ? PALETTE[0] :
        roll < 0.62 ? PALETTE[4] :
        roll < 0.80 ? PALETTE[2] :
        roll < 0.92 ? PALETTE[1] :
                       PALETTE[3];

      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      // Variable sizes — a few large bokeh blooms, mostly small
      sizes[i] = roll < 0.08
        ? 18 + Math.random() * 28
        : roll < 0.25
        ? 8  + Math.random() * 14
        : 2  + Math.random() * 7;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color",    new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size",     new THREE.BufferAttribute(sizes, 1));

    // Custom soft-disc shader — smooth gaussian bokeh
    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite:  false,
      blending:    THREE.AdditiveBlending,
      vertexColors: true,
      uniforms: {
        uTime:       { value: 0 },
        uPixelRatio: { value: renderer.getPixelRatio() },
      },
      vertexShader: `
        attribute float size;
        varying vec3  vColor;
        varying float vAlpha;
        uniform float uPixelRatio;

        void main() {
          vColor = color;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          // deeper particles are more transparent
          float depth = clamp(1.0 - (-mv.z - 5.0) / 50.0, 0.12, 1.0);
          vAlpha = depth;
          gl_PointSize = size * uPixelRatio * (32.0 / -mv.z);
          gl_Position  = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        varying vec3  vColor;
        varying float vAlpha;

        void main() {
          vec2  uv = gl_PointCoord - 0.5;
          float d  = length(uv);

          // Soft gaussian bokeh disc
          float alpha = exp(-d * d * 9.0) * 0.62 * vAlpha;

          if (alpha < 0.004) discard;
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // ── Mouse parallax ────────────────────────────────────────────
    const mouse  = { x: 0, y: 0 };
    const camTarget = { x: 0, y: 0 };

    const onMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onTouch = (e) => {
      if (!e.touches[0]) return;
      mouse.x = (e.touches[0].clientX / window.innerWidth  - 0.5) * 2;
      mouse.y = (e.touches[0].clientY / window.innerHeight - 0.5) * 2;
    };
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.uPixelRatio.value = renderer.getPixelRatio();
    };

    window.addEventListener("mousemove",  onMove,   { passive: true });
    window.addEventListener("touchmove",  onTouch,  { passive: true });
    window.addEventListener("resize",     onResize);

    // ── Render loop ───────────────────────────────────────────────
    const clock = new THREE.Clock();
    let   raf   = 0;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t   = clock.getElapsedTime();
      const pos = geometry.attributes.position.array;

      for (let i = 0; i < COUNT; i++) {
        const b = baseData[i];
        pos[i * 3]     = b.x + Math.sin(t * b.speedX + b.phase)  * b.ampX;
        pos[i * 3 + 1] = b.y + Math.cos(t * b.speedY + b.phase2) * b.ampY;
        // z gently breathes
        pos[i * 3 + 2] = b.z + Math.sin(t * 0.08 + b.phase)      * 1.2;
      }
      geometry.attributes.position.needsUpdate = true;

      // Very slow, dreamy camera drift
      camTarget.x += (mouse.x * 1.6 - camTarget.x) * 0.028;
      camTarget.y += (-mouse.y * 1.1 - camTarget.y) * 0.028;
      camera.position.x = camTarget.x;
      camera.position.y = camTarget.y;
      camera.lookAt(0, 0, 0);

      material.uniforms.uTime.value = t;
      renderer.render(scene, camera);
    };
    animate();

    // ── Cleanup ───────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("resize",    onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className={styles.layer} aria-hidden="true" />;
}
