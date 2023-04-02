import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface TextTextureProps {
  text: string;
}

const TextTexture = ({ text }: TextTextureProps) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d") as CanvasRenderingContext2D;

  const fontSize = 40;
  context.font = `${fontSize}px Arial`;
  canvas.width = context.measureText(text).width;
  canvas.height = fontSize * 1.5;

  context.font = `${fontSize}px Arial`;
  context.textBaseline = "top";
  context.fillText(text, 0, 0);

  return new THREE.CanvasTexture(canvas);
};

interface TableRowProps {
  text: string;
  position: [number, number, number];
  color: string;
}

const TableRow: React.FC<TableRowProps> = ({ text, position, color }: TableRowProps) => {
  const textTexture = TextTexture({ text });
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[4, 1, 0.1]} />
      <meshStandardMaterial map={textTexture} color={color} />
    </mesh>
  );
};

interface DataEntry {
  id: number;
  name: string;
  age: number;
}

const Scrollable3DTable: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  const handleTouchMove = (e: React.TouchEvent) => {
    const deltaY = e.changedTouches[0].clientY - scrollY;
    setScrollY((prevScrollY) => prevScrollY + deltaY * 0.01);
  };

  const data: DataEntry[] = [
    { id: 1, name: "Alice", age: 30 },
    { id: 2, name: "Bob", age: 25 },
    { id: 3, name: "Charlie", age: 35 },
    // Add more data here as needed
  ];

  return (
    <div
      onTouchMove={handleTouchMove}
      style={{ width: "100vw", height: "100vh" }}
    >
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        {data.map((row, index) => (
          <TableRow
            key={row.id}
            text={`${row.id} ${row.name} ${row.age}`}
            position={[0, index * -2 + scrollY, 0]}
            color={index % 2 === 0 ? "white" : "lightgray"}
          />
        ))}
      </Canvas>
    </div>
  );
};

export default Scrollable3DTable;
