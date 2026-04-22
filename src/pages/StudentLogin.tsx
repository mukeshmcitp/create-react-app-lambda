import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { GraduationCap, Mail, Lock, Eye, EyeOff, User, Phone, Loader2, CheckCircle2 } from "lucide-react";
import logo from "@/assets/logo.png";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { signupSchema, loginSchema, forgotSchema } from "@/lib/authSchemas";

type Mode = "login" | "signup" | "forgot";

const passwordRules = [
  { label: "8+ characters", test: (v: string) => v.length >= 8 },
  { label: "Uppercase", test: (v: string) => /[A-Z]/.test(v) },
  { label: "Lowercase", test: (v: string) => /[a-z]/.test(v) },
  { label: "Number", test: (v: string) => /[0-9]/.test(v) },
  { label: "Special character", test: (v: string) => /[^A-Za-z0-9]/.test(v) },
];

const StudentLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading: authLoading } = useAuth();
  const [mode, setMode] = useState<Mode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && user) {
      const from = (location.state as any)?.from?.pathname || "/lms";
      navigate(from, { replace: true });
    }
  }, [user, authLoading, navigate, location]);

  const resetErrors = () => setErrors({});

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    resetErrors();
    const parsed = signupSchema.safeParse({
      fullName, email, mobile, password, confirmPassword, acceptTerms,
    });
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.errors.forEach((er) => {
        if (er.path[0]) fieldErrors[er.path[0] as string] = er.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/lms`,
        data: {
          full_name: parsed.data.fullName,
          mobile: parsed.data.mobile || null,
        },
      },
    });
    setSubmitting(false);
    if (error) {
      if (error.message.toLowerCase().includes("already")) {
        toast({ title: "Account exists", description: "Please sign in instead.", variant: "destructive" });
        setMode("login");
      } else {
        toast({ title: "Sign-up failed", description: error.message, variant: "destructive" });
      }
      return;
    }
    toast({
      title: "Check your inbox",
      description: "We sent you a confirmation link to verify your email.",
    });
    setMode("login");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    resetErrors();
    const parsed = loginSchema.safeParse({ email, password, remember });
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.errors.forEach((er) => {
        if (er.path[0]) fieldErrors[er.path[0] as string] = er.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: parsed.data.email,
      password: parsed.data.password,
    });
    setSubmitting(false);
    if (error) {
      const msg = error.message.toLowerCase().includes("invalid")
        ? "Invalid email or password"
        : error.message.toLowerCase().includes("not confirmed")
        ? "Please verify your email first"
        : error.message;
      toast({ title: "Login failed", description: msg, variant: "destructive" });
      return;
    }
    toast({ title: "Welcome back!", description: "Redirecting to your dashboard..." });
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    resetErrors();
    const parsed = forgotSchema.safeParse({ email });
    if (!parsed.success) {
      setErrors({ email: parsed.error.errors[0].message });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.auth.resetPasswordForEmail(parsed.data.email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setSubmitting(false);
    if (error) {
      toast({ title: "Could not send reset link", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Reset link sent", description: "Check your inbox to reset your password." });
    setMode("login");
  };

  const handleGoogle = async () => {
    setSubmitting(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: `${window.location.origin}/lms`,
    });
    if (result?.error) {
      toast({ title: "Google sign-in failed", description: String(result.error.message ?? result.error), variant: "destructive" });
      setSubmitting(false);
    }
  };

  const titles: Record<Mode, { title: string; desc: string }> = {
    login: { title: "Student Login", desc: "Access your learning dashboard" },
    signup: { title: "Create Account", desc: "Start your DevOps journey" },
    forgot: { title: "Reset Password", desc: "We'll email you a reset link" },
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(var(--secondary)/0.1),transparent_50%)]" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <img src={logo} alt="ITIN Abroad Service" width={40} height={40} className="rounded-md" />
            <span className="text-xl font-bold text-foreground">ITIN Abroad Service</span>
          </Link>
        </div>

        <Card className="border-border/50 bg-card/80 backdrop-blur-xl">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <GraduationCap className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">{titles[mode].title}</CardTitle>
            <CardDescription>{titles[mode].desc}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form
              onSubmit={mode === "signup" ? handleSignup : mode === "forgot" ? handleForgot : handleLogin}
              className="space-y-4"
            >
              {mode === "signup" && (
                <>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1.5 block">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="John Doe"
                        className="pl-10 bg-muted/50 border-border"
                        maxLength={100}
                      />
                    </div>
                    {errors.fullName && <p className="text-xs text-destructive mt-1">{errors.fullName}</p>}
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1.5 block">
                      Mobile Number <span className="opacity-60">(optional)</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="pl-10 bg-muted/50 border-border"
                        maxLength={20}
                      />
                    </div>
                    {errors.mobile && <p className="text-xs text-destructive mt-1">{errors.mobile}</p>}
                  </div>
                </>
              )}

              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="pl-10 bg-muted/50 border-border"
                    maxLength={255}
                    autoComplete="email"
                  />
                </div>
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
              </div>

              {mode !== "forgot" && (
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="pl-10 pr-10 bg-muted/50 border-border"
                      maxLength={72}
                      autoComplete={mode === "signup" ? "new-password" : "current-password"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-xs text-destructive mt-1">{errors.password}</p>}
                  {mode === "signup" && password && (
                    <div className="mt-2 grid grid-cols-2 gap-1">
                      {passwordRules.map((r) => {
                        const ok = r.test(password);
                        return (
                          <div key={r.label} className={`flex items-center gap-1 text-xs ${ok ? "text-green-500" : "text-muted-foreground"}`}>
                            <CheckCircle2 className="w-3 h-3" />
                            {r.label}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {mode === "signup" && (
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="pl-10 bg-muted/50 border-border"
                      maxLength={72}
                      autoComplete="new-password"
                    />
                  </div>
                  {errors.confirmPassword && <p className="text-xs text-destructive mt-1">{errors.confirmPassword}</p>}
                </div>
              )}

              {mode === "signup" && (
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="terms"
                    checked={acceptTerms}
                    onCheckedChange={(c) => setAcceptTerms(!!c)}
                    className="mt-0.5"
                  />
                  <label htmlFor="terms" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                    I agree to the{" "}
                    <a href="#" className="text-primary hover:underline">Terms & Conditions</a> and{" "}
                    <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                  </label>
                </div>
              )}
              {errors.acceptTerms && <p className="text-xs text-destructive">{errors.acceptTerms}</p>}

              {mode === "login" && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                    <Checkbox checked={remember} onCheckedChange={(c) => setRemember(!!c)} />
                    Remember me
                  </label>
                  <button
                    type="button"
                    onClick={() => { resetErrors(); setMode("forgot"); }}
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <Button
                type="submit"
                disabled={submitting}
                className="w-full gradient-bg text-primary-foreground font-semibold"
              >
                {submitting ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Please wait...</>
                ) : mode === "signup" ? "Create Account"
                  : mode === "forgot" ? "Send Reset Link"
                  : "Sign In"}
              </Button>
            </form>

            {mode !== "forgot" && (
              <>
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
                  <div className="relative flex justify-center text-xs"><span className="bg-card px-2 text-muted-foreground">or continue with</span></div>
                </div>

                <Button variant="outline" className="w-full" onClick={handleGoogle} disabled={submitting} type="button">
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </Button>
              </>
            )}

            <p className="text-center text-sm text-muted-foreground mt-4">
              {mode === "login" ? (
                <>Don't have an account?{" "}
                  <button onClick={() => { resetErrors(); setMode("signup"); }} className="text-primary hover:underline font-medium">
                    Sign up
                  </button>
                </>
              ) : (
                <>Already have an account?{" "}
                  <button onClick={() => { resetErrors(); setMode("login"); }} className="text-primary hover:underline font-medium">
                    Sign in
                  </button>
                </>
              )}
            </p>

            <div className="text-center pt-2">
              <Link to="/corporate-login" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Looking for Corporate Login? →
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default StudentLogin;
