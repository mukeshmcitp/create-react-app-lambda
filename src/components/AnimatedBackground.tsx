import { motion } from "framer-motion";

const floatingIcons = [
  { path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z", x: "8%", y: "20%", size: 40, delay: 0 },
  { path: "M19.35 10.04A7.49 7.49 0 0012 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 000 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z", x: "75%", y: "15%", size: 48, delay: 1 },
  { path: "M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z", x: "90%", y: "55%", size: 32, delay: 2 },
  { path: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5", x: "15%", y: "70%", size: 36, delay: 3 },
  { path: "M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z", x: "50%", y: "85%", size: 34, delay: 1.5 },
  { path: "M22 12A10 10 0 1112 2a10 10 0 0110 10z", x: "85%", y: "75%", size: 28, delay: 2.5 },
];

const AnimatedBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    {/* Grid pattern */}
    <div
      className="absolute inset-0 opacity-[0.04]"
      style={{
        backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }}
    />

    {/* Floating SVG icons */}
    {floatingIcons.map((icon, i) => (
      <motion.svg
        key={i}
        viewBox="0 0 24 24"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth={0.5}
        className="absolute opacity-[0.08]"
        style={{ left: icon.x, top: icon.y, width: icon.size, height: icon.size }}
        animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, delay: icon.delay, ease: "easeInOut" }}
      >
        <path d={icon.path} />
      </motion.svg>
    ))}

    {/* Gradient orbs - lighter for light theme */}
    <motion.div
      className="absolute w-[500px] h-[500px] rounded-full"
      style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.12), transparent 70%)", left: "10%", top: "20%" }}
      animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute w-[400px] h-[400px] rounded-full"
      style={{ background: "radial-gradient(circle, hsl(var(--secondary) / 0.10), transparent 70%)", right: "5%", bottom: "10%" }}
      animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
    />
  </div>
);

export default AnimatedBackground;
