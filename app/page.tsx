import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import PainPoints from '@/components/landing/PainPoints';
import Features from '@/components/landing/Features';
import MockupTabs from '@/components/landing/MockupTabs';
import WhyEdusphere from '@/components/landing/WhyEdusphere';
import Testimonials from '@/components/landing/Testimonials';
import Pricing from '@/components/landing/Pricing';
import FAQ from '@/components/landing/FAQ';
import CTAFinal from '@/components/landing/CTAFinal';
import Footer from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <main className="bg-[#06090F] text-[#F0F4FF] overflow-x-hidden selection:bg-[#CE1126]/30">
      <Navbar />
      <Hero />
      <PainPoints />
      <Features />
      <MockupTabs />
      <WhyEdusphere />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTAFinal />
      <Footer />
    </main>
  );
}
