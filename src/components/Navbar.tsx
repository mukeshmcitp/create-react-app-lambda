import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Menu, X, LogIn, GraduationCap, ChevronDown, Cloud, Boxes, Map, Briefcase,
  GitBranch, Workflow, Container, Ship, Layers, Settings, Activity,
  Bot, BrainCircuit, Palette, Mic, BarChart3, Search, Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Training Videos", href: "/#videos" },
  { label: "Services", href: "/#services" },
  { label: "Blog", href: "/#blog" },
  { label: "Contact", href: "/#contact" },
];

const trainingItems = [
  { to: "/training/cloud", label: "Cloud Training", desc: "AWS · GCP · Azure", icon: Cloud },
  { to: "/training/devops", label: "DevOps Training", desc: "All DevOps Tools", icon: Boxes },
  { to: "/training/roadmap", label: "Training Roadmap", desc: "Step-by-step path", icon: Map },
  { to: "/training/projects", label: "Real-Time Projects", desc: "DevOps & Observability", icon: Briefcase },
];

type MegaItem = { name: string; href: string };
type MegaCategory = { title: string; icon: any; items: MegaItem[] };

const toolsMega: MegaCategory[] = [
  {
    title: "Version Control", icon: GitBranch, items: [
      { name: "Git", href: "https://git-scm.com/" },
      { name: "GitHub", href: "https://github.com/" },
      { name: "GitLab", href: "https://about.gitlab.com/" },
      { name: "Bitbucket", href: "https://bitbucket.org/" },
    ],
  },
  {
    title: "CI / CD", icon: Workflow, items: [
      { name: "Jenkins", href: "https://www.jenkins.io/" },
      { name: "GitHub Actions", href: "https://github.com/features/actions" },
      { name: "GitLab CI/CD", href: "https://docs.gitlab.com/ee/ci/" },
      { name: "CircleCI", href: "https://circleci.com/" },
    ],
  },
  {
    title: "Containerization", icon: Container, items: [
      { name: "Docker", href: "https://www.docker.com/" },
      { name: "Podman", href: "https://podman.io/" },
    ],
  },
  {
    title: "Orchestration", icon: Ship, items: [
      { name: "Kubernetes", href: "https://kubernetes.io/" },
      { name: "OpenShift", href: "https://www.redhat.com/en/technologies/cloud-computing/openshift" },
    ],
  },
  {
    title: "Infrastructure as Code", icon: Layers, items: [
      { name: "Terraform", href: "https://www.terraform.io/" },
      { name: "AWS CloudFormation", href: "https://aws.amazon.com/cloudformation/" },
      { name: "Ansible", href: "https://www.ansible.com/" },
    ],
  },
  {
    title: "Configuration Mgmt", icon: Settings, items: [
      { name: "Ansible", href: "https://www.ansible.com/" },
      { name: "Chef", href: "https://www.chef.io/" },
      { name: "Puppet", href: "https://www.puppet.com/" },
    ],
  },
  {
    title: "Monitoring & Logging", icon: Activity, items: [
      { name: "Prometheus", href: "https://prometheus.io/" },
      { name: "Grafana", href: "https://grafana.com/" },
      { name: "ELK Stack", href: "https://www.elastic.co/elastic-stack" },
      { name: "Nagios", href: "https://www.nagios.org/" },
      { name: "New Relic", href: "https://newrelic.com/" },
      { name: "ITRS Geneos", href: "https://www.itrsgroup.com/products/geneos" },
    ],
  },
];

