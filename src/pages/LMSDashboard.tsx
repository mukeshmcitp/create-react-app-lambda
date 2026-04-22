import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import {
  Search, BookOpen, Clock, Star, Users, Play, ChevronRight,
  GraduationCap, TrendingUp, Award, Bell, User, LogOut, Menu,
} from "lucide-react";
import logo from "@/assets/logo.png";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const categories = ["All", "DevOps", "Cloud", "CI/CD", "Kubernetes", "Security", "AI DevOps"];

const courses = [
  { id: 1, title: "DevOps Master Program", category: "DevOps", level: "Beginner to Advanced", duration: "40 hours", students: 2340, rating: 4.9, progress: 65, image: "🔧", modules: 12, price: "₹14,999" },
  { id: 2, title: "Kubernetes Deep Dive", category: "Kubernetes", level: "Intermediate", duration: "25 hours", students: 1890, rating: 4.8, progress: 0, image: "⚓", modules: 8, price: "₹9,999" },
  { id: 3, title: "AWS Cloud Architecture", category: "Cloud", level: "Advanced", duration: "30 hours", students: 1560, rating: 4.7, progress: 30, image: "☁️", modules: 10, price: "₹12,999" },
  { id: 4, title: "CI/CD Pipeline Mastery", category: "CI/CD", level: "Intermediate", duration: "20 hours", students: 2100, rating: 4.8, progress: 0, image: "🔄", modules: 7, price: "₹7,999" },
  { id: 5, title: "DevSecOps Essentials", category: "Security", level: "Intermediate", duration: "18 hours", students: 980, rating: 4.6, progress: 0, image: "🛡️", modules: 6, price: "₹8,999" },
  { id: 6, title: "AI-Powered DevOps", category: "AI DevOps", level: "Advanced", duration: "22 hours", students: 750, rating: 4.9, progress: 10, image: "🤖", modules: 8, price: "₹11,999" },
];

const stats = [
  { label: "Enrolled Courses", value: "3", icon: BookOpen, color: "text-primary" },
  { label: "Hours Learned", value: "47", icon: Clock, color: "text-green-400" },
  { label: "Certificates", value: "1", icon: Award, color: "text-yellow-400" },
  { label: "Current Streak", value: "12 days", icon: TrendingUp, color: "text-secondary" },
];

const LMSDashboard = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profile, setProfile] = useState<{ full_name: string | null; avatar_url: string | null } | null>(null);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("full_name, avatar_url").eq("id", user.id).maybeSingle()
      .then(({ data }) => setProfile(data));
  }, [user]);

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const displayName = profile?.full_name || user?.email?.split("@")[0] || "Student";
  const initials = displayName.split(" ").map(s => s[0]).slice(0, 2).join("").toUpperCase();

  const filtered = courses.filter(c =>
    (selectedCategory === "All" || c.category === selectedCategory) &&
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border transform transition-transform duration-200 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static`}>
        <div className="flex items-center gap-2 p-4 border-b border-border">
          <img src={logo} alt="ITIN" width={32} height={32} className="rounded-md" />
          <span className="font-bold text-foreground">LMS Portal</span>
        </div>
        <nav className="p-4 space-y-1">
          {[
            { icon: BookOpen, label: "My Courses", active: true, to: "#" },
            { icon: Play, label: "Continue Learning", to: "#" },
            { icon: Award, label: "Certificates", to: "#" },
            { icon: Star, label: "Bookmarks", to: "#" },
            { icon: Users, label: "Discussion Forum", to: "#" },
            { icon: Bell, label: "Notifications", to: "#" },
            { icon: User, label: "Profile", to: "/profile" },
          ].map(item => (
            <Link key={item.label} to={item.to}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${item.active ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-4 left-4 right-4 space-y-1">
          <Link to="/">
            <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground">
              <LogOut className="w-4 h-4 mr-2" /> Back to Website
            </Button>
          </Link>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="w-full justify-start text-destructive hover:text-destructive">
            <LogOut className="w-4 h-4 mr-2" /> Sign Out
          </Button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main content */}
      <main className="flex-1 lg:ml-0">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-card/80 backdrop-blur-xl border-b border-border px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="lg:hidden text-foreground" onClick={() => setSidebarOpen(true)}><Menu className="w-5 h-5" /></button>
            <h1 className="text-lg font-semibold text-foreground">Student Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon"><Bell className="w-5 h-5" /></Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-full focus:outline-none focus:ring-2 focus:ring-primary">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={profile?.avatar_url ?? undefined} />
                    <AvatarFallback className="bg-primary/20 text-primary text-sm font-bold">{initials}</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="font-medium">{displayName}</div>
                  <div className="text-xs text-muted-foreground font-normal truncate">{user?.email}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User className="w-4 h-4 mr-2" /> Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="w-4 h-4 mr-2" /> Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <div className="p-4 md:p-6 space-y-6">
          {/* Welcome */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-2xl font-bold text-foreground">Welcome back, {displayName.split(" ")[0]}! 👋</h2>
            <p className="text-muted-foreground mt-1">Continue your DevOps journey. You're making great progress!</p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="bg-card/50 border-border/50">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center ${stat.color}`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Continue Learning */}
          {courses.filter(c => c.progress > 0).length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <Play className="w-5 h-5 text-primary" /> Continue Learning
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses.filter(c => c.progress > 0).map(course => (
                  <Card key={course.id} className="bg-card/50 border-border/50 hover:border-primary/30 transition-all cursor-pointer group">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="text-3xl">{course.image}</div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors truncate">{course.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1">{course.modules} modules · {course.duration}</p>
                          <div className="mt-3">
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="text-primary font-medium">{course.progress}%</span>
                            </div>
                            <Progress value={course.progress} className="h-1.5" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Course Catalog */}
          <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-primary" /> Course Catalog
              </h3>
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search courses..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10 bg-muted/50 border-border h-9" />
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
              {categories.map(cat => (
                <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${selectedCategory === cat ? 'bg-primary text-primary-foreground' : 'bg-muted/50 text-muted-foreground hover:text-foreground'}`}>
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((course, i) => (
                <motion.div key={course.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all cursor-pointer group overflow-hidden">
                    <div className="h-32 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-5xl">
                      {course.image}
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs">{course.category}</Badge>
                        <Badge variant="outline" className="text-xs">{course.level}</Badge>
                      </div>
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">{course.title}</h4>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{course.duration}</span>
                        <span className="flex items-center gap-1"><Users className="w-3 h-3" />{course.students}</span>
                        <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-400" />{course.rating}</span>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-lg font-bold text-foreground">{course.price}</span>
                        <Button size="sm" className="gradient-bg text-primary-foreground text-xs">
                          {course.progress > 0 ? "Continue" : "Enroll"} <ChevronRight className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LMSDashboard;
