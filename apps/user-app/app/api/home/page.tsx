"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaLock, FaBolt, FaDollarSign } from "react-icons/fa";
import { motion } from "framer-motion"; // For advanced animations

// Feature Card Component with enhanced hover effects and transitions
const FeatureCard = ({ title, description, icon }) => (
  <motion.div
    className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-110"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="text-5xl text-green-400 text-center mb-4 animate-pulse">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-center mb-2 text-white">{title}</h3>
    <p className="text-sm text-gray-300 text-center leading-relaxed">
      {description}
    </p>
  </motion.div>
);

// FAQ Item Component with smooth transitions and icons
const FAQItem = ({ question, answer, isOpen, onToggle }) => (
  <motion.div
    className="bg-gray-800 p-4 rounded-md mb-4 cursor-pointer transition-all transform hover:scale-[1.02] hover:bg-gray-700"
    onClick={onToggle}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="flex justify-between items-center">
      <h3 className="font-bold text-lg text-white">{question}</h3>
      <span
        className={`transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
      >
        ▼
      </span>
    </div>
    {isOpen && <p className="text-sm text-gray-300 mt-2">{answer}</p>}
  </motion.div>
);

const HomePage = () => {
  const router = useRouter();
  const [faqOpenIndex, setFaqOpenIndex] = useState(null);

  const handleNavigation = (path) => () => router.push(path);
  const toggleFAQ = (index) => {
    setFaqOpenIndex(faqOpenIndex === index ? null : index);
  };

  const features = [
    {
      title: "Unmatched Security",
      description:
        "Your transactions are safeguarded with bank-level encryption.",
      icon: <FaLock />,
    },
    {
      title: "Blazing-Fast Transfers",
      description:
        "Send funds globally in the blink of an eye with real-time tracking.",
      icon: <FaBolt />,
    },
    {
      title: "Ultra-Low Fees",
      description:
        "Save more on every transaction with our transparent pricing.",
      icon: <FaDollarSign />,
    },
  ];

  const faqs = [
    {
      question: "How secure are my transactions?",
      answer:
        "We use industry-leading encryption and multi-layered security protocols.",
    },
    {
      question: "How long does it take to transfer funds?",
      answer: "Transfers are near-instant, with real-time tracking available.",
    },
  ];

  const testimonials = [
    {
      quote:
        "EZ Pay made sending money abroad so simple! The process was seamless.",
      name: "Chris P.",
      rating: 5,
    },
    {
      quote:
        "The ultra-low fees save me a fortune every month. I couldn’t be happier!",
      name: "Jordan T.",
      rating: 5,
    },
    {
      quote:
        "Reliable, fast, and secure. EZ Pay is hands-down the best payment solution.",
      name: "Taylor W.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 via-black to-gray-800 text-white font-sans relative">
      {/* Hero Section with smooth scrolling and interactive elements */}
      <section
        id="hero"
        className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black text-center px-4 animate__animated animate__fadeIn"
      >
        <motion.h1
          className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-teal-500 animate-gradient-text shadow-lg transition-transform duration-300 hover:scale-105"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          EZ <span className="text-white">Pay</span>
        </motion.h1>
        <h2 className="text-3xl font-semibold text-gray-100 mt-6">
          Payments Made Effortless
        </h2>
        <p className="text-lg text-gray-300 mt-4">
          Fast. Secure. Affordable. Take control of your finances today.
        </p>
        <div className="flex gap-6 mt-8">
          <motion.button
            onClick={handleNavigation("/api/auth/signup")}
            className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          >
            Get Started
          </motion.button>
          <motion.button
            onClick={handleNavigation("/api/auth/signin")}
            className="px-8 py-3 bg-gray-700 text-gray-100 font-semibold rounded-lg shadow-lg hover:bg-gray-600 hover:scale-105 transform transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          >
            Login
          </motion.button>
        </div>
      </section>

      {/* Features Section with grid layout */}
      <section className="mt-12 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </section>

      {/* Testimonials Section with carousel */}
      <section className="mt-20 max-w-5xl mx-auto text-center px-4">
        <h2 className="text-3xl font-bold mb-8 text-green-400">
          Our Happy Users
        </h2>
        <div className="overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
                whileHover={{ scale: 1.05 }}
              >
                <p className="italic text-gray-300">{`"${testimonial.quote}"`}</p>
                <footer className="mt-4">
                  <p className="font-bold text-green-400">{testimonial.name}</p>
                  <div className="flex justify-center mt-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">
                        ★
                      </span>
                    ))}
                    {[...Array(5 - testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-gray-500 text-lg">
                        ★
                      </span>
                    ))}
                  </div>
                </footer>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section with smooth toggle and transitions */}
      <section className="mt-20 max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">FAQs</h2>
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={faqOpenIndex === index}
            onToggle={() => toggleFAQ(index)}
          />
        ))}
      </section>

      {/* Call-to-Action Banner */}
      <div className="mt-20 bg-gradient-to-r from-green-600 to-blue-500 text-center py-10 px-6 rounded-lg shadow-lg mx-4 sm:mx-12">
        <h2 className="text-3xl font-bold text-white">
          Ready to Transform the Way You Handle Payments?
        </h2>
        <p className="text-lg text-gray-200 mt-4">
          Join thousands of users worldwide who trust EZ Pay for their
          transactions.
        </p>
        <motion.button
          onClick={handleNavigation("/api/auth/signup")}
          className="mt-6 px-8 py-3 bg-white text-gray-800 font-semibold rounded-lg shadow-lg hover:bg-gray-200 transform transition-all duration-300"
        >
          Get Started Today
        </motion.button>
      </div>
      {/* Footer */}
      <footer className="mt-16 text-center text-gray-500 text-sm py-4">
        <p>&copy; {new Date().getFullYear()} EZ Pay. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
