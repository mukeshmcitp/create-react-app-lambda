import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, GraduationCap, ShoppingCart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { COURSES, COURSE_CATEGORIES, formatINR, type CourseCategory } from "@/data/courses";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils";

const INITIAL_VISIBLE = 6;

const CourseCatalogSection = () => {
  const [active, setActive] = useState<CourseCategory>("All");
  const [showAll, setShowAll] = useState(false);
  const { addItem, openCart } = useCart();

  const filtered = useMemo(
    () => (active === "All" ? COURSES : COURSES.filter((c) => c.category === active)),
    [active],
  );
  const visible = showAll ? filtered : filtered.slice(0, INITIAL_VISIBLE);
  const hasMore = filtered.length > INITIAL_VISIBLE;

  return (
    <section id="courses" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Course Catalog</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3">
            Explore Our <span className="gradient-text">Courses</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Industry-grade DevOps, Cloud, and AI Ops courses with hands-on labs and real-time projects.
          </p>
        </motion.div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10">
          {COURSE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActive(cat);
                setShowAll(false);
              }}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium border transition-all",
                active === cat
                  ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                  : "border-border bg-card/60 text-muted-foreground hover:text-foreground hover:border-primary/40",
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Courses grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {visible.map((course, i) => (
              <motion.div
                layout
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, delay: Math.min(i * 0.04, 0.2) }}
                className="group flex flex-col p-6 rounded-xl bg-card/80 border border-border shadow-sm hover:shadow-xl hover:border-primary/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <Badge variant="secondary" className="text-xs">{course.category}</Badge>
                  <span className="text-xs text-muted-foreground">{course.level}</span>
                </div>
                <h3 className="text-lg font-bold text-foreground leading-snug mb-2">{course.title}</h3>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-5">
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} /> {course.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <GraduationCap size={14} /> Certified
                  </span>
                </div>
                <div className="mt-auto flex items-center justify-between gap-3 pt-4 border-t border-border">
                  <div>
                    <div className="text-2xl font-bold gradient-text">{formatINR(course.price)}</div>
                    <div className="text-[11px] text-muted-foreground">incl. taxes</div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => {
                      addItem(course);
                      openCart();
                    }}
                    className="gap-1.5"
                  >
                    <Plus size={16} /> Add
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View all + cart actions */}
        <div className="flex flex-wrap justify-center items-center gap-4 mt-12">
          {hasMore && (
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowAll((v) => !v)}
              className="rounded-full"
            >
              {showAll ? "Show Less" : `View All (${filtered.length})`}
            </Button>
          )}
          <Button size="lg" onClick={openCart} className="rounded-full gap-2">
            <ShoppingCart size={18} /> View Cart
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CourseCatalogSection;
