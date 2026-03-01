import { motion } from "framer-motion";
import { ShieldCheck, Banknote, Truck } from "lucide-react";

const props = [
  {
    icon: ShieldCheck,
    title: "Certified Vehicles",
    desc: "Every car undergoes a rigorous 150-point inspection before it reaches our showroom floor.",
  },
  {
    icon: Banknote,
    title: "Hassle-Free Finance",
    desc: "Flexible financing options tailored to your budget with competitive rates from leading banks.",
  },
  {
    icon: Truck,
    title: "Nationwide Delivery",
    desc: "We deliver your dream car to your doorstep, anywhere in South Africa, fully insured.",
  },
];

const ValueProps = () => (
  <section className="py-20 bg-secondary">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <p className="text-accent font-heading font-semibold text-sm uppercase tracking-wider mb-2">Why Choose Us</p>
        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground">The AutoDrive Advantage</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {props.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="bg-card rounded-xl p-8 text-center shadow-card hover:shadow-card-hover transition-shadow duration-300"
          >
            <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-5">
              <item.icon className="w-7 h-7 text-accent" />
            </div>
            <h3 className="font-heading font-bold text-lg text-foreground mb-3">{item.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ValueProps;
