import { motion } from "framer-motion";
import { Terminal, GitBranch, Workflow, Container, Cloud, ShieldCheck } from "lucide-react";

const steps = [
  { icon: Terminal, title: "Linux & Scripting", desc: "Master Linux fundamentals, Bash scripting, and system administration", step: 1 },
  { icon: GitBranch, title: "Git & Version Control", desc: "Git workflows, branching strategies, and collaboration", step: 2 },
  { icon: Workflow, title: "CI/CD Pipelines", desc: "Jenkins, GitHub Actions, GitLab CI/CD automation", step: 3 },
  { icon: Container, title: "Containerization & Orchestration", desc: "Docker, Kubernetes, Helm charts deployment", step: 4 },
  { icon: Cloud, title: "Cloud Deployment", desc: "AWS, Azure, GCP architecture and services", step: 5 },
  { icon: ShieldCheck, title: "Monitoring & Security", desc: "Prometheus, Grafana, DevSecOps practices", step: 6 },
];

const TrainingSection = () => (
  <section id="training" className="section-padding relative">
    <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/3 to-background" />
    <div className="container mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Training Programs</span>
        <h2 className="text-3xl md:text-5xl font-bold mt-3">
          DevOps <span className="gradient-text">Master Program</span>
        </h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">A structured roadmap from fundamentals to advanced DevOps engineering</p>
      </motion.div>

      <div className="relative max-w-4xl mx-auto">
        {/* Timeline line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-primary/20 hidden md:block" />
        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-primary/20 md:hidden" />

        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`relative flex items-start gap-6 mb-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} md:text-${i % 2 === 0 ? "right" : "left"}`}
          >
            {/* Mobile layout */}
            <div className="md:hidden flex items-start gap-4 ml-4">
              <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full gradient-bg shrink-0 shadow-lg shadow-primary/20">
                <s.icon size={20} className="text-primary-foreground" />
              </div>
              <div className="p-5 rounded-xl border border-border bg-card/70 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 flex-1">
                <span className="text-xs font-bold text-primary">STEP {s.step}</span>
                <h3 className="text-lg font-bold text-foreground mt-1">{s.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
              </div>
            </div>

            {/* Desktop layout */}
            <div className={`hidden md:flex items-start gap-6 w-full ${i % 2 === 0 ? "" : "flex-row-reverse"}`}>
              <div className={`flex-1 p-5 rounded-xl border border-border bg-card/70 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                <span className="text-xs font-bold text-primary">STEP {s.step}</span>
                <h3 className="text-lg font-bold text-foreground mt-1">{s.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
              </div>
              <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full gradient-bg shrink-0 shadow-lg shadow-primary/20">
                <s.icon size={20} className="text-primary-foreground" />
              </div>
              <div className="flex-1" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TrainingSection;
