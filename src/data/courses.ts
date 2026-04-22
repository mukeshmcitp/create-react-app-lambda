import type { Course } from "@/hooks/useCart";

export const COURSE_CATEGORIES = [
  "All",
  "DevOps",
  "Cloud",
  "CI/CD",
  "Kubernetes",
  "Security",
  "AI DevOps",
] as const;

export type CourseCategory = (typeof COURSE_CATEGORIES)[number];

export const COURSES: Course[] = [
  { id: "devops-master", title: "DevOps Master Program", category: "DevOps", price: 19999, duration: "16 weeks", level: "Beginner → Advanced" },
  { id: "linux-bash", title: "Linux & Bash Scripting", category: "DevOps", price: 4999, duration: "4 weeks", level: "Beginner" },
  { id: "terraform-iac", title: "Terraform & IaC", category: "DevOps", price: 8999, duration: "5 weeks", level: "Intermediate" },

  { id: "aws-architect", title: "AWS Solutions Architect", category: "Cloud", price: 14999, duration: "10 weeks", level: "Intermediate" },
  { id: "azure-devops", title: "Azure DevOps Engineer", category: "Cloud", price: 13999, duration: "9 weeks", level: "Intermediate" },
  { id: "gcp-essentials", title: "GCP Cloud Essentials", category: "Cloud", price: 11999, duration: "8 weeks", level: "Beginner" },

  { id: "jenkins-pipelines", title: "Jenkins Pipelines Mastery", category: "CI/CD", price: 7999, duration: "5 weeks", level: "Intermediate" },
  { id: "github-actions", title: "GitHub Actions Pro", category: "CI/CD", price: 6999, duration: "4 weeks", level: "Beginner" },
  { id: "gitlab-cicd", title: "GitLab CI/CD Deep Dive", category: "CI/CD", price: 7499, duration: "5 weeks", level: "Intermediate" },

  { id: "k8s-admin", title: "Kubernetes Administrator (CKA)", category: "Kubernetes", price: 16999, duration: "10 weeks", level: "Advanced" },
  { id: "k8s-helm", title: "Helm & K8s Operators", category: "Kubernetes", price: 9999, duration: "6 weeks", level: "Advanced" },
  { id: "k8s-istio", title: "Istio Service Mesh", category: "Kubernetes", price: 10999, duration: "6 weeks", level: "Advanced" },

  { id: "devsecops", title: "DevSecOps Foundations", category: "Security", price: 12999, duration: "8 weeks", level: "Intermediate" },
  { id: "vault-secrets", title: "HashiCorp Vault & Secrets", category: "Security", price: 8999, duration: "5 weeks", level: "Intermediate" },
  { id: "cloud-security", title: "Cloud Security & Compliance", category: "Security", price: 13999, duration: "8 weeks", level: "Advanced" },

  { id: "ai-ops", title: "AIOps & Predictive Monitoring", category: "AI DevOps", price: 15999, duration: "9 weeks", level: "Advanced" },
  { id: "mlops-essentials", title: "MLOps Essentials", category: "AI DevOps", price: 14999, duration: "8 weeks", level: "Intermediate" },
  { id: "ai-copilot-devops", title: "AI Copilot for DevOps", category: "AI DevOps", price: 9999, duration: "5 weeks", level: "Intermediate" },
];

export const formatINR = (amount: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
