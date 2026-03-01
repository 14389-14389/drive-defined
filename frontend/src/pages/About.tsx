
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import showroomImage from '@/assets/hero-showroom.jpg';  // Changed from showroom.jpg to hero-showroom.jpg

const About = () => {
  const stats = [
    { value: "500+", label: "Vehicles Sold" },
    { value: "4.9", label: "Customer Rating" },
    { value: "150+", label: "Inspection Points" },
    { value: "5+", label: "Years of Excellence" }
  ];

  const values = [
    {
      title: "Trust & Integrity",
      description: "We believe in transparent dealings and honest communication with every customer."
    },
    {
      title: "Excellence",
      description: "We strive for excellence in every vehicle we sell and every service we provide."
    },
    {
      title: "Customer First",
      description: "Your satisfaction is our priority. We go above and beyond to meet your needs."
    },
    {
      title: "Innovation",
      description: "We continuously evolve to bring you the best automotive experience."
    }
  ];

  const team = [
    {
      name: "James Mwangi",
      role: "Founder & CEO",
      bio: "15+ years in automotive industry"
    },
    {
      name: "Sarah Wambui",
      role: "Sales Director",
      bio: "Expert in luxury vehicle sales"
    },
    {
      name: "David Omondi",
      role: "Finance Manager",
      bio: "Finance & banking specialist"
    },
    {
      name: "Lucy Njeri",
      role: "Customer Relations",
      bio: "Dedicated to customer satisfaction"
    }
  ];

  const milestones = [
    { year: "2020", event: "AutoDrive Kenya Founded" },
    { year: "2021", event: "Sold 100th Vehicle" },
    { year: "2022", event: "Expanded to Nairobi Showroom" },
    { year: "2023", event: "Partnered with 6 Major Banks" },
    { year: "2024", event: "500+ Vehicles Sold" },
    { year: "2025", event: "Awarded Best Used Car Dealer" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20 overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                About AutoDrive Kenya
              </h1>
              <p className="text-xl text-blue-100 mb-8">
               
              </p>
              <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
                Talk to Our Team
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-blue-900 font-semibold text-sm uppercase tracking-wider">
                  Our Story
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
                  Kenya's Premier <span className="text-blue-900">Auto Dealership</span>
                </h2>
                <p className="text-gray-600 mb-4">
                  Founded in 2020, AutoDrive Kenya has grown to become one of Nairobi's most trusted names in pre-owned luxury and performance vehicles. We started with a simple mission: to provide Kenyans with access to high-quality, thoroughly inspected vehicles at competitive prices.
                </p>
                <p className="text-gray-600 mb-4">
                  Today, we're proud to have served over 500 happy customers across Nairobi, Mombasa, Kisumu, and beyond. Our success is built on a foundation of trust, transparency, and unwavering commitment to customer satisfaction.
                </p>
                <div className="mt-6">
                  <span className="text-sm text-gray-500">Trusted by 500+ customers</span>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-video bg-gray-200 rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src={showroomImage} 
                    alt="AutoDrive Kenya Showroom"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                  <p className="font-semibold">Nairobi, Kenya</p>
                  <p className="text-sm text-gray-500">Serving Nationwide</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-blue-900 font-semibold text-sm uppercase tracking-wider">
                What Drives Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                Our Core Values
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                    <p className="text-gray-500 text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-blue-900 font-semibold text-sm uppercase tracking-wider">
                Our Journey
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                Company Milestones
              </h2>
            </div>

            <div className="max-w-3xl mx-auto">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-4 mb-6 last:mb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    {index < milestones.length - 1 && (
                      <div className="w-0.5 h-16 bg-blue-200 mt-2"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <span className="text-blue-900 font-bold">{milestone.year}</span>
                      <h3 className="text-lg font-semibold mt-1">{milestone.event}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-blue-900 font-semibold text-sm uppercase tracking-wider">
                Meet The Team
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                Our Leadership
              </h2>
              <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
                Dedicated professionals committed to your satisfaction
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-blue-900 font-semibold text-sm mb-2">{member.role}</p>
                    <p className="text-gray-500 text-sm">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Find Your Perfect Drive?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Visit our showroom or contact us today
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
                0726 894 129
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                info@autodrive.co.ke
              </Button>
            </div>
            <p className="text-sm text-blue-200 mt-4">
              ABC Place, Waiyaki Way, Nairobi
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
