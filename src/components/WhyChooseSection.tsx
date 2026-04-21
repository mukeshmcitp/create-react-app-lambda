import { motion } from "framer-motion";
import { Award, Zap, GraduationCap, FileText, Infinity, Users } from "lucide-react";

const reasons = [
  { icon: Award, title: "Industry Expert Trainers" },
  { icon: Zap, title: "Real-Time Use Cases" },
  { icon: GraduationCap, title: "Job-Oriented Training" },
  { icon: FileText, title: "Resume & Interview Support" },
  { icon: Infinity, title: "Lifetime Learning Access" },
  { icon: Users, title: "Enterprise Workshops" },
];

const audiences = ["Freshers & Students", "IT Professionals", "System Admins", "Developers → DevOps"];

const WhyChooseSection = () => (
  <section className="section-padding relative">
    <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/3 to-background" />
    <div className="container mx-auto relative z-10">
      <div className="grid lg:grid-cols-2 gap-16">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Why Choose Us</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-10">
            What Makes Us <span className="gradient-text">Different</span>
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {reasons.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-card glow-border card-hover"
              >
                <r.icon className="text-primary shrink-0" size={22} />
                <span className="text-sm font-medium text-foreground">{r.title}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <span className="text-sm font-semibold text-secondary uppercase tracking-wider">Target Audience</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-10">
            Who Is This <span className="gradient-text">For?</span>
          </h2>
          <div className="space-y-4">
            {audiences.map((a, i) => (
              <motion.div
                key={a}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 p-5 rounded-xl bg-card glow-border card-hover"
              >
                <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center text-primary-foreground font-bold text-sm">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <span className="text-lg font-semibold text-foreground">{a}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default WhyChooseSection;
