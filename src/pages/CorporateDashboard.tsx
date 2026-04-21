import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Building2, Users, BookOpen, TrendingUp, BarChart3, Download,
  Bell, User, LogOut, Menu, Award, Clock, ChevronRight, Plus,
  FileText, Settings, Headphones
} from "lucide-react";
import logo from "@/assets/logo.png";

const employees = [
  { name: "Priya Sharma", role: "DevOps Engineer", courses: 3, completed: 2, progress: 78 },
  { name: "Rahul Gupta", role: "Cloud Architect", courses: 2, completed: 1, progress: 55 },
  { name: "Anita Patel", role: "SRE", courses: 4, completed: 3, progress: 92 },
  { name: "Vikram Singh", role: "Developer", courses: 2, completed: 0, progress: 25 },
  { name: "Meera Joshi", role: "QA Engineer", courses: 3, completed: 1, progress: 45 },
];

const teamStats = [
  { label: "Total Employees", value: "24", icon: Users, color: "text-primary" },
  { label: "Active Courses", value: "8", icon: BookOpen, color: "text-green-400" },
  { label: "Completion Rate", value: "72%", icon: TrendingUp, color: "text-yellow-400" },
  { label: "Certificates Earned", value: "38", icon: Award, color: "text-secondary" },
];

const CorporateDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border transform transition-transform duration-200 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static`}>
        <div className="flex items-center gap-2 p-4 border-b border-border">
          <img src={logo} alt="ITIN" width={32} height={32} className="rounded-md" />
          <div>
            <span className="font-bold text-foreground text-sm block">Corporate Portal</span>
            <span className="text-xs text-muted-foreground">TechCorp Inc.</span>
          </div>
        </div>
        <nav className="p-4 space-y-1">
          {[
            { icon: BarChart3, label: "Dashboard", active: true },
            { icon: Users, label: "Employees" },
            { icon: BookOpen, label: "Course Management" },
            { icon: TrendingUp, label: "Analytics" },
            { icon: FileText, label: "Reports" },
            { icon: Headphones, label: "Support" },
            { icon: Settings, label: "Settings" },
          ].map(item => (
            <button key={item.label} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${item.active ? 'bg-secondary/10 text-secondary font-medium' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-4 left-4 right-4">
          <Link to="/">
            <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground">
              <LogOut className="w-4 h-4 mr-2" /> Back to Website
            </Button>
          </Link>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <main className="flex-1">
        <header className="sticky top-0 z-20 bg-card/80 backdrop-blur-xl border-b border-border px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="lg:hidden text-foreground" onClick={() => setSidebarOpen(true)}><Menu className="w-5 h-5" /></button>
            <h1 className="text-lg font-semibold text-foreground">Corporate Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon"><Bell className="w-5 h-5" /></Button>
            <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary text-sm font-bold">TC</div>
          </div>
        </header>

        <div className="p-4 md:p-6 space-y-6">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground">TechCorp Inc. 🏢</h2>
              <p className="text-muted-foreground mt-1">Manage your team's learning progress and training programs.</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-2" /> Export Report</Button>
              <Button size="sm" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"><Plus className="w-4 h-4 mr-2" /> Assign Course</Button>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {teamStats.map((stat, i) => (
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

          {/* Analytics overview */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="bg-card/50 border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2"><BarChart3 className="w-4 h-4 text-primary" /> Team Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["DevOps Master Program", "Kubernetes Deep Dive", "AWS Cloud Architecture"].map((course, i) => (
                    <div key={course}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">{course}</span>
                        <span className="text-foreground font-medium">{[72, 58, 85][i]}%</span>
                      </div>
                      <Progress value={[72, 58, 85][i]} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /> Monthly Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Hours Logged", value: "342h", sub: "+12% from last month" },
                    { label: "Courses Completed", value: "14", sub: "+3 from last month" },
                    { label: "Avg. Score", value: "87%", sub: "+5% improvement" },
                    { label: "Active Learners", value: "21/24", sub: "87.5% engagement" },
                  ].map(item => (
                    <div key={item.label} className="text-center p-3 rounded-lg bg-muted/30">
                      <p className="text-xl font-bold text-foreground">{item.value}</p>
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="text-xs text-green-400 mt-1">{item.sub}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Employee table */}
          <Card className="bg-card/50 border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base flex items-center gap-2"><Users className="w-4 h-4 text-primary" /> Employee Progress</CardTitle>
              <Button variant="ghost" size="sm" className="text-primary text-xs">View All <ChevronRight className="w-3 h-3 ml-1" /></Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground">
                      <th className="text-left pb-3 font-medium">Employee</th>
                      <th className="text-left pb-3 font-medium hidden md:table-cell">Role</th>
                      <th className="text-center pb-3 font-medium">Courses</th>
                      <th className="text-center pb-3 font-medium hidden sm:table-cell">Completed</th>
                      <th className="text-left pb-3 font-medium">Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map(emp => (
                      <tr key={emp.name} className="border-b border-border/50 hover:bg-muted/20">
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                              {emp.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="text-foreground font-medium">{emp.name}</span>
                          </div>
                        </td>
                        <td className="py-3 text-muted-foreground hidden md:table-cell">{emp.role}</td>
                        <td className="py-3 text-center text-foreground">{emp.courses}</td>
                        <td className="py-3 text-center text-foreground hidden sm:table-cell">{emp.completed}</td>
                        <td className="py-3 w-32">
                          <div className="flex items-center gap-2">
                            <Progress value={emp.progress} className="h-1.5 flex-1" />
                            <span className="text-xs text-muted-foreground w-8">{emp.progress}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CorporateDashboard;
