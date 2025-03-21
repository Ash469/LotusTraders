import Hero from '@/components/Hero';
import Categories from '@/components/landing_categories';
import Products from '@/components/landing_products';
import DealsOfTheDay from '@/components/DoD';
import Founder from '@/components/founder';
import Testimonials from '@/components/testimonial';
import Footer from '@/components/footer';


export default function Home() {
  return (
    <div>
      <Hero />
      <Categories />
      <DealsOfTheDay />
      <Products />
      <Founder />
      <Testimonials />
      <Footer />
     
    </div>
  );
}
