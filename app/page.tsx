import HeroSection from "./components/HeroSection";
import ProductsShowcase from "./components/ProductShow";
import ServicesSection from "./components/SercviceSection";
import PartnerBrands from "./components/PartnerBrands";
import CustomerTestimonials from "./components/CustomerTestimonials";
import MajorCustomers from "./components/MajorCustomers";
import WhyChooseSmartline from "./components/WhyChooseSmartline";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import FAQ from "./components/FAQ";
import ServiceApproachCTA from "./components/ServiceApproachCTA";
import AboutUsSection from "./components/AboutUsSection";

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <main>
        <section id="hero">
          <HeroSection />
        </section>
        <section id="products">
          <ProductsShowcase />
        </section>
        <section id="services">
          <ServicesSection />
        </section>
        <section id="partners">
          <PartnerBrands />
        </section>
        <section id="customers">
          <MajorCustomers />
        </section>
        <section id="faq">
          <FAQ />
        </section>
        {/* <section id="testimonials">
          <CustomerTestimonials />
        </section> */}
        <section id="why-choose">
          <WhyChooseSmartline />
        </section>
        <section id="about">
          <AboutUsSection />
        </section>
        <section id="service-approach">
          <ServiceApproachCTA />
        </section>
      </main>
      <Footer />
    </div>
  );
}
