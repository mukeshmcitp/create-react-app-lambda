import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Workflow, Boxes, Code2, Activity, FileSearch, Target } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Button } from "@/components/ui/button";

const projects = [
  {
    icon: Workflow,
    title: "End-to-End CI/CD Pipeline",
    description: "Build a production CI/CD pipeline with automated tests, security scans, and blue/green deploys.",
    tools: ["Jenkins", "GitHub Actions", "SonarQube", "Trivy", "AWS"],
    outcomes: "Reduce deployment time from hours to minutes with zero-downtime releases.",
  },
  {
    icon: Boxes,
    title: "Docker + Kubernetes Microservices",
    description: "Containerize a multi-service app and deploy on EKS with autoscaling and ingress.",
    tools: ["Docker", "Kubernetes", "Helm", "EKS", "NGINX Ingress"],
    outcomes: "Operate resilient microservices that auto-heal and scale on demand.",
  },
  {
    icon: Code2,
    title: "Cloud Infrastructure Automation",
    description: "Provision multi-environment cloud infra (VPC, EKS, RDS) using Terraform modules.",
    tools: ["Terraform", "AWS", "S3 backend", "GitHub Actions"],
    outcomes: "Reproducible, version-controlled infrastructure with peer-reviewed changes.",
  },
  {
    icon: Activity,
    title: "Monitoring with Prometheus & Grafana",
    description: "Set up full observability with metrics, dashboards, and alerting for K8s workloads.",
    tools: ["Prometheus", "Grafana", "Alertmanager", "kube-state-metrics"],
    outcomes: "Real-time visibility into SLIs/SLOs with on-call alerts via Slack/PagerDuty.",
  },
  {
    icon: FileSearch,
    title: "Centralized Logging with ELK Stack",
    description: "Ship application and infra logs to Elasticsearch and visualize in Kibana.",
    tools: ["Elasticsearch", "Logstash", "Kibana", "Filebeat"],
    outcomes: "Searchable, structured logs across the entire stack for fast debugging.",
  },
  {
    icon: Target,
    title: "DevSecOps & Compliance",
    description: "Embed security scanning, secrets management, and policy-as-code into pipelines.",
    tools: ["Trivy", "HashiCorp Vault", "OPA", "Checkov"],
    outcomes: "Shift-left security with automatic policy enforcement on every PR.",
  },
];

const RealTimeProjects = () => (
  <div className="min-h-screen bg-background relative">
    <AnimatedBackground />
    <Navbar />
    <main className="pt-24 pb-16 px-4 relative z-10">
      <div className="container mx-auto max-w-6xl">
        <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Real-Time Projects</span>
          <h1 className="text-4xl md:text-6xl font-bold mt-3">
            DevOps & <span className="gradient-text">Observability Projects</span>
          </h1>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Hands-on, production-grade projects you'll build and showcase on your resume.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-6 rounded-xl bg-card glow-border card-hover"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg gradient-bg flex items-center justify-center shrink-0">
                  <p.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground">{p.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{p.description}</p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {p.tools.map((t) => (
                      <span key={t} className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary border border-primary/20">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-border">
                    <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Outcome</h4>
                    <p className="text-sm text-foreground/90">{p.outcomes}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/#contact">
            <Button size="lg" className="gradient-bg text-primary-foreground font-semibold">
              Build These Projects With Us
            </Button>
          </Link>
        </div>
      </div>
    </main>
    <FooterSection />
  </div>
);

export default RealTimeProjects;
