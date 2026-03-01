import { motion } from "framer-motion";

const brands = [
  { name: "Toyota", letters: "TOYOTA" },
  { name: "Honda", letters: "HONDA" },
  { name: "Ford", letters: "FORD" },
  { name: "BMW", letters: "BMW" },
  { name: "Mercedes-Benz", letters: "MERCEDES" },
  { name: "Audi", letters: "AUDI" },
];

const BrandsStrip = () => (
  <section className="py-16 bg-secondary">
    <div className="container mx-auto px-4">
      <p className="text-center text-muted-foreground font-heading text-sm uppercase tracking-wider mb-8">
        Brands We Stock
      </p>
      <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14">
        {brands.map((brand, i) => (
          <motion.div
            key={brand.name}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-foreground/30 hover:text-accent font-heading font-extrabold text-xl sm:text-2xl tracking-widest transition-colors cursor-default select-none"
          >
            {brand.letters}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default BrandsStrip;
