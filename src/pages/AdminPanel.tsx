import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Users, BookOpen, DollarSign, BarChart3, Headphones,
  Settings, Bell, LogOut, Menu, TrendingUp, Plus, ChevronRight,
  FileText, Shield, UserCheck, Building2
} from "lucide-react";
import logo from "@/assets/logo.png";

const adminStats = [
  { label: "Total Students", value: "3,240", icon: Users, color: "text-primary", change: "+156 this month" },
  { label: "Corporate Clients", value: "28", icon: Building2, color: "text-secondary", change: "+3 this month" },
  { label: "Active Courses", value: "12", icon: BookOpen, color: "text-green-400", change: "2 pending review" },
  { label: "Revenue (MTD)", value: "₹8.4L", icon: DollarSign, color: "text-yellow-400", change: "+18% vs last month" },
];

const recentActivity = [
  { action: "New enrollment", detail: "Priya Sharma enrolled in DevOps Master Program", time: "2 min ago", type: "enrollment" },
  { action: "Course completed", detail: "Rahul Gupta completed Kubernetes Deep Dive", time: "1 hour ago", type: "completion" },
  { action: "New corporate signup", detail: "Infosys Ltd. registered for enterprise plan", time: "3 hours ago", type: "corporate" },
  { action: "Support ticket", detail: "Ticket #1234 - Video playback issue", time: "5 hours ago", type: "support" },
  { action: "Payment received", detail: "₹14,999 from Meera Joshi", time: "6 hours ago", type: "payment" },
];

const AdminPanel = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border transform transition-transform duration-200 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static`}>
        <div className="flex items-center gap-2 p-4 border-b border-border">
          <img src={logo} alt="ITIN" width={32} height={32} className="rounded-md" />
          <div>
            <span className="font-bold text-foreground text-sm block">Admin Panel</span>
            <Badge variant="destructive" className="text-xs mt-0.5">Admin</Badge>
          </div>
        </div>
        <nav className="p-4 space-y-1">
          {[
            { icon: LayoutDashboard, label: "Dashboard", active: true },
            { icon: Users, label: "Manage Users" },
            { icon: BookOpen, label: "Manage Courses" },
            { icon: DollarSign, label: "Sales & Revenue" },
            { icon: Headphones, label: "Support Tickets" },
            { icon: BarChart3, label: "Analytics" },
            { icon: Shield, label: "Roles & Access" },
            { icon: Settings, label: "Settings" },
          ].map(item => (
            <button key={item.label} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${item.active ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>
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

      <main className="flex-1">
        <header className="sticky top-0 z-20 bg-card/80 backdrop-blur-xl border-b border-border px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="lg:hidden text-foreground" onClick={() => setSidebarOpen(true)}><Menu className="w-5 h-5" /></button>
            <h1 className="text-lg font-semibold text-foreground">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button size="sm" className="gradient-bg text-primary-foreground"><Plus className="w-4 h-4 mr-1" /> Add Course</Button>
            <Button variant="ghost" size="icon"><Bell className="w-5 h-5" /></Button>
            <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center text-destructive text-sm font-bold">A</div>
          </div>
        </header>

        <div className="p-4 md:p-6 space-y-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-2xl font-bold text-foreground">Admin Overview 🛡️</h2>
            <p className="text-muted-foreground mt-1">Monitor and manage all aspects of the LMS platform.</p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {adminStats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="bg-card/50 border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center ${stat.color}`}>
                        <stat.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                      </div>
                    </div>
                    <p className="text-xs text-green-400 mt-2">{stat.change}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Recent Activity */}
            <Card className="bg-card/50 border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2"><TrendingUp className="w-4 h-4 text-primary" /> Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity, i) => (
                    <div key={i} className="flex items-start gap-3 py-2 border-b border-border/30 last:border-0">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === 'enrollment' ? 'bg-primary' :
                        activity.type === 'completion' ? 'bg-green-400' :
                        activity.type === 'corporate' ? 'bg-secondary' :
                        activity.type === 'payment' ? 'bg-yellow-400' : 'bg-destructive'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground font-medium">{activity.action}</p>
                        <p className="text-xs text-muted-foreground truncate">{activity.detail}</p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-card/50 border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2"><Settings className="w-4 h-4 text-primary" /> Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: BookOpen, label: "Add Course", color: "bg-primary/10 text-primary" },
                    { icon: Users, label: "Add User", color: "bg-green-400/10 text-green-400" },
                    { icon: FileText, label: "Generate Report", color: "bg-yellow-400/10 text-yellow-400" },
                    { icon: Headphones, label: "View Tickets", color: "bg-destructive/10 text-destructive" },
                    { icon: Building2, label: "Corporate Clients", color: "bg-secondary/10 text-secondary" },
                    { icon: UserCheck, label: "Manage Roles", color: "bg-primary/10 text-primary" },
                  ].map(action => (
                    <button key={action.label} className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${action.color}`}>
                        <action.icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs text-muted-foreground">{action.label}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
