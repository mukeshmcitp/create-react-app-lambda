import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Rahul S.", role: "DevOps Engineer at TCS", text: "The hands-on Kubernetes training was a game-changer. I got placed within 2 months of completing the program." },
  { name: "Priya M.", role: "Cloud Engineer at Wipro", text: "ITIN's real-time project support helped me solve critical production issues. Their 24/7 availability is unmatched." },
  { name: "Amit K.", role: "SRE at Infosys", text: "The monitoring & observability module gave me deep expertise in Prometheus and Grafana. Highly recommended!" },
];

const TestimonialsSection = () => (
  <section className="section-padding">
    <div className="container mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Testimonials</span>
        <h2 className="text-3xl md:text-5xl font-bold mt-3">What Our <span className="gradient-text">Students Say</span></h2>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-xl bg-card/80 border border-border shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300"
          >
            <div className="flex gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} size={16} className="fill-primary text-primary" />
              ))}
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">"{t.text}"</p>
            <div>
              <p className="font-semibold text-foreground">{t.name}</p>
              <p className="text-sm text-muted-foreground">{t.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
