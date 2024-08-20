import React from "react";
import { FruitProvider } from "./contexts/FruitContext";
import { FruitList } from "./components/FruitList";
import { Jar } from "./components/Jar";
import { motion } from "framer-motion";

const App = () => {
  return (
    <FruitProvider>
      <div className="bg-darkBg text-primaryText min-h-screen flex flex-col items-center p-8">
        <motion.header
          className="mb-8 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-4">Finofo Fruit Selection</h1>
          <p className="text-secondaryText text-lg">
            Automate your fruit selection process with ease.
          </p>
        </motion.header>
        <motion.main
          className="flex w-full max-w-5xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="w-1/2 pr-4">
            <FruitList />
          </div>
          <div className="w-1/2 pl-4">
            <Jar />
          </div>
        </motion.main>
        <motion.footer
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <button className="bg-primaryButton hover:bg-buttonHover text-white font-bold py-2 px-4 rounded">
            Get Started
          </button>
        </motion.footer>
      </div>
    </FruitProvider>
  );
};

export default App;
