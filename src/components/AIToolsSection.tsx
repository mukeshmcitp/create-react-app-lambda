import { motion } from "framer-motion";
import { Bot, BrainCircuit, Sparkles, Zap, MessageSquareCode, ScanSearch, Wand2, BarChart3 } from "lucide-react";
import { useState } from "react";

const aiTools = [
  {
    icon: BrainCircuit,
    title: "AI-Powered CI/CD Optimization",
    desc: "Smart pipeline analysis that predicts failures, optimizes build times, and auto-suggests parallelization strategies.",
    tags: ["Pipeline Analysis", "Build Prediction", "Auto-Optimization"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: MessageSquareCode,
    title: "Intelligent Code Review",
    desc: "AI-driven code review automation that detects security flaws, code smells, and suggests best practices in real time.",
    tags: ["Security Scan", "Code Quality", "Auto-Fix"],
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: ScanSearch,
    title: "Anomaly Detection & AIOps",
    desc: "Machine learning models that monitor infrastructure, detect anomalies, and trigger self-healing workflows.",
    tags: ["ML Monitoring", "Self-Healing", "Alert Reduction"],
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Wand2,
    title: "AI Infrastructure Provisioning",
    desc: "Natural language to Infrastructure-as-Code generation. Describe what you need, get Terraform/CloudFormation instantly.",
    tags: ["NLP to IaC", "Auto-Scaling", "Cost Prediction"],
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Bot,
    title: "ChatOps & AI Assistants",
    desc: "Intelligent Slack/Teams bots that handle incident response, deployment approvals, and runbook automation.",
    tags: ["Slack Bot", "Incident Mgmt", "Runbooks"],
    color: "from-rose-500 to-pink-500",
  },
  {
    icon: BarChart3,
    title: "Predictive Cost Management",
    desc: "AI-driven cloud cost forecasting with smart recommendations for right-sizing, reserved instances, and spot usage.",
    tags: ["Cost Forecast", "Right-Sizing", "FinOps"],
    color: "from-sky-500 to-indigo-500",
  },
];

const stats = [
  { value: "40%", label: "Faster Deployments" },
  { value: "60%", label: "Fewer Incidents" },
  { value: "3x", label: "Developer Productivity" },
  { value: "50%", label: "Cost Reduction" },
];

const AIToolsSection = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <section id="ai-tools" className="section-padding relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            <Sparkles size={16} /> AI-Powered DevOps
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3">
            Supercharge DevOps with{" "}
            <span className="gradient-text">Artificial Intelligence</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Leverage cutting-edge AI tools to automate workflows, predict failures, and optimize your entire DevOps lifecycle.
          </p>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 rounded-xl glow-border bg-card/50 backdrop-blur-sm"
            >
              <div className="text-3xl md:text-4xl font-black gradient-text">{s.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Tools grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiTools.map((tool, i) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              onHoverStart={() => setActiveCard(i)}
              onHoverEnd={() => setActiveCard(null)}
              className="group relative p-6 rounded-xl bg-card glow-border card-hover cursor-pointer"
            >
              {/* Hover glow */}
              {activeCard === i && (
                <motion.div
                  layoutId="ai-glow"
                  className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 pointer-events-none"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}

              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <tool.icon size={26} className="text-foreground" />
                </div>

                <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                  {tool.title}
                  <Zap size={14} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>

                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{tool.desc}</p>

                <div className="flex flex-wrap gap-2">
                  {tool.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIToolsSection;
