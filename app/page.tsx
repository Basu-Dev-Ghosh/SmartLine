import Image from "next/image";
import HeroSection from "./components/HeroSection";
import ProductsShowcase from "./components/ProductShow";
import ServicesSection from "./components/SercviceSection";
import PartnerBrands from "./components/PartnerBrands";
import CustomerTestimonials from "./components/CustomerTestimonials";
import MajorCustomers from "./components/MajorCustomers";
import ValuedCustomersLogos from "./components/ValuedCustomersLogos";
import WhyChooseSmartline from "./components/WhyChooseSmartline";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main>
        <section id="hero"><HeroSection /></section>
        <section id="products"><ProductsShowcase /></section>
        <section id="services"><ServicesSection /></section>
        <section id="partners"><PartnerBrands /></section>
        <section id="customers"><MajorCustomers/></section>
        <section id="valued-customers"><ValuedCustomersLogos/></section>
        <section id="testimonials"><CustomerTestimonials/></section>
        <section id="why-choose"><WhyChooseSmartline/></section>
      </main>
      <Footer/>
    </div>
  );
}