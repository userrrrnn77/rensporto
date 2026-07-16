import { useEffect, useRef } from "react";

type Point = { x: number; y: number };
type Edge = { from: Point; to: Point };

const NODES: Point[] = [
  { x: 14, y: 50 },
  { x: 1172, y: 559 },
  { x: 626, y: 324 },
  { x: 559, y: 192 },
  { x: 664, y: 584 },
  { x: 309, y: 125 },
  { x: 917, y: 415 },
  { x: 237, y: 294 },
  { x: 352, y: 428 },
  { x: 356, y: 782 },
  { x: 297, y: 702 },
  { x: 89, y: 730 },
  { x: 816, y: 773 },
  { x: 993, y: 32 },
  { x: 510, y: 16 },
  { x: 106, y: 614 },
  { x: 443, y: 341 },
  { x: 562, y: 757 },
  { x: 844, y: 551 },
  { x: 167, y: 107 },
  { x: 1096, y: 258 },
  { x: 228, y: 506 },
];

const EDGES: Edge[] = [
  { from: { x: 356, y: 782 }, to: { x: 297, y: 702 } },
  { from: { x: 89, y: 730 }, to: { x: 106, y: 614 } },
  { from: { x: 352, y: 428 }, to: { x: 443, y: 341 } },
  { from: { x: 309, y: 125 }, to: { x: 167, y: 107 } },
  { from: { x: 352, y: 428 }, to: { x: 228, y: 506 } },
  { from: { x: 626, y: 324 }, to: { x: 559, y: 192 } },
  { from: { x: 917, y: 415 }, to: { x: 844, y: 551 } },
  { from: { x: 106, y: 614 }, to: { x: 228, y: 506 } },
  { from: { x: 14, y: 50 }, to: { x: 167, y: 107 } },
  { from: { x: 237, y: 294 }, to: { x: 352, y: 428 } },
  { from: { x: 559, y: 192 }, to: { x: 510, y: 16 } },
  { from: { x: 664, y: 584 }, to: { x: 844, y: 551 } },
  { from: { x: 309, y: 125 }, to: { x: 237, y: 294 } },
  { from: { x: 626, y: 324 }, to: { x: 443, y: 341 } },
  { from: { x: 559, y: 192 }, to: { x: 443, y: 341 } },
  { from: { x: 237, y: 294 }, to: { x: 167, y: 107 } },
  { from: { x: 664, y: 584 }, to: { x: 562, y: 757 } },
  { from: { x: 356, y: 782 }, to: { x: 562, y: 757 } },
  { from: { x: 297, y: 702 }, to: { x: 228, y: 506 } },
  { from: { x: 297, y: 702 }, to: { x: 89, y: 730 } },
  { from: { x: 816, y: 773 }, to: { x: 844, y: 551 } },
  { from: { x: 309, y: 125 }, to: { x: 510, y: 16 } },
  { from: { x: 917, y: 415 }, to: { x: 1096, y: 258 } },
  { from: { x: 664, y: 584 }, to: { x: 816, y: 773 } },
  { from: { x: 993, y: 32 }, to: { x: 1096, y: 258 } },
  { from: { x: 816, y: 773 }, to: { x: 562, y: 757 } },
];

const PATHS: { points: Point[]; duration: number; delay: number }[] = [
  {
    points: [
      { x: 14, y: 50 },
      { x: 167, y: 107 },
      { x: 309, y: 125 },
      { x: 237, y: 294 },
      { x: 352, y: 428 },
      { x: 443, y: 341 },
      { x: 626, y: 324 },
      { x: 559, y: 192 },
      { x: 510, y: 16 },
    ],
    duration: 12,
    delay: 0,
  },
  {
    points: [
      { x: 510, y: 16 },
      { x: 309, y: 125 },
      { x: 237, y: 294 },
      { x: 352, y: 428 },
      { x: 228, y: 506 },
      { x: 106, y: 614 },
      { x: 89, y: 730 },
    ],
    duration: 11,
    delay: 2,
  },
  {
    points: [
      { x: 89, y: 730 },
      { x: 297, y: 702 },
      { x: 356, y: 782 },
      { x: 562, y: 757 },
      { x: 664, y: 584 },
      { x: 844, y: 551 },
      { x: 917, y: 415 },
      { x: 1096, y: 258 },
    ],
    duration: 13,
    delay: 4.5,
  },
  {
    points: [
      { x: 993, y: 32 },
      { x: 1096, y: 258 },
      { x: 917, y: 415 },
      { x: 844, y: 551 },
      { x: 816, y: 773 },
      { x: 562, y: 757 },
      { x: 664, y: 584 },
      { x: 443, y: 341 },
      { x: 237, y: 294 },
    ],
    duration: 14,
    delay: 1,
  },
  {
    points: [
      { x: 167, y: 107 },
      { x: 237, y: 294 },
      { x: 352, y: 428 },
      { x: 443, y: 341 },
      { x: 559, y: 192 },
      { x: 626, y: 324 },
      { x: 844, y: 551 },
      { x: 1096, y: 258 },
    ],
    duration: 10,
    delay: 7,
  },
  {
    points: [
      { x: 228, y: 506 },
      { x: 297, y: 702 },
      { x: 562, y: 757 },
      { x: 816, y: 773 },
      { x: 844, y: 551 },
      { x: 664, y: 584 },
      { x: 443, y: 341 },
      { x: 626, y: 324 },
    ],
    duration: 12,
    delay: 3.5,
  },
];

