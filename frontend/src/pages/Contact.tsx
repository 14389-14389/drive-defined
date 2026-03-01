import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      title: "Phone",
      details: ["0726 894 129", "0734 567 890"],
      action: "tel:+254726894129",
      actionText: "Call now"
    },
    {
      title: "Email",
      details: ["info@autodrive.co.ke", "sales@autodrive.co.ke"],
      action: "mailto:info@autodrive.co.ke",
      actionText: "Send email"
    },
    {
      title: "Address",
      details: ["ABC Place, Waiyaki Way", "Nairobi, Kenya"],
      action: "https://maps.google.com/?q=ABC+Place+Nairobi",
      actionText: "Get directions"
    },
    {
      title: "Business Hours",
      details: ["Mon-Fri: 8:00 AM - 6:00 PM", "Sat: 9:00 AM - 4:00 PM", "Sun: Closed"],
      action: null,
      actionText: ""
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Contact Us
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                We're here to help with any questions you may have
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
                  Call Us Now
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  WhatsApp Us
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-3">{info.title}</h3>
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-gray-600 text-sm mb-1">{detail}</p>
                    ))}
                    {info.action && (
                      <a 
                        href={info.action} 
                        className="text-blue-900 text-sm font-semibold mt-3 inline-block hover:underline"
                        target={info.title === "Address" ? "_blank" : undefined}
                        rel={info.title === "Address" ? "noopener noreferrer" : undefined}
                      >
                        {info.actionText}
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Map and Form Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Map */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Visit Our Showroom</h2>
                <div className="bg-gray-200 rounded-lg overflow-hidden h-[400px] relative">
                  {/* Google Maps iframe - Nairobi location */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8462962765316!2d36.781315!3d-1.292066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f109dc7ffb229%3A0x8f5c6b5c5b5b5b5b!2sABC%20Place%20Nairobi!5e0!3m2!1sen!2ske!4v1620000000000!5m2!1sen!2ske"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="AutoDrive Nairobi Location"
                  ></iframe>
                </div>
                <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                  <div>
                    <p className="font-semibold">ABC Place, Waiyaki Way</p>
                    <p className="text-sm text-gray-600">Nairobi, Kenya</p>
                    <p className="text-sm text-gray-500 mt-1">Opposite The Junction Mall</p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Send Us a Message</h2>
                <Card>
                  <CardContent className="p-6">
                    {submitStatus === 'success' && (
                      <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="font-semibold text-green-800">Message Sent!</p>
                        <p className="text-sm text-green-700">We'll get back to you within 24 hours.</p>
                      </div>
                    )}

                    {submitStatus === 'error' && (
                      <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="font-semibold text-red-800">Error</p>
                        <p className="text-sm text-red-700">Please try again or call us directly.</p>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-1 block">Name *</label>
                          <Input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1 block">Email *</label>
                          <Input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-1 block">Phone *</label>
                          <Input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="0726 894 129"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1 block">Subject</label>
                          <Input
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="Inquiry about..."
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-1 block">Message *</label>
                        <Textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us how we can help you..."
                          rows={5}
                          required
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-blue-900 hover:bg-blue-800"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                {
                  q: "What are your showroom hours?",
                  a: "We're open Monday to Friday from 8:00 AM to 6:00 PM, and Saturdays from 9:00 AM to 4:00 PM. We're closed on Sundays."
                },
                {
                  q: "Do I need an appointment for a test drive?",
                  a: "While walk-ins are welcome, we recommend booking an appointment to ensure your preferred vehicle is available and ready."
                },
                {
                  q: "Do you offer financing?",
                  a: "Yes! We work with major Kenyan banks including KCB, Equity, and Cooperative Bank to offer competitive financing options."
                },
                {
                  q: "Can I trade in my current vehicle?",
                  a: "Absolutely! We accept trade-ins and offer fair market value for your current vehicle."
                }
              ].map((faq, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{faq.q}</h3>
                    <p className="text-sm text-gray-600">{faq.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
