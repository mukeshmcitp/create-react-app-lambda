import { motion } from "framer-motion";
import { Wrench, Headphones, ArrowRightLeft } from "lucide-react";

const services = [
  {
    icon: Wrench,
    title: "Real-Time Project Support",
    items: ["Live project assistance", "Debugging & issue resolution", "Architecture guidance"],
  },
  {
    icon: Headphones,
    title: "24/7 DevOps Support",
    items: ["Tool setup & configuration", "CI/CD troubleshooting", "Kubernetes production support"],
  },
  {
    icon: ArrowRightLeft,
    title: "Migration Support",
    items: ["On-prem to cloud", "Monolith to microservices", "Zero-downtime migrations"],
  },
];

const ServicesSection = () => (
  <section id="services" className="section-padding relative">
    <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/3 to-background" />
    <div className="container mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Services</span>
        <h2 className="text-3xl md:text-5xl font-bold mt-3">
          Support <span className="gradient-text">Services</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-8 rounded-xl bg-card glow-border card-hover text-center"
          >
            <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/20">
              <s.icon size={28} className="text-primary-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4">{s.title}</h3>
            <ul className="space-y-3">
              {s.items.map((item) => (
                <li key={item} className="flex items-center gap-2 text-muted-foreground text-sm">
                  <div className="w-1.5 h-1.5 rounded-full gradient-bg shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