const aiToolsMega: MegaCategory[] = [
  {
    title: "AI Code Assistants", icon: Bot, items: [
      { name: "ChatGPT", href: "https://chat.openai.com/" },
      { name: "GitHub Copilot", href: "https://github.com/features/copilot" },
      { name: "Amazon CodeWhisperer", href: "https://aws.amazon.com/codewhisperer/" },
      { name: "Tabnine", href: "https://www.tabnine.com/" },
    ],
  },
  {
    title: "ML Platforms", icon: BrainCircuit, items: [
      { name: "Google Vertex AI", href: "https://cloud.google.com/vertex-ai" },
      { name: "AWS SageMaker", href: "https://aws.amazon.com/sagemaker/" },
      { name: "Azure ML", href: "https://azure.microsoft.com/en-us/products/machine-learning" },
    ],
  },
  {
    title: "Design & Creativity", icon: Palette, items: [
      { name: "DALL·E", href: "https://openai.com/dall-e-3" },
      { name: "MidJourney", href: "https://www.midjourney.com/" },
      { name: "Canva AI", href: "https://www.canva.com/ai-image-generator/" },
      { name: "Adobe Firefly", href: "https://www.adobe.com/products/firefly.html" },
    ],
  },
  {
    title: "Voice & Video", icon: Mic, items: [
      { name: "HeyGen", href: "https://www.heygen.com/" },
      { name: "Synthesia", href: "https://www.synthesia.io/" },
      { name: "ElevenLabs", href: "https://elevenlabs.io/" },
      { name: "Descript", href: "https://www.descript.com/" },
    ],
  },
  {
    title: "Data & Analytics", icon: BarChart3, items: [
      { name: "DataRobot", href: "https://www.datarobot.com/" },
      { name: "H2O.ai", href: "https://h2o.ai/" },
      { name: "RapidMiner", href: "https://rapidminer.com/" },
    ],
  },
  {
    title: "Search & Knowledge", icon: Search, items: [
      { name: "Perplexity AI", href: "https://www.perplexity.ai/" },
      { name: "You.com", href: "https://you.com/" },
      { name: "Wolfram Alpha", href: "https://www.wolframalpha.com/" },
    ],
  },
  {
    title: "DevOps & Automation", icon: Sparkles, items: [
      { name: "Harness AI", href: "https://www.harness.io/" },
      { name: "Dynatrace AI", href: "https://www.dynatrace.com/platform/artificial-intelligence/" },
      { name: "Moogsoft", href: "https://www.moogsoft.com/" },
      { name: "Kubeflow", href: "https://www.kubeflow.org/" },
    ],
  },
];

