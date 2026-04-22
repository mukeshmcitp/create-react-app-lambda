import { motion } from "framer-motion";
import { Activity, BarChart3, Search, Bell } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";

const capabilities = [
  { icon: Activity, title: "Centralized Logging", target: 99, suffix: ".9%", label: "Uptime" },
  { icon: BarChart3, title: "Metrics Monitoring", target: 50, suffix: "ms", label: "Avg Latency" },
  { icon: Search, title: "Distributed Tracing", target: 1, suffix: "M+", label: "Traces/Day" },
  { icon: Bell, title: "Alerting & Incidents", prefix: "<", target: 2, suffix: "min", label: "Response Time" },
];

const tools = ["New Relic", "Geneos", "Prometheus", "Grafana", "Splunk"];

const MonitoringSection = () => (
  <section className="section-padding">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Observability</span>
        <h2 className="text-3xl md:text-5xl font-bold mt-3">
          Monitoring & <span className="gradient-text">Observability</span>
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
        {capabilities.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -6, scale: 1.03 }}
            className="p-6 rounded-xl border border-border bg-card/70 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 text-center"
          >
            <c.icon className="text-primary mx-auto mb-3" size={28} />
            <div className="text-3xl font-black gradient-text mb-1">
              <AnimatedCounter target={c.target} suffix={c.suffix} prefix={c.prefix} />
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">{c.label}</div>
            <div className="text-sm font-semibold text-foreground">{c.title}</div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="p-6 md:p-8 rounded-xl border border-border bg-card/70 shadow-sm"
      >
        <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
          <h3 className="font-bold text-foreground">Live Dashboard</h3>
          <div className="flex gap-2 flex-wrap">
            {tools.map((t) => (
              <span key={t} className="px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground font-mono">{t}</span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-12 gap-1 h-32">
          {Array.from({ length: 48 }).map((_, i) => {
            const h = 20 + Math.random() * 80;
            return (
              <motion.div
                key={i}
                className="flex items-end"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.02, duration: 0.4 }}
                style={{ originY: 1 }}
              >
                <div
                  className="w-full rounded-t gradient-bg opacity-60 hover:opacity-100 transition-opacity"
                  style={{ height: `${h}%` }}
                />
              </motion.div>
            );
          })}
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>24:00</span>
        </div>
      </motion.div>
    </div>
  </section>
);

export default MonitoringSection;
