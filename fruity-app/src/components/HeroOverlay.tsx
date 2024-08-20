import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const HeroOverlay = () => {
  const [isVisible, setIsVisible] = useState(true);

  const hideHero = () => setIsVisible(false);

  useEffect(() => {
    const handleInteraction = () => hideHero();
    // handle any user event to hide hero
    window.addEventListener("scroll", handleInteraction);
    window.addEventListener("mousemove", handleInteraction);
    window.addEventListener("keydown", handleInteraction);

    return () => {
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("mousemove", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 2 }}
      onAnimationComplete={hideHero}
    >
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white">
          Welcome to Fruit Selector
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mt-4">
          Scroll down to explore
        </p>
      </div>
    </motion.div>
  );
};

export default HeroOverlay;
