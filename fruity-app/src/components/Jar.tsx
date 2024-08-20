import React, { useState } from "react";
import { useFruitContext, Fruit } from "../contexts/FruitContext";
import { motion } from "framer-motion";

export const Jar = () => {
  const { state, dispatch } = useFruitContext();
  const [isNutritionExpanded, setIsNutritionExpanded] = useState(false);

  const toggleNutritionExpand = () => {
    setIsNutritionExpanded(!isNutritionExpanded);
  };

  const handleRemoveAll = () => {
    dispatch({ type: "REMOVE_ALL_FRUITS" });
  };

  const handleRemoveFruit = (fruit: Fruit) => {
    dispatch({ type: "REMOVE_FRUIT", payload: fruit });
  };

  const handleIncreaseQuantity = (fruit: Fruit) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: fruit });
  };

  const handleDecreaseQuantity = (fruit: Fruit) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: fruit });
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
      className="p-4 border border-gray-300 rounded w-full"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg">Your Jar</h2>
        <div className="flex space-x-2">
          <button
            onClick={toggleNutritionExpand}
            className="bg-primaryButton hover:bg-buttonHover text-white px-2 py-1 rounded"
          >
            {isNutritionExpanded ? "Hide Breakdown" : "Show Breakdown"}
          </button>
          <button
            onClick={handleRemoveAll}
            className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded"
          >
            Remove All
          </button>
        </div>
      </div>

      {isNutritionExpanded && (
        <div className="mb-4 p-4 bg-gray-700 text-white rounded">
          <h3 className="font-bold text-md">Nutritional Breakdown</h3>
          <ul className="mt-2">
            <li>Calories: {totals.calories}</li>
            <li>Fat: {totals.fat.toFixed(2)}g</li>
            <li>Sugar: {totals.sugar.toFixed(2)}g</li>
            <li>Carbohydrates: {totals.carbohydrates.toFixed(2)}g</li>
            <li>Protein: {totals.protein.toFixed(2)}g</li>
          </ul>
        </div>
      )}

      <ul className="bg-gray-800 p-4 rounded">
        {state.selectedFruits.map(({ fruit, quantity }, index) => (
          <motion.li
            key={index}
            className="flex justify-between mb-2 text-white"
            whileHover={{ scale: 1.05 }}
          >
            <div>
              {fruit.name} ({fruit.nutritions.calories} calories) x {quantity}
            </div>
            <div className="flex items-center">
              <button
                onClick={() => handleDecreaseQuantity(fruit)}
                className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded mr-2"
              >
                -
              </button>
              <button
                onClick={() => handleIncreaseQuantity(fruit)}
                className="bg-green-500 hover:bg-green-700 text-white px-2 py-1 rounded"
              >
                +
              </button>
              <button
                onClick={() => handleRemoveFruit(fruit)}
                className="ml-4 bg-primaryButton hover:bg-buttonHover text-white px-2 py-1 rounded"
              >
                Remove
              </button>
            </div>
          </motion.li>
        ))}
      </ul>

      <div className="mt-4 font-bold text-white">
        Total Calories: {totals.calories}
      </div>
    </motion.div>
  );
};
