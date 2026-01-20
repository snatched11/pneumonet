import { useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

const Particles = ({ count }) => {
    const mesh = useRef();

    // 👇 Load custom texture from public folder
    const texture = useLoader(THREE.TextureLoader, "/textures/star.png");

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            temp.push({
                position: [
                    (Math.random() - 0.5) * 10,
                    Math.random() * 10 - 2,
                    (Math.random() - 0.5) * 10,
                ],
                speed: 0.005 + Math.random() * 0.001,
            });
        }
        return temp;
    }, [count]);

    // 🔒 Prevent crash by checking if ref is ready
    useFrame(() => {
        if (!mesh.current) return;
        const positions = mesh.current.geometry.attributes.position.array;
        for (let i = 0; i < count; i++) {
            let y = positions[i * 3 + 1];
            y -= particles[i].speed;
            if (y < -2) y = Math.random() * 10 + 5;
            positions[i * 3 + 1] = y;
        }
        mesh.current.geometry.attributes.position.needsUpdate = true;
    });

    const positions = new Float32Array(count * 3);
    particles.forEach((p, i) => {
        positions[i * 3] = p.position[0];
        positions[i * 3 + 1] = p.position[1];
        positions[i * 3 + 2] = p.position[2];
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                map={texture}
                size={0.05}
                transparent
                opacity={0.7}
                sizeAttenuation
                depthWrite={false}
                alphaTest={0.01}
                blending={THREE.AdditiveBlending}
                color="aliceblue"
            />
        </points>
    );
};

export default Particles;
