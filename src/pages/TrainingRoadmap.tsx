import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft, Terminal, GitBranch, Cloud, Workflow, Container, Boxes, Code2, Settings, Activity, Briefcase,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Button } from "@/components/ui/button";

const steps = [
  { icon: Terminal, title: "Linux & Networking", desc: "Shell, file system, processes, TCP/IP, DNS, firewalls." },
  { icon: GitBranch, title: "Git & Version Control", desc: "Branching, PR workflows, Git internals, GitHub." },
  { icon: Cloud, title: "Cloud Platforms", desc: "AWS, GCP, or Azure core services and architecture." },
  { icon: Workflow, title: "CI/CD", desc: "Jenkins, GitHub Actions, GitLab CI pipelines." },
  { icon: Container, title: "Docker", desc: "Containerization, Dockerfiles, Compose, registries." },
  { icon: Boxes, title: "Kubernetes", desc: "Pods, Deployments, Services, Ingress, Helm." },
  { icon: Code2, title: "Terraform", desc: "Infrastructure as Code across multiple clouds." },
  { icon: Settings, title: "Ansible", desc: "Configuration management and automation." },
  { icon: Activity, title: "Monitoring & Logging", desc: "Prometheus, Grafana, ELK, alerting." },
  { icon: Briefcase, title: "Real-Time Projects & Interview Prep", desc: "End-to-end projects, mock interviews, resume." },
];

const TrainingRoadmap = () => (
  <div className="min-h-screen bg-background relative">
    <AnimatedBackground />
    <Navbar />
    <main className="pt-24 pb-16 px-4 relative z-10">
      <div className="container mx-auto max-w-5xl">
        <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Roadmap</span>
          <h1 className="text-4xl md:text-6xl font-bold mt-3">
            Become a <span className="gradient-text">Cloud & DevOps Engineer</span>
          </h1>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            A 10-step structured journey from Linux fundamentals to job-ready engineer.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-primary/20" />
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.05 * i }}
              className={`relative mb-8 md:mb-12 md:flex md:items-center ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
            >
              <div className="md:w-1/2 md:px-8">
                <div className={`ml-20 md:ml-0 p-5 rounded-xl bg-card glow-border card-hover ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <span className="text-xs font-bold text-primary">STEP {i + 1}</span>
                  <h3 className="text-lg font-bold text-foreground mt-1">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
                </div>
              </div>

              <div className="absolute left-8 md:left-1/2 top-5 -translate-x-1/2 w-12 h-12 rounded-full gradient-bg flex items-center justify-center shadow-lg shadow-primary/30 z-10">
                <s.icon size={20} className="text-primary-foreground" />
              </div>

              <div className="hidden md:block md:w-1/2" />
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/#contact">
            <Button size="lg" className="gradient-bg text-primary-foreground font-semibold">
              Start Your Roadmap
            </Button>
          </Link>
        </div>
      </div>
    </main>
    <FooterSection />
  </div>
);

export default TrainingRoadmap;
