import { useRef, useEffect } from 'react';

interface NeuralNetworkGridProps {
  width: number;
  height: number;
  density?: number;
}

export default function NeuralNetworkGrid({ width, height, density = 1 }: NeuralNetworkGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const spacing = 50 / density;
    const cols = Math.ceil(width / spacing) + 1;
    const rows = Math.ceil(height / spacing) + 1;

    interface Node {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      phase: number;
    }

    const nodes: Node[] = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        nodes.push({
          x: col * spacing + (Math.random() - 0.5) * 10,
          y: row * spacing + (Math.random() - 0.5) * 10,
          baseX: col * spacing,
          baseY: row * spacing,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    let animationId: number;

    const draw = (timestamp: number) => {
      ctx.clearRect(0, 0, width, height);

      ctx.strokeStyle = 'rgba(139, 92, 246, 0.15)';
      ctx.lineWidth = 1;

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols - 1; j++) {
          const nodeA = nodes[i * cols + j];
          const nodeB = nodes[i * cols + j + 1];
          ctx.beginPath();
          ctx.moveTo(nodeA.x, nodeA.y);
          ctx.lineTo(nodeB.x, nodeB.y);
          ctx.stroke();
        }
      }

      for (let i = 0; i < rows - 1; i++) {
        for (let j = 0; j < cols; j++) {
          const nodeA = nodes[i * cols + j];
          const nodeB = nodes[(i + 1) * cols + j];
          ctx.beginPath();
          ctx.moveTo(nodeA.x, nodeA.y);
          ctx.lineTo(nodeB.x, nodeB.y);
          ctx.stroke();
        }
      }

      ctx.fillStyle = 'rgba(165, 243, 252, 0.8)';
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols - 1; j++) {
          const nodeA = nodes[i * cols + j];
          const nodeB = nodes[i * cols + j + 1];
          const packetX = nodeA.x + (nodeB.x - nodeA.x) * ((Math.sin(timestamp * 0.001 + nodeA.phase) + 1) / 2);
          ctx.fillRect(packetX - 1.5, nodeA.y - 1.5, 3, 3);
        }
      }

      ctx.fillStyle = 'rgba(139, 92, 246, 0.6)';
      for (const node of nodes) {
        ctx.fillRect(node.x - 1, node.y - 1, 2, 2);
      }

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(animationId);
  }, [width, height, density]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width,
        height,
        position: 'absolute',
        inset: 0,
        borderRadius: '16px',
        opacity: 0.6,
        pointerEvents: 'none',
      }}
    />
  );
}
