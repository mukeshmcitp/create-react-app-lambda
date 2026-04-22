import { motion } from "framer-motion";
import { GitBranch, Workflow, Container, Server, Code2, Cloud, Activity, ShieldCheck, Users } from "lucide-react";

const categories = [
  {
    icon: GitBranch,
    title: "Version Control",
    tools: "Git, GitHub, GitLab, Bitbucket",
    desc: "Master source code management with industry-standard version control systems. Learn branching strategies, pull requests, merge conflict resolution, and collaborative workflows used by top engineering teams worldwide.",
    features: ["Branch Management", "Code Collaboration", "CI Integration"],
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Workflow,
    title: "CI/CD Tools",
    tools: "Jenkins, GitHub Actions, GitLab CI/CD, ArgoCD",
    desc: "Build robust automated pipelines that compile, test, and deploy your code with every commit. Learn to set up multi-stage pipelines, automate testing, and implement continuous delivery for faster, safer releases.",
    features: ["Pipeline Automation", "Continuous Delivery", "Rollback Strategies"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Container,
    title: "Containerization",
    tools: "Docker, Podman",
    desc: "Package applications into lightweight, portable containers that run consistently across any environment. Learn image creation, multi-stage builds, container networking, and production-grade optimization techniques.",
    features: ["Image Optimization", "Multi-Stage Builds", "Container Security"],
    color: "from-cyan-500 to-teal-500",
  },
  {
    icon: Server,
    title: "Orchestration",
    tools: "Kubernetes, Helm, EKS, GKE, OpenShift",
    desc: "Deploy and manage containerized applications at scale with Kubernetes. Learn cluster architecture, service discovery, auto-scaling, rolling updates, and how to run resilient workloads in production environments.",
    features: ["Auto-Scaling", "Service Mesh", "High Availability"],
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: Code2,
    title: "Infrastructure as Code",
    tools: "Terraform, Ansible, CloudFormation",
    desc: "Define and provision entire cloud infrastructure through declarative code. Automate server setup, networking, and security configurations — making infrastructure reproducible, version-controlled, and audit-ready.",
    features: ["Declarative Config", "State Management", "Drift Detection"],
    color: "from-emerald-500 to-green-500",
  },
  {
    icon: Cloud,
    title: "Cloud Platforms",
    tools: "AWS, Azure, GCP",
    desc: "Design, deploy, and manage applications on the world's leading cloud platforms. Learn core services like compute, storage, networking, and serverless — plus cost optimization strategies for real-world projects.",
    features: ["Cloud Architecture", "Cost Optimization", "Serverless"],
    color: "from-sky-500 to-blue-500",
  },
  {
    icon: Activity,
    title: "Monitoring & Observability",
    tools: "Prometheus, Grafana, ELK, Datadog, New Relic",
    desc: "Gain full visibility into your systems with metrics, logs, and distributed tracing. Set up dashboards, configure intelligent alerts, and troubleshoot performance issues before they impact your users.",
    features: ["Real-Time Metrics", "Log Aggregation", "Distributed Tracing"],
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: ShieldCheck,
    title: "DevSecOps",
    tools: "SonarQube, Snyk, Trivy",
    desc: "Integrate security into every stage of your DevOps pipeline. Scan code for vulnerabilities, audit container images, enforce compliance policies, and shift security left to catch issues early in development.",
    features: ["Vulnerability Scanning", "Compliance Auditing", "Shift-Left Security"],
    color: "from-rose-500 to-pink-500",
  },
  {
    icon: Users,
    title: "Collaboration",
    tools: "Jira, Confluence",
    desc: "Streamline team communication and project management with agile tools. Plan sprints, track issues, document knowledge bases, and integrate project boards with your CI/CD pipelines for seamless workflows.",
    features: ["Agile Workflows", "Sprint Planning", "Knowledge Base"],
    color: "from-indigo-500 to-violet-500",
  },
];

const ToolsSection = () => (
  <section id="tools" className="section-padding">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Tools & Technologies</span>
        <h2 className="text-3xl md:text-5xl font-bold mt-3">
          DevOps Tools <span className="gradient-text">Training & Support</span>
        </h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
          Comprehensive hands-on training across the entire DevOps ecosystem — from version control to cloud-native orchestration.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="group p-6 rounded-xl bg-card/80 border border-border shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300"
          >
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${c.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <c.icon size={22} className="text-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-1">{c.title}</h3>
            <p className="text-sm font-mono text-primary mb-3">{c.tools}</p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{c.desc}</p>
            <div className="flex flex-wrap gap-2">
              {c.features.map((f) => (
                <span
                  key={f}
                  className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium"
                >
                  {f}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ToolsSection;
