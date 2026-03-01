import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const advantages = [
  {
    id: 1,
    title: "Certified Vehicles",
    description: "Every car undergoes a rigorous 150-point inspection before it reaches our showroom floor. We source only the finest vehicles from across Kenya and beyond.",
    stat: "150+ inspection points",
    highlight: "KRA Compliant"
  },
  {
    id: 2,
    title: "Hassle-Free Finance",
    description: "Flexible financing options tailored to your budget with competitive rates from leading Kenyan banks including KCB, Equity, and Cooperative Bank.",
    stat: "Same-day approval",
    highlight: "Rates from 13%"
  },
  {
    id: 3,
    title: "Nationwide Delivery",
    description: "We deliver your dream car to your doorstep, anywhere in Kenya. From Nairobi to Mombasa, Kisumu to Eldoret, fully insured and customs cleared.",
    stat: "Free delivery",
    highlight: "24-48 hours"
  }
];

const stats = [
  { value: "500+", label: "Vehicles Sold in Kenya" },
  { value: "150", label: "Inspection Points" },
  { value: "95%", label: "Kenyan Clients Happy" },
  { value: "24/7", label: "Local Customer Support" }
];

const ValueProps = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const autoPlayRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isAutoPlaying && isInView) {
      autoPlayRef.current = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % advantages.length);
      }, 5000);
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, isInView]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + advantages.length) % advantages.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % advantages.length);
  };

  const handleDotClick = (index: number) => {
    setIsAutoPlaying(false);
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeIn"
      }
    })
  };

  const currentAdvantage = advantages[currentIndex];

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-blue-900 font-semibold text-sm uppercase tracking-wider">
            Why Kenyans Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
            <span className="text-blue-900"></span>
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Serving Kenyan drivers with excellence and integrity since 2020
          </p>
        </motion.div>

        {/* Main Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Carousel Container */}
            <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="p-10 md:p-14"
                >
                  <div className="space-y-6">
                    {/* Title */}
                    <motion.h3 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-3xl md:text-4xl font-light text-gray-900"
                    >
                      {currentAdvantage.title}
                    </motion.h3>

                    {/* Description */}
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-gray-600 text-lg leading-relaxed"
                    >
                      {currentAdvantage.description}
                    </motion.p>

                    {/* Stats and Highlight */}
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex flex-wrap items-center gap-4 pt-4"
                    >
                      <span className="text-sm font-medium text-gray-500">
                        {currentAdvantage.stat}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-gray-300" />
                      <span className="text-sm font-semibold text-blue-900 bg-blue-50 px-4 py-1.5 rounded-full">
                        {currentAdvantage.highlight}
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-blue-900/20"
              aria-label="Previous advantage"
            >
              <span className="text-2xl font-light">←</span>
            </button>
            
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-blue-900/20"
              aria-label="Next advantage"
            >
              <span className="text-2xl font-light">→</span>
            </button>

            {/* Progress Dots */}
            <div className="flex justify-center gap-3 mt-8">
              {advantages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${
                    index === currentIndex 
                      ? 'w-10 bg-blue-900' 
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-light text-blue-900 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 uppercase tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Local Trust Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16 pt-8 border-t border-gray-100"
        >
          <p className="text-sm text-gray-400">
            Trusted by drivers across Nairobi, Mombasa, Kisumu, Nakuru, and Eldoret
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ValueProps;
