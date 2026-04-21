import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, GitBranch, Workflow, Container, Boxes, Code2, Settings } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Button } from "@/components/ui/button";

const tools = [
  {
    icon: GitBranch,
    name: "Git & GitHub",
    description: "Distributed version control and collaboration on GitHub.",
    useCases: ["Branching strategies (GitFlow, trunk-based)", "Pull requests & code review workflows", "GitHub Actions for automation"],
    outcomes: "Confidently manage source code, collaborate across teams, and automate workflows with GitHub Actions.",
  },
  {
    icon: Workflow,
    name: "Jenkins (CI/CD)",
    description: "Automate build, test, and deployment pipelines.",
    useCases: ["Declarative & scripted pipelines", "Multi-branch & shared libraries", "Integration with Docker, K8s, AWS"],
    outcomes: "Design and operate production-grade CI/CD pipelines with quality gates and rollback strategies.",
  },
  {
    icon: Container,
    name: "Docker (Containerization)",
    description: "Package applications as portable, immutable containers.",
    useCases: ["Multi-stage Dockerfiles", "Docker Compose for local stacks", "Image security & registry management"],
    outcomes: "Containerize any application and ship reproducible builds across environments.",
  },
  {
    icon: Boxes,
    name: "Kubernetes (Orchestration)",
    description: "Run containers at scale with self-healing and rollouts.",
    useCases: ["Deployments, Services, Ingress", "Helm charts & Kustomize", "HPA, RBAC, network policies"],
    outcomes: "Deploy, scale, and operate microservices on production K8s clusters (EKS/GKE/AKS).",
  },
  {
    icon: Code2,
    name: "Terraform (IaC)",
    description: "Define and provision infrastructure declaratively.",
    useCases: ["Modules for reusable infra", "Remote state & workspaces", "Multi-cloud provisioning"],
    outcomes: "Codify infrastructure for AWS/GCP/Azure with safe plan/apply workflows.",
  },
  {
    icon: Settings,
    name: "Ansible (Config Mgmt)",
    description: "Agentless automation for configuration and orchestration.",
    useCases: ["Playbooks, roles & inventories", "Ad-hoc commands & vault secrets", "Server hardening & patching"],
    outcomes: "Automate server configuration and application deployments at scale.",
  },
];

const DevOpsTraining = () => (
  <div className="min-h-screen bg-background relative">
    <AnimatedBackground />
    <Navbar />
    <main className="pt-24 pb-16 px-4 relative z-10">
      <div className="container mx-auto max-w-6xl">
        <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">DevOps Training</span>
          <h1 className="text-4xl md:text-6xl font-bold mt-3">
            All <span className="gradient-text">DevOps Tools</span>
          </h1>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Comprehensive tool-by-tool training covering everything you need to engineer modern delivery pipelines.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-6 rounded-xl bg-card glow-border card-hover flex flex-col"
            >
              <div className="w-12 h-12 rounded-lg gradient-bg flex items-center justify-center mb-4">
                <t.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground">{t.name}</h3>
              <p className="text-sm text-muted-foreground mt-2">{t.description}</p>

              <div className="mt-4">
                <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Use Cases</h4>
                <ul className="space-y-1">
                  {t.useCases.map((u) => (
                    <li key={u} className="text-sm text-muted-foreground">• {u}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Learning Outcome</h4>
                <p className="text-sm text-foreground/90">{t.outcomes}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/#contact">
            <Button size="lg" className="gradient-bg text-primary-foreground font-semibold">
              Start DevOps Training
            </Button>
          </Link>
        </div>
      </div>
    </main>
    <FooterSection />
  </div>
);

export default DevOpsTraining;
