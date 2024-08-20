import React, { useState } from "react";
import { useFruitContext, Fruit } from "../contexts/FruitContext";
import { motion } from "framer-motion";

export const Jar = () => {
  const { state, dispatch } = useFruitContext();
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [isListCollapsed, setIsListCollapsed] = useState(false);

  const handleRemoveFruit = (fruit: Fruit) => {
    dispatch({ type: "REMOVE_FRUIT", payload: fruit });
  };

  const handleRemoveAll = () => {
    dispatch({ type: "REMOVE_ALL_FRUITS" });
  };

  const toggleBreakdown = () => {
    setShowBreakdown(!showBreakdown);
  };

  const toggleListCollapse = () => {
    setIsListCollapsed(!isListCollapsed);
  };

  const getNutritionTotals = () => {
    return state.selectedFruits.reduce(
      (totals, item) => {
        totals.calories += item.fruit.nutritions.calories * item.quantity;
        totals.fat += item.fruit.nutritions.fat * item.quantity;
        totals.sugar += item.fruit.nutritions.sugar * item.quantity;
        totals.carbohydrates +=
          item.fruit.nutritions.carbohydrates * item.quantity;
        totals.protein += item.fruit.nutritions.protein * item.quantity;
        return totals;
      },
      {
        calories: 0,
        fat: 0,
        sugar: 0,
        carbohydrates: 0,
        protein: 0,
      }
    );
  };

  const totals = getNutritionTotals();

  return (
    <motion.div
      className="md:p-4 p-2 mt-4 border border-gray-300 rounded w-full"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="font-bold text-lg mb-4">Your Jar</h2>

      <div className="flex mb-4 md:justify-between justify-start ">
        <button
          onClick={toggleBreakdown}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {showBreakdown ? "Hide Breakdown" : "Show Breakdown"}
        </button>
        <button
          onClick={handleRemoveAll}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Remove All
        </button>
        <button
          onClick={toggleListCollapse}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          {isListCollapsed ? "Expand List" : "Collapse List"}
        </button>
      </div>
      {!isListCollapsed && (
        <ul>
          {state.selectedFruits.map((item, index) => (
            <motion.li
              key={index}
              className="flex justify-between mb-2"
              whileHover={{ scale: 1.05 }}
            >
              {item.fruit.name} ({item.fruit.nutritions.calories} calories) x{" "}
              {item.quantity}
              <button
                onClick={() => handleRemoveFruit(item.fruit)}
                className="ml-4 bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded"
              >
                Remove
              </button>
            </motion.li>
          ))}
        </ul>
      )}

      <div className="mt-4 font-bold">Total Calories: {totals.calories}</div>

      {showBreakdown && (
        <motion.div
          className="mt-4 p-4 border border-gray-300 rounded bg-gray-700 text-white"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-bold mb-2">Nutrition Breakdown</h3>
          <p>Fat: {totals.fat.toFixed(2)}g</p>
          <p>Sugar: {totals.sugar.toFixed(2)}g</p>
          <p>Carbohydrates: {totals.carbohydrates.toFixed(2)}g</p>
          <p>Protein: {totals.protein.toFixed(2)}g</p>
        </motion.div>
      )}
    </motion.div>
  );
};
