import React from "react";
import { FruitProvider } from "./contexts/FruitContext";
import { FruitList } from "./components/FruitList";
import { Jar } from "./components/Jar";
import { motion } from "framer-motion";
import HeroOverlay from "./components/HeroOverlay";

const App = () => {
  return (
    <FruitProvider>
      <HeroOverlay />
      <div className="bg-white p-4 h-screen">
        <div className="bg-darkBg border-r-4 rounded-lg text-primaryText min-h-screen flex flex-col items-center p-8">
          <motion.header
            className="mb-8 text-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-4">Fruit Selector</h1>
            <p className="text-secondaryText text-lg">
              Add your fruits below to see your total calories.
            </p>
          </motion.header>
          <motion.main
            className="flex flex-col-reverse lg:space-x-8 place-items-start lg:flex-row w-full max-w-5xl md:mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="lg:w-1/2 w-full">
              <FruitList />
            </div>
            <div className="lg:w-1/2 w-full ">
              <Jar />
            </div>
          </motion.main>
          <motion.footer
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          ></motion.footer>
        </div>
      </div>
    </FruitProvider>
  );
};

export default App;
