import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Cpu, Cloud, Shield, Activity } from "lucide-react";
import { useTypingEffect } from "@/hooks/useTypingEffect";
import AnimatedCounter from "@/components/AnimatedCounter";

const highlights = [
  { icon: Cpu, label: "Hands-on Training" },
  { icon: Cloud, label: "Cloud & DevOps Expertise" },
  { icon: Shield, label: "Real-Time Project Support" },
  { icon: Activity, label: "Observability Solutions" },
];

const stats = [
  { target: 5000, suffix: "+", label: "Students Trained" },
  { target: 120, suffix: "+", label: "Projects Delivered" },
  { target: 50, suffix: "+", label: "Enterprise Clients" },
  { target: 98, suffix: "%", label: "Success Rate" },
];

const typingWords = ["DevOps Journey", "Cloud Career", "CI/CD Mastery", "K8s Expertise"];

const NetworkBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
    {Array.from({ length: 20 }).map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full bg-primary/10 animate-pulse-glow"
        style={{
          width: `${Math.random() * 4 + 2}px`,
          height: `${Math.random() * 4 + 2}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${Math.random() * 4 + 3}s`,
        }}
      />
    ))}
    {Array.from({ length: 8 }).map((_, i) => (
      <div
        key={`line-${i}`}
        className="absolute h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-network-move"
        style={{
          width: `${Math.random() * 300 + 100}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 10}s`,
          transform: `rotate(${Math.random() * 360}deg)`,
        }}
      />
    ))}
  </div>
);

const HeroSection = () => {
  const typedText = useTypingEffect(typingWords, 80, 50, 2000);

  return (
    <section className="relative min-h-screen flex items-center section-padding pt-32">
      <NetworkBackground />
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-sm text-primary"
          >
            🚀 #1 DevOps Training & Consulting Partner
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6">
            Empowering Your{" "}
            <span className="gradient-text">
              {typedText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className="inline-block w-[3px] h-[0.85em] bg-primary ml-1 align-middle"
              />
            </span>{" "}
            with Industry-Ready Skills
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            End-to-end DevOps training, real-time project support, and enterprise-grade solutions across all modern DevOps tools and platforms.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <a href="#contact">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Button size="lg" className="gradient-bg text-primary-foreground font-bold text-lg px-8 py-6 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300">
                  Get Started <ArrowRight className="ml-2" size={20} />
                </Button>
              </motion.div>
            </a>
            <a href="#contact">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-muted hover:border-primary/40 font-bold text-lg px-8 py-6 transition-all duration-300">
                  <Play className="mr-2" size={20} /> Book Free Demo
                </Button>
              </motion.div>
            </a>
          </motion.div>

          {/* Animated stat counters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="p-4 rounded-xl glow-border bg-card/50 backdrop-blur-sm text-center"
              >
                <div className="text-2xl md:text-3xl font-black gradient-text">
                  <AnimatedCounter target={s.target} suffix={s.suffix} />
                </div>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</span>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {highlights.map((h, i) => (
              <motion.div
                key={h.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + i * 0.1 }}
                whileHover={{ y: -6, scale: 1.03 }}
                className="flex flex-col items-center gap-2 p-4 rounded-xl glow-border bg-card/50 backdrop-blur-sm card-hover"
              >
                <h.icon className="text-primary" size={28} />
                <span className="text-sm font-medium text-foreground">{h.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
