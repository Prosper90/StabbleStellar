import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import HowItWorks from "@/components/HowItWorks";
import PoolShowcase from "@/components/PoolShowcase";
import Features from "@/components/Features";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#08080f]">
      <Navbar />
      <Hero />
      <Stats />
      <HowItWorks />
      <PoolShowcase />
      <Features />
      <CTASection />
      <Footer />
    </main>
  );
}