function getPointOnPath(points: Point[], t: number): Point {
  const totalSegments = points.length - 1;
  const scaled = t * totalSegments;
  const seg = Math.min(Math.floor(scaled), totalSegments - 1);
  const localT = scaled - seg;
  const a = points[seg];
  const b = points[seg + 1];
  return {
    x: a.x + (b.x - a.x) * localT,
    y: a.y + (b.y - a.y) * localT,
  };
}

function toCanvas(
  p: Point,
  cw: number,
  ch: number,
): { cx: number; cy: number } {
  return { cx: (p.x / 1200) * cw, cy: (p.y / 800) * ch };
}

export function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const darkRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Detect dark mode
    function detectDark() {
      darkRef.current = document.documentElement.classList.contains("dark");
    }
    detectDark();

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = window.innerWidth * dpr;
      canvas!.height = window.innerHeight * dpr;
      canvas!.style.width = `${window.innerWidth}px`;
      canvas!.style.height = `${window.innerHeight}px`;
      ctx!.scale(dpr, dpr);
    }
    resize();
    window.addEventListener("resize", resize);

    const observer = new MutationObserver(detectDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const nodePhases = NODES.map((_, i) => ({
      offset: (i * 0.4) % (Math.PI * 2),
      speed: 4 + (i % 5),
    }));

    let animId: number;
    let startTime: number | null = null;

    function draw(ts: number) {
      if (!startTime) startTime = ts;
      const elapsed = (ts - startTime) / 1000;

      const W = window.innerWidth;
      const H = window.innerHeight;
      const dark = darkRef.current;

      const edgeColor = dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)";
      const nodeColor = dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.25)";

      const pulseCore = dark ? "#52a9ff" : "#006bff";
      const pulseGlow = dark ? "#52a9ff" : "#006bff";

      ctx!.clearRect(0, 0, W, H);

      // --- Edges ---
      ctx!.save();
      ctx!.strokeStyle = edgeColor;
      ctx!.lineWidth = 1;
      for (const edge of EDGES) {
        const { cx: x1, cy: y1 } = toCanvas(edge.from, W, H);
        const { cx: x2, cy: y2 } = toCanvas(edge.to, W, H);
        ctx!.beginPath();
        ctx!.moveTo(x1, y1);
        ctx!.lineTo(x2, y2);
        ctx!.stroke();
      }
      ctx!.restore();

      for (let i = 0; i < NODES.length; i++) {
        const node = NODES[i];
        const phase = nodePhases[i];
        const breathe =
          0.4 +
          0.6 *
            ((Math.sin((elapsed / phase.speed) * Math.PI * 2 + phase.offset) +
              1) /
              2);
        const { cx, cy } = toCanvas(node, W, H);

        ctx!.save();
        ctx!.globalAlpha = breathe;
        ctx!.fillStyle = nodeColor;
        ctx!.beginPath();
        ctx!.arc(cx, cy, 2.5, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.restore();
      }

      for (const path of PATHS) {
        const cycleTime = elapsed - path.delay;
        if (cycleTime < 0) continue;

        const t = (cycleTime % path.duration) / path.duration;

        const fadeIn = Math.min(t / 0.06, 1);
        const fadeOut = Math.min((1 - t) / 0.06, 1);
        const alpha = fadeIn * fadeOut;
        if (alpha <= 0) continue;

        const pos = getPointOnPath(path.points, t);
        const { cx, cy } = toCanvas(pos, W, H);

        ctx!.save();
        ctx!.globalAlpha = alpha * 0.15;
        ctx!.shadowColor = pulseGlow;
        ctx!.shadowBlur = 40;
        ctx!.fillStyle = pulseGlow;
        ctx!.beginPath();
        ctx!.arc(cx, cy, 18, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.restore();

        ctx!.save();
        ctx!.globalAlpha = alpha * 0.3;
        ctx!.shadowColor = pulseGlow;
        ctx!.shadowBlur = 20;
        ctx!.fillStyle = pulseGlow;
        ctx!.beginPath();
        ctx!.arc(cx, cy, 10, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.restore();

        // Core dot — bright, solid
        ctx!.save();
        ctx!.globalAlpha = alpha;
        ctx!.shadowColor = pulseGlow;
        ctx!.shadowBlur = 12;
        ctx!.fillStyle = pulseCore;
        ctx!.beginPath();
        ctx!.arc(cx, cy, 4, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.restore();
      }

      animId = requestAnimationFrame(draw);
    }

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true">
      <canvas ref={canvasRef} className="block" />
    </div>
  );
}
