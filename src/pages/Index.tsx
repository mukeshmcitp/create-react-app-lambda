import Navbar from "@/components/Navbar";
import AnimatedBackground from "@/components/AnimatedBackground";
import PageLoader from "@/components/PageLoader";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import TrainingSection from "@/components/TrainingSection";
import ToolsSection from "@/components/ToolsSection";
import AIToolsSection from "@/components/AIToolsSection";
import YouTubeSection from "@/components/YouTubeSection";
import ServicesSection from "@/components/ServicesSection";
import MonitoringSection from "@/components/MonitoringSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";
import ContactPaymentWidget from "@/components/ContactPaymentWidget";
import CourseCatalogSection from "@/components/CourseCatalogSection";
import CartDrawer from "@/components/CartDrawer";

const Index = () => (
  <div className="min-h-screen bg-background relative">
    <PageLoader />
    <AnimatedBackground />
    <Navbar />
    <HeroSection />
    <AboutSection />
    <TrainingSection />
    <CourseCatalogSection />
    <ToolsSection />
    <AIToolsSection />
    <YouTubeSection />
    <ServicesSection />
    <MonitoringSection />
    <WhyChooseSection />
    <TestimonialsSection />
    <BlogSection />
    <ContactSection />
    <FooterSection />
    <ContactPaymentWidget />
    <CartDrawer />
  </div>
);

export default Index;
