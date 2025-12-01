import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { Environment } from "../data/environments";

interface ThreeBackgroundProps {
  environment: Environment;
}

export const ThreeBackground: React.FC<ThreeBackgroundProps> = ({
  environment,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const objectsRef = useRef<THREE.Object3D[]>([]);
  const timeRef = useRef(0);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 35;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    createEnvironmentScene(scene, environment.id);

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      timeRef.current += 0.01;

      objectsRef.current.forEach((obj, index) => {
        const userData = obj.userData;

        if (environment.id === "ocean") {
          if (userData.type === "particle") {
            obj.position.y += Math.sin(timeRef.current + index) * 0.003;
            obj.position.x += Math.cos(timeRef.current * 0.5 + index) * 0.002;
          } else if (userData.type === "wave") {
            obj.position.z =
              Math.sin(timeRef.current * 0.3 + userData.offset) * 5;
            ((obj as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity =
              0.1 + Math.sin(timeRef.current * 0.3 + userData.offset) * 0.05;
          } else if (userData.type === "lightRay") {
            ((obj as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity =
              0.08 + Math.sin(timeRef.current * 0.5 + userData.offset) * 0.04;
          }
        } else if (environment.id === "library") {
          if (userData.type === "particle") {
            obj.position.y -= 0.01;
            if (obj.position.y < -30) obj.position.y = 30;
          } else if (userData.type === "page") {
            obj.rotation.x += 0.002;
            obj.rotation.y += 0.003;
            obj.position.y += Math.sin(timeRef.current + index) * 0.002;
          } else if (userData.type === "sparkle") {
            ((obj as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity =
              Math.abs(Math.sin(timeRef.current * 2 + index)) * 0.6;
          }
        } else if (environment.id === "cafe") {
          if (userData.type === "particle") {
            obj.position.y += 0.02;
            if (obj.position.y > 30) {
              obj.position.y = -30;
              obj.position.x = (Math.random() - 0.5) * 50;
            }
          } else if (userData.type === "steam") {
            obj.position.y += 0.025;
            obj.rotation.z += 0.01;
            ((obj as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity =
              Math.max(0, 0.2 - (obj.position.y + 20) / 100);
            if (obj.position.y > 30) {
              obj.position.y = -20;
              (
                (obj as THREE.Mesh).material as THREE.MeshBasicMaterial
              ).opacity = 0.2;
            }
          }
        }
      });

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      objectsRef.current.forEach((obj) => {
        scene.remove(obj);
        if ((obj as THREE.Mesh).geometry)
          (obj as THREE.Mesh).geometry.dispose();
        if ((obj as THREE.Mesh).material) {
          const material = (obj as THREE.Mesh).material;
          if (Array.isArray(material)) {
            material.forEach((m: THREE.Material) => m.dispose());
          } else {
            (material as THREE.Material).dispose();
          }
        }
      });
      objectsRef.current = [];
      renderer.dispose();
    };
  }, [environment.id]);

  const createEnvironmentScene = (scene: THREE.Scene, envId: string) => {
    objectsRef.current.forEach((obj) => {
      scene.remove(obj);
      if ((obj as THREE.Mesh).geometry) (obj as THREE.Mesh).geometry.dispose();
      if ((obj as THREE.Mesh).material) {
        const material = (obj as THREE.Mesh).material;
        if (Array.isArray(material)) {
          material.forEach((m: THREE.Material) => m.dispose());
        } else {
          (material as THREE.Material).dispose();
        }
      }
    });
    objectsRef.current = [];

    if (envId === "ocean") {
      createOceanScene(scene);
    } else if (envId === "library") {
      createLibraryScene(scene);
    } else if (envId === "cafe") {
      createCafeScene(scene);
    }
  };

  const createOceanScene = (scene: THREE.Scene) => {
    // Light rays from above
    for (let i = 0; i < 8; i++) {
      const geometry = new THREE.CylinderGeometry(0.3, 1.5, 40, 6, 1, true);
      const material = new THREE.MeshBasicMaterial({
        color: 0x4dd0e1,
        transparent: true,
        opacity: 0.08,
        side: THREE.DoubleSide,
      });
      const lightRay = new THREE.Mesh(geometry, material);
      lightRay.position.x = (Math.random() - 0.5) * 60;
      lightRay.position.y = 10;
      lightRay.position.z = (Math.random() - 0.5) * 30;
      lightRay.rotation.x = Math.PI / 2;
      lightRay.rotation.z = (Math.random() - 0.5) * 0.3;
      lightRay.userData = { type: "lightRay", offset: i * 0.5 };
      scene.add(lightRay);
      objectsRef.current.push(lightRay);
    }

    // Floating particles
    for (let i = 0; i < 400; i++) {
      const size = Math.random() * 0.15 + 0.05;
      const geometry = new THREE.SphereGeometry(size, 6, 6);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0.52 + Math.random() * 0.08, 0.6, 0.7),
        transparent: true,
        opacity: 0.4,
      });
      const particle = new THREE.Mesh(geometry, material);
      particle.position.set(
        (Math.random() - 0.5) * 70,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 40
      );
      particle.userData = { type: "particle" };
      scene.add(particle);
      objectsRef.current.push(particle);
    }

    // Wavy rings for depth
    for (let i = 0; i < 5; i++) {
      const geometry = new THREE.TorusGeometry(8 + i * 4, 0.3, 16, 100);
      const material = new THREE.MeshBasicMaterial({
        color: 0x00acc1,
        transparent: true,
        opacity: 0.1,
      });
      const wave = new THREE.Mesh(geometry, material);
      wave.position.y = -10 + i * 5;
      wave.rotation.x = Math.PI / 2;
      wave.userData = { type: "wave", offset: i };
      scene.add(wave);
      objectsRef.current.push(wave);
    }

    // Bubble clusters
    for (let i = 0; i < 30; i++) {
      const geometry = new THREE.SphereGeometry(
        0.2 + Math.random() * 0.3,
        8,
        8
      );
      const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.25,
      });
      const bubble = new THREE.Mesh(geometry, material);
      bubble.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 30
      );

      scene.add(bubble);
      objectsRef.current.push(bubble);

      gsap.to(bubble.position, {
        y: bubble.position.y + 30,
        duration: 8 + Math.random() * 6,
        repeat: -1,
        ease: "none",
        onRepeat: () => {
          bubble.position.y = -30;
        },
      });
    }
  };

  const createLibraryScene = (scene: THREE.Scene) => {
    // Dust particles in sunlight
    for (let i = 0; i < 300; i++) {
      const size = Math.random() * 0.08 + 0.02;
      const geometry = new THREE.SphereGeometry(size, 6, 6);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0.75 + Math.random() * 0.1, 0.3, 0.8),
        transparent: true,
        opacity: 0.35,
      });
      const particle = new THREE.Mesh(geometry, material);
      particle.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 40
      );
      particle.userData = { type: "particle" };
      scene.add(particle);
      objectsRef.current.push(particle);
    }

    // Floating pages
    for (let i = 0; i < 15; i++) {
      const geometry = new THREE.PlaneGeometry(0.8, 1.2);
      const material = new THREE.MeshBasicMaterial({
        color: 0xf5f5f5,
        transparent: true,
        opacity: 0.2,
        side: THREE.DoubleSide,
      });
      const page = new THREE.Mesh(geometry, material);
      page.position.set(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 30
      );
      page.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      page.userData = { type: "page" };
      scene.add(page);
      objectsRef.current.push(page);
    }

    // Sparkle/magic dust
    for (let i = 0; i < 50; i++) {
      const geometry = new THREE.SphereGeometry(0.12, 8, 8);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0.7 + Math.random() * 0.15, 0.7, 0.8),
        transparent: true,
        opacity: 0.5,
      });
      const sparkle = new THREE.Mesh(geometry, material);
      sparkle.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 35
      );
      sparkle.userData = { type: "sparkle" };
      scene.add(sparkle);
      objectsRef.current.push(sparkle);
    }

    // Book-like shapes in distance
    for (let i = 0; i < 12; i++) {
      const geometry = new THREE.BoxGeometry(0.4, 0.6, 0.08);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0.72 + Math.random() * 0.1, 0.4, 0.5),
        transparent: true,
        opacity: 0.25,
      });
      const book = new THREE.Mesh(geometry, material);
      book.position.set(
        (Math.random() - 0.5) * 55,
        (Math.random() - 0.5) * 45,
        (Math.random() - 0.5) * 35
      );
      book.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      scene.add(book);
      objectsRef.current.push(book);

      gsap.to(book.rotation, {
        y: book.rotation.y + Math.PI * 2,
        duration: 12 + Math.random() * 8,
        repeat: -1,
        ease: "none",
      });

      gsap.to(book.position, {
        y: book.position.y + 4,
        duration: 6 + Math.random() * 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  };

  const createCafeScene = (scene: THREE.Scene) => {
    // Rising steam wisps
    for (let i = 0; i < 20; i++) {
      const points = [];
      for (let j = 0; j < 10; j++) {
        points.push(
          new THREE.Vector3(
            Math.sin(j * 0.5) * 0.5,
            j * 0.8,
            Math.cos(j * 0.5) * 0.5
          )
        );
      }
      const geometry = new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(points),
        20,
        0.15,
        8,
        false
      );
      const material = new THREE.MeshBasicMaterial({
        color: 0xf5f5f5,
        transparent: true,
        opacity: 0.2,
      });
      const steam = new THREE.Mesh(geometry, material);
      steam.position.set(
        (Math.random() - 0.5) * 40,
        -20,
        (Math.random() - 0.5) * 30
      );
      steam.userData = { type: "steam" };
      scene.add(steam);
      objectsRef.current.push(steam);
    }

    // Warm floating particles
    for (let i = 0; i < 250; i++) {
      const size = Math.random() * 0.12 + 0.04;
      const geometry = new THREE.SphereGeometry(size, 6, 6);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0.08 + Math.random() * 0.05, 0.6, 0.7),
        transparent: true,
        opacity: 0.3,
      });
      const particle = new THREE.Mesh(geometry, material);
      particle.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 40
      );
      particle.userData = { type: "particle" };
      scene.add(particle);
      objectsRef.current.push(particle);
    }

    // Coffee bean shapes
    for (let i = 0; i < 25; i++) {
      const geometry = new THREE.SphereGeometry(0.15, 8, 8);
      const material = new THREE.MeshBasicMaterial({
        color: 0x6d4c41,
        transparent: true,
        opacity: 0.25,
      });
      const bean = new THREE.Mesh(geometry, material);
      bean.position.set(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 45,
        (Math.random() - 0.5) * 35
      );

      scene.add(bean);
      objectsRef.current.push(bean);

      gsap.to(bean.rotation, {
        x: Math.PI * 2,
        y: Math.PI * 2,
        duration: 8 + Math.random() * 6,
        repeat: -1,
        ease: "none",
      });

      gsap.to(bean.position, {
        y: bean.position.y + 3,
        duration: 4 + Math.random() * 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    // Warm glow orbs
    for (let i = 0; i < 15; i++) {
      const geometry = new THREE.SphereGeometry(0.8, 16, 16);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0.08, 0.8, 0.6),
        transparent: true,
        opacity: 0.08,
      });
      const glow = new THREE.Mesh(geometry, material);
      glow.position.set(
        (Math.random() - 0.5) * 55,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 35
      );

      scene.add(glow);
      objectsRef.current.push(glow);

      gsap.to(glow.scale, {
        x: 1.3,
        y: 1.3,
        z: 1.3,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(glow.material, {
        opacity: 0.15,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  };

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, opacity: 0.7 }}
    />
  );
};
