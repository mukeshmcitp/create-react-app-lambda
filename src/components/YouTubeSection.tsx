import { motion } from "framer-motion";
import { Youtube, ExternalLink, PlayCircle, ListVideo } from "lucide-react";
import { Button } from "@/components/ui/button";

const CHANNEL_URL = "https://www.youtube.com/@GlobalDevOpsLab";
const PLAYLISTS_URL = "https://www.youtube.com/@GlobalDevOpsLab/playlists";

const YouTubeSection = () => (
  <section id="videos" className="section-padding relative overflow-hidden">
    <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-destructive/5 blur-[120px] pointer-events-none" />

    <div className="container mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary uppercase tracking-wider mb-3">
          <Youtube size={16} className="text-destructive" /> Training Videos
        </span>
        <h2 className="text-3xl md:text-5xl font-bold mt-3">
          Learn DevOps with{" "}
          <span className="gradient-text">Curated Playlists</span>
        </h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
          Explore our official YouTube playlists — organized, beginner-to-advanced DevOps & Cloud training, all in one place.
        </p>
      </motion.div>

      {/* Playlist preview card */}
      <motion.a
        href={PLAYLISTS_URL}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.01 }}
        className="block rounded-xl overflow-hidden border border-border bg-card/80 shadow-sm mb-10 group"
      >
        <div className="relative aspect-video bg-gradient-to-br from-primary/15 via-background to-secondary/15 flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.15),transparent_70%)]" />
          <div className="relative z-10 text-center px-6">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-red-500/90 mb-6 shadow-2xl group-hover:bg-red-500 transition-colors"
            >
              <PlayCircle size={56} className="text-white" />
            </motion.div>
            <h3 className="text-2xl md:text-4xl font-bold mb-3">
              Global DevOps Lab — All Playlists
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto mb-6">
              Tap to open our complete collection of training playlists on YouTube.
            </p>
            <span className="inline-flex items-center gap-2 text-primary font-semibold">
              <ListVideo size={18} /> Browse Playlists <ExternalLink size={16} />
            </span>
          </div>
        </div>
      </motion.a>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href={PLAYLISTS_URL} target="_blank" rel="noopener noreferrer">
          <Button size="lg" className="bg-destructive hover:bg-destructive/90 text-destructive-foreground font-bold text-lg px-8 py-6 shadow-lg">
            <ListVideo className="mr-2" size={22} /> View Training Playlists
          </Button>
        </a>
        <a href={`${CHANNEL_URL}?sub_confirmation=1`} target="_blank" rel="noopener noreferrer">
          <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-muted font-bold text-lg px-8 py-6">
            <Youtube className="mr-2" size={20} /> Subscribe on YouTube <ExternalLink className="ml-2" size={16} />
          </Button>
        </a>
      </div>
    </div>
  </section>
);

export default YouTubeSection;
