import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Cloud, Server, Database, Shield, Code, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const providers = {
  aws: {
    name: "AWS Training",
    color: "from-orange-500/20 to-yellow-500/20",
    fundamentals: ["EC2, S3, VPC, IAM basics", "Regions, AZs & Edge Locations", "Shared Responsibility Model", "Billing & Cost Optimization"],
    architecture: ["3-tier web architecture", "Auto Scaling & Load Balancers", "Serverless with Lambda + API Gateway", "Multi-region disaster recovery"],
    labs: ["Deploy a static site on S3 + CloudFront", "Build a CI/CD pipeline with CodePipeline", "Set up RDS with read replicas", "Provision infra using CloudFormation"],
  },
  gcp: {
    name: "Google Cloud (GCP) Training",
    color: "from-blue-500/20 to-red-500/20",
    fundamentals: ["Compute Engine, GCS, VPC, IAM", "Projects, Folders & Organizations", "Service accounts & roles", "Pricing & sustained-use discounts"],
    architecture: ["GKE cluster design patterns", "Cloud Run & Cloud Functions", "BigQuery data warehouse design", "Hybrid with Anthos"],
    labs: ["Deploy app to Cloud Run", "Set up GKE with Ingress", "BigQuery analytics pipeline", "Terraform on GCP"],
  },
  azure: {
    name: "Microsoft Azure Training",
    color: "from-blue-600/20 to-cyan-500/20",
    fundamentals: ["VMs, Blob Storage, VNets, Entra ID", "Resource Groups & ARM", "Azure pricing calculator", "Governance with Policy & Blueprints"],
    architecture: ["AKS cluster architecture", "App Service & Functions", "Hub-and-spoke networking", "Azure DevOps end-to-end"],
    labs: ["Deploy WebApp with slots", "Build AKS cluster + Helm chart", "ARM/Bicep templates", "Azure Monitor + Log Analytics"],
  },
};

const CloudTraining = () => {
  const [tab, setTab] = useState<keyof typeof providers>("aws");

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <Navbar />
      <main className="pt-24 pb-16 px-4 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Cloud Training</span>
            <h1 className="text-4xl md:text-6xl font-bold mt-3">
              <span className="gradient-text">AWS · GCP · Azure</span>
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Master the three leading cloud platforms with fundamentals, architecture patterns, and hands-on labs.
            </p>
          </motion.div>

          <Tabs value={tab} onValueChange={(v) => setTab(v as keyof typeof providers)} className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto mb-10">
              <TabsTrigger value="aws">AWS</TabsTrigger>
              <TabsTrigger value="gcp">GCP</TabsTrigger>
              <TabsTrigger value="azure">Azure</TabsTrigger>
            </TabsList>

            {(Object.keys(providers) as (keyof typeof providers)[]).map((key) => {
              const p = providers[key];
              return (
                <TabsContent key={key} value={key}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-8 rounded-2xl bg-gradient-to-br ${p.color} border border-border mb-8`}
                  >
                    <h2 className="text-3xl font-bold text-foreground">{p.name}</h2>
                    <p className="text-muted-foreground mt-2">Industry-aligned curriculum with real-world labs and certification prep.</p>
                  </motion.div>

                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      { icon: Cloud, title: "Cloud Fundamentals", items: p.fundamentals },
                      { icon: Server, title: "Architecture & Deployment", items: p.architecture },
                      { icon: Code, title: "Hands-on Labs", items: p.labs },
                    ].map((sec, i) => (
                      <motion.div
                        key={sec.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-6 rounded-xl bg-card glow-border card-hover"
                      >
                        <div className="w-12 h-12 rounded-lg gradient-bg flex items-center justify-center mb-4">
                          <sec.icon className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-3">{sec.title}</h3>
                        <ul className="space-y-2">
                          {sec.items.map((it) => (
                            <li key={it} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                              <span>{it}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>

          <div className="mt-12 text-center">
            <Link to="/#contact">
              <Button size="lg" className="gradient-bg text-primary-foreground font-semibold">
                Enroll in Cloud Training
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default CloudTraining;
