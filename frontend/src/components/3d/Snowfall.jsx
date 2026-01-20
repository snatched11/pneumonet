import { Canvas } from "@react-three/fiber";
import Particles from "./Particles";

const Snowfall = () => {
    return (
        <Canvas
            camera={{ position: [0, 0, 5], fov: 75 }}
            style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                zIndex: 10,
            }}
        >
            <Particles count={600} />
        </Canvas>
    );
};

export default Snowfall;
