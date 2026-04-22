import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Cloud, Code2, Cog, Rocket, BarChart3, Users } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import devopsInfinityLogo from "@/assets/devops-infinity-logo.png";

const stats = [
  { target: 5000, suffix: "+", label: "Students Trained" },
  { target: 120, suffix: "+", label: "Projects Delivered" },
  { target: 50, suffix: "+", label: "Enterprise Clients" },
  { target: 98, suffix: "%", label: "Success Rate" },
];

const techIcons = [
  { icon: Cloud, label: "Cloud", angle: -110 },
  { icon: Code2, label: "Code", angle: -55 },
  { icon: Cog, label: "Automate", angle: 0 },
  { icon: Rocket, label: "Deploy", angle: 55 },
  { icon: BarChart3, label: "Monitor", angle: 110 },
  { icon: Users, label: "Support", angle: 180 },
];

/* Background: dark navy gradient + circuit grid + glowing particles */
const HeroBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 gradient-bg-hero" />
    <div className="absolute inset-0 circuit-grid opacity-60" />

    {/* Glow orbs */}
    <div
      className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full blur-3xl"
      style={{ background: "radial-gradient(circle, hsl(var(--secondary) / 0.25), transparent 70%)" }}
    />
    <div
      className="absolute -bottom-40 right-0 w-[600px] h-[600px] rounded-full blur-3xl"
      style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.4), transparent 70%)" }}
    />
    <div
      className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full blur-3xl"
      style={{ background: "radial-gradient(circle, hsl(var(--accent) / 0.18), transparent 70%)" }}
    />

    {/* Particles */}
    {Array.from({ length: 28 }).map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full bg-secondary animate-pulse-glow"
        style={{
          width: `${Math.random() * 3 + 1.5}px`,
          height: `${Math.random() * 3 + 1.5}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${Math.random() * 4 + 3}s`,
          boxShadow: "0 0 8px hsl(var(--secondary) / 0.8)",
        }}
      />
    ))}
  </div>
);

