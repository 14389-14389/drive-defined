import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, Percent, Clock, Shield, CheckCircle, ArrowRight, Phone, Mail, Calendar } from 'lucide-react';

const Finance = () => {
  const financeOptions = [
    {
      title: "Hire Purchase",
      description: "Own the vehicle at the end of the term with fixed monthly payments",
      interestRate: "From 13% p.a.",
      term: "12 - 72 months",
      deposit: "10% minimum",
      icon: Calculator
    },
    {
      title: "Balloon Payment",
      description: "Lower monthly payments with a larger final payment",
      interestRate: "From 14% p.a.",
      term: "12 - 72 months",
      deposit: "10% minimum",
      icon: Percent
    },
    {
      title: "Lease Agreement",
      description: "Perfect for businesses with tax benefits and flexible terms",
      interestRate: "From 12.5% p.a.",
      term: "24 - 60 months",
      deposit: " negotiable",
      icon: Clock
    }
  ];

  const partners = [
    { name: "KCB Bank", logo: "🏦" },
    { name: "Equity Bank", logo: "🏦" },
    { name: "Cooperative Bank", logo: "🏦" },
    { name: "NCBA Bank", logo: "🏦" },
    { name: "Stanbic Bank", logo: "🏦" },
    { name: "Absa Bank", logo: "🏦" }
  ];

  const calculators = [
    { label: "Vehicle Price", placeholder: "e.g., 2,500,000" },
    { label: "Deposit", placeholder: "e.g., 250,000" },
    { label: "Interest Rate (%)", placeholder: "e.g., 13" },
    { label: "Loan Term (months)", placeholder: "e.g., 60" }
  ];

  const openWhatsApp = (message: string) => {
    const phone = "254726894129";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Finance Options
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Flexible financing solutions tailored to your budget
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
                  <Calculator className="mr-2 h-5 w-5" />
                  Calculate Payments
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => openWhatsApp("Hi, I'd like to speak with a finance expert about vehicle financing options.")}
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Talk to an Expert
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Finance Calculator Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calculator Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-blue-900" />
                    Payment Calculator
                  </CardTitle>
                  <CardDescription>
                    Estimate your monthly payments
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {calculators.map((field, index) => (
                    <div key={index}>
                      <label className="text-sm font-medium mb-1 block">{field.label}</label>
                      <input
                        type="text"
                        placeholder={field.placeholder}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900/20"
                      />
                    </div>
                  ))}
                  <Button className="w-full bg-blue-900 hover:bg-blue-800">
                    Calculate
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Approval */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-900" />
                    Quick Approval
                  </CardTitle>
                  <CardDescription>
                    Get pre-approved in minutes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-green-800">95% Approval Rate</h3>
                        <p className="text-sm text-green-700">Most applications approved within 24 hours</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Clock className="h-5 w-5 text-gray-600" />
                      <span className="text-sm">Same-day approval available</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Percent className="h-5 w-5 text-gray-600" />
                      <span className="text-sm">Rates from 13% p.a.</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Calendar className="h-5 w-5 text-gray-600" />
                      <span className="text-sm">Flexible terms up to 72 months</span>
                    </div>
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => openWhatsApp("Hi, I'd like to apply for financing for a vehicle.")}
                  >
                    Apply Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Finance Options */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Finance Options</h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Choose the financing option that works best for you
            </p>

            <Tabs defaultValue="personal" className="max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="business">Business</TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {financeOptions.map((option, index) => {
                    const Icon = option.icon;
                    return (
                      <Card key={index} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                            <Icon className="h-6 w-6 text-blue-900" />
                          </div>
                          <CardTitle>{option.title}</CardTitle>
                          <CardDescription>{option.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 text-sm">
                            <li className="flex justify-between">
                              <span className="text-gray-500">Interest Rate:</span>
                              <span className="font-semibold">{option.interestRate}</span>
                            </li>
                            <li className="flex justify-between">
                              <span className="text-gray-500">Term:</span>
                              <span className="font-semibold">{option.term}</span>
                            </li>
                            <li className="flex justify-between">
                              <span className="text-gray-500">Deposit:</span>
                              <span className="font-semibold">{option.deposit}</span>
                            </li>
                          </ul>
                          <Button variant="link" className="mt-4 p-0 text-blue-900">
                            Learn More <ArrowRight className="ml-1 h-4 w-4" />
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="business" className="mt-8">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center text-gray-600">
                      Business finance options coming soon. Please contact our team for custom quotes.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Partner Banks */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Our Partner Banks</h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              We work with Kenya's leading financial institutions
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {partners.map((partner, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
                  <div className="text-4xl mb-2">{partner.logo}</div>
                  <p className="font-semibold text-sm">{partner.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Our finance experts are here to help you find the best option
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-900 hover:bg-gray-100"
                onClick={() => openWhatsApp("Hi, I'd like to speak with a finance expert.")}
              >
                <Phone className="mr-2 h-5 w-5" />
                Call 0726 894 129
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                onClick={() => openWhatsApp("Hi, I'm interested in financing options.")}
              >
                <Mail className="mr-2 h-5 w-5" />
                finance@autodrive.co.ke
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Finance;