const MegaMenu = ({
  label, sectionHref, categories, width = "w-[720px]",
}: { label: string; sectionHref: string; categories: MegaCategory[]; width?: string }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button className="relative px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group inline-flex items-center gap-1 outline-none">
        {label} <ChevronDown className="w-3.5 h-3.5" />
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-2/3" />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start" className={`${width} bg-background/95 backdrop-blur-xl border-border p-4`}>
      <div className="grid grid-cols-3 gap-x-4 gap-y-3">
        {categories.map((cat) => (
          <div key={cat.title} className="min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-7 h-7 rounded-md gradient-bg flex items-center justify-center shrink-0">
                <cat.icon className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
              <span className="text-xs font-bold text-foreground uppercase tracking-wide">{cat.title}</span>
            </div>
            <ul className="space-y-0.5 pl-1">
              {cat.items.map((it) => (
                <li key={it.name}>
                  <a
                    href={it.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-xs text-muted-foreground hover:text-primary hover:translate-x-0.5 transition-all py-0.5"
                  >
                    {it.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-3 pt-3 border-t border-border flex justify-end">
        <a href={sectionHref} className="text-xs font-semibold text-primary hover:underline">
          View all on site →
        </a>
      </div>
    </DropdownMenuContent>
  </DropdownMenu>
);

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileTrainingOpen, setMobileTrainingOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const [mobileAIToolsOpen, setMobileAIToolsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-lg shadow-background/50"
          : "bg-background/60 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-3 group">
          <motion.img
            src={logo}
            alt="ITIN Abroad Service"
            width={48}
            height={48}
            className="rounded-md"
            whileHover={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.4 }}
          />
          <span className="text-xl font-bold gradient-text">ITIN Abroad Service</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          <a
            href="/#about"
            className="relative px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group"
          >
            About
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-2/3" />
          </a>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group inline-flex items-center gap-1 outline-none">
                Training <ChevronDown className="w-3.5 h-3.5" />
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-2/3" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-72 bg-background/95 backdrop-blur-xl border-border">
              {trainingItems.map((it) => (
                <DropdownMenuItem key={it.to} asChild className="cursor-pointer p-0">
                  <Link to={it.to} className="flex items-start gap-3 px-3 py-2.5 w-full">
                    <div className="w-9 h-9 rounded-md gradient-bg flex items-center justify-center shrink-0">
                      <it.icon className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-foreground">{it.label}</div>
                      <div className="text-xs text-muted-foreground">{it.desc}</div>
                    </div>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <MegaMenu label="Tools" sectionHref="/#tools" categories={toolsMega} width="w-[760px]" />
          <MegaMenu label="AI Tools" sectionHref="/#ai-tools" categories={aiToolsMega} width="w-[760px]" />

          {navLinks.slice(1).map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group"
            >
              {l.label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-2/3" />
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <Link to="/student-login">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <LogIn className="w-4 h-4 mr-1" /> Login
              </Button>
            </motion.div>
          </Link>
          <Link to="/lms">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="sm" className="gradient-bg text-primary-foreground font-semibold">
                <GraduationCap className="w-4 h-4 mr-1" /> Start Learning
              </Button>
            </motion.div>
          </Link>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-b border-border"
          >
            <div className="flex flex-col gap-1 p-4">
              <a
                href="/#about"
                onClick={() => setOpen(false)}
                className="text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors py-2 px-3"
              >
                About
              </a>

              <button
                onClick={() => setMobileTrainingOpen((v) => !v)}
                className="flex items-center justify-between text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors py-2 px-3"
              >
                <span>Training</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileTrainingOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {mobileTrainingOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden ml-3 border-l border-border pl-3"
                  >
                    {trainingItems.map((it) => (
                      <Link
                        key={it.to}
                        to={it.to}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2 py-2 px-2 text-sm text-muted-foreground hover:text-foreground"
                      >
                        <it.icon className="w-4 h-4 text-primary" />
                        {it.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Mobile Tools */}
              <button
                onClick={() => setMobileToolsOpen((v) => !v)}
                className="flex items-center justify-between text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors py-2 px-3"
              >
                <span>Tools</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileToolsOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {mobileToolsOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden ml-3 border-l border-border pl-3"
                  >
                    {toolsMega.map((cat) => (
                      <div key={cat.title} className="py-1.5">
                        <div className="flex items-center gap-2 text-xs font-bold text-foreground uppercase tracking-wide mb-1">
                          <cat.icon className="w-3.5 h-3.5 text-primary" />
                          {cat.title}
                        </div>
                        <div className="flex flex-wrap gap-x-3 gap-y-1 pl-5">
                          {cat.items.map((it) => (
                            <a
                              key={it.name}
                              href={it.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => setOpen(false)}
                              className="text-xs text-muted-foreground hover:text-primary"
                            >
                              {it.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                    <a
                      href="/#tools"
                      onClick={() => setOpen(false)}
                      className="block text-xs font-semibold text-primary mt-1 py-1"
                    >
                      View all on site →
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Mobile AI Tools */}
              <button
                onClick={() => setMobileAIToolsOpen((v) => !v)}
                className="flex items-center justify-between text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors py-2 px-3"
              >
                <span>AI Tools</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileAIToolsOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {mobileAIToolsOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden ml-3 border-l border-border pl-3"
                  >
                    {aiToolsMega.map((cat) => (
                      <div key={cat.title} className="py-1.5">
                        <div className="flex items-center gap-2 text-xs font-bold text-foreground uppercase tracking-wide mb-1">
                          <cat.icon className="w-3.5 h-3.5 text-primary" />
                          {cat.title}
                        </div>
                        <div className="flex flex-wrap gap-x-3 gap-y-1 pl-5">
                          {cat.items.map((it) => (
                            <a
                              key={it.name}
                              href={it.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => setOpen(false)}
                              className="text-xs text-muted-foreground hover:text-primary"
                            >
                              {it.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                    <a
                      href="/#ai-tools"
                      onClick={() => setOpen(false)}
                      className="block text-xs font-semibold text-primary mt-1 py-1"
                    >
                      View all on site →
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>

              {navLinks.slice(1).map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors py-2 px-3"
                >
                  {l.label}
                </motion.a>
              ))}
              <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-border">
                <Link to="/student-login" onClick={() => setOpen(false)}>
                  <Button variant="outline" className="w-full"><LogIn className="w-4 h-4 mr-2" /> Student Login</Button>
                </Link>
                <Link to="/corporate-login" onClick={() => setOpen(false)}>
                  <Button variant="outline" className="w-full">Corporate Login</Button>
                </Link>
                <Link to="/lms" onClick={() => setOpen(false)}>
                  <Button className="w-full gradient-bg text-primary-foreground font-semibold">
                    <GraduationCap className="w-4 h-4 mr-2" /> Start Learning
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
