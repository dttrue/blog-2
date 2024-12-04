import Link from "next/link";

const HeroSection = () => {
  return (
    <section>
      <div
        className="relative bg-cover bg-center bg-no-repeat text-center py-48"
        style={{
          backgroundImage: "url('images/hero-2.jpg')",
          filter: "brightness(0.9)",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 text-white">
          <h1 className="text-4xl font-bold">
            Find the Perfect Laptop for Coding
          </h1>
          <p className="mt-4 text-lg">
            Curated reviews and recommendations tailored for developers and
            coders.
          </p>
          {/* <div className="mt-8 space-x-4">
            <Link href="#laptops" className="btn btn-primary px-6 py-3 text-lg">
              See Full List
            </Link>
            <Link
              href="#quick-links"
              className="btn btn-secondary px-6 py-3 text-lg"
            >
              Quick Links
            </Link>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
