import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1 container mx-auto px-4 py-20">
      <h1 className="font-heading font-bold text-3xl text-foreground mb-4">About AutoDrive</h1>
      <p className="text-muted-foreground">About page coming soon.</p>
    </main>
    <Footer />
  </div>
);

export default About;
