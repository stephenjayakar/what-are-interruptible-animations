import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface TextTextureProps {
  text: string;
  color: string;
  bgColor: string;
}

const TextTexture = ({ text, color, bgColor }: TextTextureProps) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d") as CanvasRenderingContext2D;

  const fontSize = 80; // Increase the font size
  const scaleFactor = 2; // Add scale factor
  context.font = `${fontSize}px Arial`;
  canvas.width = context.measureText(text).width * scaleFactor;
  canvas.height = fontSize * 1.5 * scaleFactor;

  context.fillStyle = bgColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = color;
  context.font = `${fontSize}px Arial`;
  context.textBaseline = "top";
  context.scale(scaleFactor, scaleFactor); // Apply scale
  context.fillText(text, 0, 0);

  return new THREE.CanvasTexture(canvas);
};

interface TableProps {
  data: DataEntry[];
  isDragging: boolean;
  scrollY: number;
  setScrollY: (scrollY: number) => void;
}

const m = 1;
const k = 10;
const c = 2 * Math.sqrt(m * k);
const ceilY = 3;
// TODO: Uhhhh
const clock = new THREE.Clock();
let velocity = 0;
let acceleration = 0;

const Table = ({ data, isDragging, scrollY, setScrollY }: TableProps) => {
  useFrame(() => {
    if (!isDragging && scrollY < ceilY) {
      const x = scrollY - ceilY;
      const springF = k * x;
      const dampingF = c * velocity;
      const F = springF - dampingF;
      const a = F / m;
      acceleration = a;

      // Set the position
      const timeDelta = clock.getDelta();
      velocity += -acceleration * timeDelta;
      setScrollY(velocity * timeDelta + scrollY);
    }
  });

  return (
    <>
      {data.map((row, index) => (
        <TableRow
          key={row.id}
          text={`${row.id} ${row.name} ${row.age}`}
          position={[0, index * -1 + scrollY, 0]}
          color={"black"}
          bgColor={index % 2 === 0 ? "white" : "lightgray"}
          onClick={() => console.log(`Clicked row: ${JSON.stringify(row)}`)}
        />
      ))}
    </>
  );
};

interface TableRowProps {
  text: string;
  position: [number, number, number];
  color: string;
  bgColor: string;
  onClick: () => void;
}

const TableRow: React.FC<TableRowProps> = ({
  text,
  position,
  color,
  bgColor,
  onClick,
}) => {
  const textTexture = TextTexture({ text, color, bgColor });
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <mesh ref={meshRef} position={position} onClick={onClick}>
      <planeGeometry args={[4, 1]} />
      <meshStandardMaterial map={textTexture} color={bgColor} />
    </mesh>
  );
};

interface DataEntry {
  id: number;
  name: string;
  age: number;
}

const Scrollable3DTable: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setStartY(e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
      const deltaY = e.clientY - startY;
      setScrollY((prevScrollY) => prevScrollY - deltaY * 0.01);
      setStartY(e.clientY);
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    console.log(scrollY);

    // TODO: Uhhhhh
    clock.getDelta();
    velocity = 0;
    acceleration = 0;
  };

  const data: DataEntry[] = [
    { id: 1, name: "Alice", age: 30 },
    { id: 2, name: "Bob", age: 25 },
    { id: 3, name: "Charlie", age: 35 },
    { id: 4, name: "Meow", age: 35 },
    { id: 5, name: "Meowmeow", age: 37 },
    // Add more data here as needed
  ];

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{ width: "100vw", height: "100vh" }}
    >
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Table
          data={data}
          scrollY={scrollY}
          setScrollY={setScrollY}
          isDragging={isDragging}
        />
      </Canvas>
    </div>
  );
};

export default Scrollable3DTable;
