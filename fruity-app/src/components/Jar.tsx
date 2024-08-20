import React from "react";
import { useFruitContext, Fruit } from "../contexts/FruitContext";
import { motion } from "framer-motion";

export const Jar = () => {
  const { state, dispatch } = useFruitContext();

  const handleRemoveFruit = (fruit: Fruit) => {
    dispatch({ type: "REMOVE_FRUIT", payload: fruit });
  };

  return (
    <motion.div
      className="p-4 border border-gray-300 rounded w-full"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="font-bold text-lg mb-4">Your Jar</h2>
      <ul>
        {state.selectedFruits.map((fruit, index) => (
          <motion.li
            key={index}
            className="flex justify-between mb-2"
            whileHover={{ scale: 1.05 }}
          >
            {fruit.name} ({fruit.nutritions.calories} calories)
            <button
              onClick={() => handleRemoveFruit(fruit)}
              className="ml-4 bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded"
            >
              Remove
            </button>
          </motion.li>
        ))}
      </ul>
      <div className="mt-4 font-bold">
        Total Calories: {state.totalCalories}
      </div>
    </motion.div>
  );
};
