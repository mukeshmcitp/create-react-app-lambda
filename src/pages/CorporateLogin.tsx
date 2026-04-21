import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Building2, Mail, Lock, Eye, EyeOff, KeyRound } from "lucide-react";
import logo from "@/assets/logo.png";

const CorporateLogin = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--secondary)/0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(var(--primary)/0.1),transparent_50%)]" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <img src={logo} alt="ITIN Abroad Service" width={40} height={40} className="rounded-md" />
            <span className="text-xl font-bold text-foreground">ITIN Abroad Service</span>
          </Link>
        </div>

        <Card className="border-border/50 bg-card/80 backdrop-blur-xl">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-3">
              <Building2 className="w-6 h-6 text-secondary" />
            </div>
            <CardTitle className="text-2xl">Corporate Login</CardTitle>
            <CardDescription>Access your enterprise training portal</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Company ID</label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="CORP-XXXXX" className="pl-10 bg-muted/50 border-border" />
              </div>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Work Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="you@company.com" className="pl-10 bg-muted/50 border-border" />
              </div>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input type={showPassword ? "text" : "password"} placeholder="••••••••" className="pl-10 pr-10 bg-muted/50 border-border" />
                <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button className="text-sm text-primary hover:underline">Forgot password?</button>
            </div>

            <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold">
              Sign In to Corporate Portal
            </Button>

            <div className="bg-muted/30 rounded-lg p-4 mt-4">
              <p className="text-sm text-muted-foreground text-center">
                <Building2 className="inline w-4 h-4 mr-1 -mt-0.5" />
                Need a corporate account? <a href="#contact" className="text-primary hover:underline">Contact our sales team</a>
              </p>
            </div>

            <div className="text-center pt-2">
              <Link to="/student-login" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                ← Student Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CorporateLogin;
