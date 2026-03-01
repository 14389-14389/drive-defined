import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const reviews = [
  {
    name: "James Mokoena",
    review: "Exceptional service from start to finish. The team helped me find the perfect BMW and the finance process was seamless. Couldn't be happier!",
    rating: 5,
    initials: "JM",
  },
  {
    name: "Sarah van der Merwe",
    review: "I was nervous about buying a pre-owned vehicle, but AutoDrive's certification process gave me total peace of mind. My Mercedes runs like new.",
    rating: 5,
    initials: "SM",
  },
  {
    name: "Thabo Nkosi",
    review: "The nationwide delivery option was a game-changer. Living in Durban, I purchased a car from their Johannesburg showroom and it arrived in perfect condition.",
    rating: 5,
    initials: "TN",
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i === 0 ? reviews.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === reviews.length - 1 ? 0 : i + 1));

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-accent font-heading font-semibold text-sm uppercase tracking-wider mb-2">Testimonials</p>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground">What Our Customers Say</h2>
        </div>

        <div className="max-w-2xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="bg-card rounded-xl p-8 sm:p-10 shadow-card text-center"
            >
              <Quote className="w-10 h-10 text-accent/30 mx-auto mb-4" />
              <p className="text-foreground text-base sm:text-lg leading-relaxed mb-6 italic">
                "{reviews[index].review}"
              </p>
              <div className="flex justify-center gap-1 mb-4">
                {Array.from({ length: reviews[index].rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center font-heading font-bold text-accent text-sm">
                  {reviews[index].initials}
                </div>
                <span className="font-heading font-semibold text-foreground">{reviews[index].name}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-3 mt-6">
            <button onClick={prev} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={next} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