/* Right-side visual: digital globe + DevOps infinity loop + connected tech icons */
const HeroVisual = () => {
  const radius = 180;
  return (
    <div className="relative w-full max-w-[520px] aspect-square mx-auto">
      {/* Outer glow ring */}
      <div
        className="absolute inset-0 rounded-full blur-2xl"
        style={{ background: "radial-gradient(circle, hsl(var(--secondary) / 0.35), transparent 65%)" }}
      />

      {/* Glowing futuristic platform / rings beneath the globe */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[6%] w-[78%] pointer-events-none" aria-hidden="true">
        <div
          className="absolute left-1/2 -translate-x-1/2 -top-6 w-full h-16 rounded-[100%] blur-2xl"
          style={{ background: "radial-gradient(ellipse at center, hsl(var(--secondary) / 0.55), transparent 70%)" }}
        />
        <svg viewBox="0 0 400 80" className="relative w-full h-auto">
          <defs>
            <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity="0.1" />
              <stop offset="50%" stopColor="hsl(var(--secondary))" stopOpacity="0.9" />
              <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <ellipse cx="200" cy="40" rx="180" ry="14" fill="none" stroke="url(#ringGrad)" strokeWidth="1.5" />
          <ellipse cx="200" cy="40" rx="150" ry="10" fill="none" stroke="hsl(var(--secondary) / 0.5)" strokeWidth="1" strokeDasharray="2 6" />
          <ellipse cx="200" cy="40" rx="120" ry="7" fill="none" stroke="hsl(var(--accent) / 0.45)" strokeWidth="1" />
        </svg>
      </div>

      {/* Globe SVG */}
      <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full">
        <defs>
          <radialGradient id="globeGrad" cx="35%" cy="35%" r="70%">
            <stop offset="0%" stopColor="hsl(215 84% 35%)" stopOpacity="0.9" />
            <stop offset="60%" stopColor="hsl(218 64% 14%)" stopOpacity="0.95" />
            <stop offset="100%" stopColor="hsl(218 80% 8%)" stopOpacity="1" />
          </radialGradient>
          <linearGradient id="loopBlue" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(var(--secondary))" />
            <stop offset="100%" stopColor="hsl(var(--primary))" />
          </linearGradient>
          <linearGradient id="loopOrange" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(30 100% 60%)" />
            <stop offset="100%" stopColor="hsl(15 100% 55%)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Globe core */}
        <circle cx="200" cy="200" r="130" fill="url(#globeGrad)" stroke="hsl(var(--secondary) / 0.4)" strokeWidth="1.5" />

        {/* Latitude lines */}
        {[-60, -30, 0, 30, 60].map((lat) => (
          <ellipse
            key={lat}
            cx="200"
            cy={200 + lat * 0.6}
            rx={Math.cos((lat * Math.PI) / 180) * 130}
            ry={Math.cos((lat * Math.PI) / 180) * 18}
            fill="none"
            stroke="hsl(var(--secondary) / 0.35)"
            strokeWidth="1"
          />
        ))}

        {/* Longitude lines (rotating) */}
        <g className="orbit-slow" style={{ transformOrigin: "200px 200px" }}>
          {[0, 30, 60, 90, 120, 150].map((deg) => (
            <ellipse
              key={deg}
              cx="200"
              cy="200"
              rx={Math.abs(Math.cos((deg * Math.PI) / 180)) * 130 || 4}
              ry="130"
              fill="none"
              stroke="hsl(var(--secondary) / 0.3)"
              strokeWidth="1"
            />
          ))}
        </g>

        {/* Network nodes on globe */}
        {[
          [150, 130], [260, 150], [180, 220], [240, 250], [200, 110], [285, 215],
        ].map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="3" fill="hsl(var(--secondary))" filter="url(#glow)" />
            <circle cx={cx} cy={cy} r="6" fill="hsl(var(--secondary) / 0.2)">
              <animate attributeName="r" values="3;10;3" dur="3s" repeatCount="indefinite" begin={`${i * 0.4}s`} />
              <animate attributeName="opacity" values="0.6;0;0.6" dur="3s" repeatCount="indefinite" begin={`${i * 0.4}s`} />
            </circle>
          </g>
        ))}

      </svg>

      {/* DevOps infinity logo overlay (in front of globe) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Subtle ambient glow behind the loop — no dark fill, just light bloom for depth */}
        <div
          className="absolute w-[70%] h-[42%] sm:w-[64%] sm:h-[38%] lg:w-[60%] lg:h-[36%] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse, hsl(var(--secondary) / 0.28), hsl(var(--accent) / 0.18) 50%, transparent 75%)",
          }}
        />

        <motion.div
          className="relative w-[78%] sm:w-[74%] lg:w-[72%] aspect-square"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {/* Transparent PNG — sits naturally on the banner with a soft glow halo */}
          <img
            src={devopsInfinityLogo}
            alt="DevOps infinity loop, blue Development side and orange Operations side"
            width={1024}
            height={1024}
            className="w-full h-full object-contain drop-shadow-[0_0_24px_hsl(var(--secondary)/0.5)]"
          />

          {/* DEV / OPS labels — horizontal text centered within each loop section.
              The SVG viewBox makes coordinates resolution-independent, so the labels
              scale proportionally with the loop from mobile (320px) to desktop (1920px+).
              `dominant-baseline="central"` ensures true vertical centering across browsers,
              and `vector-effect="non-scaling-stroke"` keeps the contrast stroke crisp at every size. */}
          <svg
            viewBox="0 0 400 400"
            preserveAspectRatio="xMidYMid meet"
            className="absolute inset-0 w-full h-full"
            aria-hidden="true"
          >
            <defs>
              {/* Soft outer halo — adds depth on dark navy without washing out lighter gradients */}
              <filter id="labelHalo" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="4" result="halo" />
                <feComponentTransfer in="halo" result="haloDim">
                  <feFuncA type="linear" slope="0.55" />
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode in="haloDim" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Layer 1 — dark contrast stroke beneath the white fill.
                Guarantees readability on lighter gradient backgrounds. */}
            <g
              fill="#FFFFFF"
              stroke="hsl(var(--background))"
              strokeOpacity={0.9}
              strokeWidth={6}
              strokeLinejoin="round"
              fontFamily="system-ui, -apple-system, 'Segoe UI', sans-serif"
              fontWeight={900}
              fontSize={38}
              letterSpacing={2}
              textAnchor="middle"
              dominantBaseline="central"
              paintOrder="stroke fill"
              vectorEffect="non-scaling-stroke"
            >
              <text x="138" y="210">DEV</text>
              <text x="262" y="210">OPS</text>
            </g>

            {/* Layer 2 — crisp white fill with soft halo for glow on dark backgrounds. */}
            <g
              fill="#FFFFFF"
              fontFamily="system-ui, -apple-system, 'Segoe UI', sans-serif"
              fontWeight={900}
              fontSize={38}
              letterSpacing={2}
              textAnchor="middle"
              dominantBaseline="central"
              filter="url(#labelHalo)"
            >
              <text x="138" y="210">DEV</text>
              <text x="262" y="210">OPS</text>
            </g>
          </svg>

        </motion.div>
      </div>

      {/* Connecting lines from globe to icons */}
      <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full pointer-events-none">
        {techIcons.map((t, i) => {
          const rad = (t.angle * Math.PI) / 180;
          const x = 200 + Math.cos(rad) * radius;
          const y = 200 + Math.sin(rad) * radius;
          return (
            <line
              key={i}
              x1="200"
              y1="200"
              x2={x}
              y2={y}
              stroke="hsl(var(--secondary) / 0.45)"
              strokeWidth="1"
              strokeDasharray="3 4"
            />
          );
        })}
      </svg>

      {/* Tech icons positioned around the globe */}
      {techIcons.map((t, i) => {
        const rad = (t.angle * Math.PI) / 180;
        const left = `calc(50% + ${Math.cos(rad) * radius}px)`;
        const top = `calc(50% + ${Math.sin(rad) * radius}px)`;
        return (
          <motion.div
            key={t.label}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 + i * 0.1, duration: 0.4 }}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
            style={{ left, top }}
          >
            <div className="w-12 h-12 rounded-xl bg-card/80 backdrop-blur border border-secondary/40 flex items-center justify-center shadow-[0_0_20px_hsl(var(--secondary)/0.35)]">
              <t.icon className="w-5 h-5 text-secondary" />
            </div>
            <span className="text-[10px] font-semibold text-foreground/90 uppercase tracking-wider">
              {t.label}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
};

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center section-padding pt-32 overflow-hidden">
      <HeroBackground />
      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT: Headline + CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-6 text-foreground">
              {[
                { text: "Learn", className: "text-foreground" },
                { text: "DevOps.", className: "text-foreground" },
                { text: "Build", className: "gradient-text" },
                { text: "Skills.", className: "gradient-text" },
                { text: "Deploy", className: "text-accent glow-text" },
                { text: "Your", className: "text-accent glow-text" },
                { text: "Future.", className: "text-accent glow-text" },
              ].map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    delay: 0.15 + i * 0.12,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`inline-block mr-[0.25em] ${word.className}`}
                >
                  {word.text}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg md:text-xl text-foreground/80 max-w-xl mx-auto lg:mx-0 mb-10"
            >
              DevOps Training and IT Project Support to accelerate your career globally.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            >
              <a href="#training">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    size="lg"
                    className="gradient-bg text-primary-foreground font-bold text-lg px-8 py-6 shadow-[0_0_30px_hsl(var(--secondary)/0.4)] hover:shadow-[0_0_45px_hsl(var(--secondary)/0.6)] transition-all duration-300"
                  >
                    Explore Training <ArrowRight className="ml-2" size={20} />
                  </Button>
                </motion.div>
              </a>
              <a href="#services">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-foreground/40 text-foreground bg-transparent hover:bg-foreground/10 hover:border-foreground font-bold text-lg px-8 py-6 transition-all duration-300"
                  >
                    Our Services
                  </Button>
                </motion.div>
              </a>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="p-3 rounded-xl border border-secondary/25 bg-card/40 backdrop-blur-sm text-center"
                >
                  <div className="text-xl md:text-2xl font-black gradient-text">
                    <AnimatedCounter target={s.target} suffix={s.suffix} />
                  </div>
                  <span className="text-[10px] text-foreground/70 uppercase tracking-wider">
                    {s.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Globe + DevOps infinity loop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative flex items-center justify-center"
          >
            <HeroVisual />
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
