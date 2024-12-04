import Footer from "@/components/footer/Footer";
import HeroSection from "@/components/hero/HeroSection";
import LaptopCard from "@/components/laptop-cards/LaptopCard";
;
import laptopsData from "@/lib/laptopsData";

const BestLaptops = () => {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Laptop Cards Section */}
      <section className="container mx-auto py-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Our Top Picks
        </h2>
        {laptopsData.map((laptop, index) => (
          <LaptopCard
            key={laptop.id}
            name={laptop.name}
            features={laptop.features}
            ctaLink={laptop.ctaLink}
            image={laptop.image}
            description={laptop.description}
            reverse={index % 2 !== 0} // Alternate layout
          />
        ))}
      </section>

   

      {/* Footer Section */}
      <Footer />
    </>
  );
};

export default BestLaptops;
