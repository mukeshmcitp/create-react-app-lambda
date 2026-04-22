import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const posts = [
  { category: "DevOps Best Practices", title: "10 Essential DevOps Practices Every Team Should Adopt", date: "Apr 10, 2026" },
  { category: "Kubernetes", title: "Mastering Kubernetes: From Pods to Production", date: "Apr 5, 2026" },
  { category: "CI/CD", title: "Building Zero-Downtime CI/CD Pipelines with ArgoCD", date: "Mar 28, 2026" },
  { category: "Monitoring", title: "Observability Stack: Prometheus + Grafana Deep Dive", date: "Mar 20, 2026" },
];

const BlogSection = () => (
  <section id="blog" className="section-padding relative">
    <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/3 to-background" />
    <div className="container mx-auto relative z-10">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Blog</span>
        <h2 className="text-3xl md:text-5xl font-bold mt-3">Latest <span className="gradient-text">Insights</span></h2>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {posts.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="group p-6 rounded-xl bg-card/80 border border-border shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 cursor-pointer"
          >
            <span className="text-xs font-semibold text-primary uppercase">{p.category}</span>
            <h3 className="text-foreground font-bold mt-2 mb-3 group-hover:text-primary transition-colors">{p.title}</h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{p.date}</span>
              <ArrowRight size={16} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default BlogSection;
