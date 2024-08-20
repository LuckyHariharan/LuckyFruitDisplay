import React, { useEffect, useState } from "react";
import { getFruits } from "../services/FruityviceAPI";
import { useFruitContext, Fruit } from "../contexts/FruitContext";
import { motion } from "framer-motion";

export const FruitList = () => {
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const [groupBy, setGroupBy] = useState<"None" | "Family" | "Order" | "Genus">(
    "None"
  );
  const { dispatch } = useFruitContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFruits();
        setFruits(data);
      } catch (error) {
        console.error("Error fetching fruits:", error);
      }
    };
    fetchData();
  }, []);

  const handleAddFruit = (fruit: Fruit) => {
    dispatch({ type: "ADD_FRUIT", payload: fruit });
  };

  const handleAddGroup = (groupFruits: Fruit[]) => {
    groupFruits.forEach((fruit) => handleAddFruit(fruit));
  };

  const handleGroupChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGroupBy(event.target.value as "None" | "Family" | "Order" | "Genus");
  };

  const groupedFruits =
    groupBy !== "None" ? groupByFruits(fruits, groupBy) : { None: fruits };

  return (
    <div className="flex flex-col w-full">
      <label htmlFor="group-by" className="mb-2 text-secondaryText">
        Group by:
      </label>
      <select
        id="group-by"
        value={groupBy}
        onChange={handleGroupChange}
        className="mb-4 bg-darkBg text-primaryText p-2 rounded border border-secondaryText"
      >
        <option value="None">None</option>
        <option value="Family">Family</option>
        <option value="Order">Order</option>
        <option value="Genus">Genus</option>
      </select>

      {Object.entries(groupedFruits).map(([group, fruits]) => (
        <motion.div
          key={group}
          className="mb-4 bg-gray-800 p-2 border rounded-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {groupBy !== "None" && (
            <div className="flex pb-4 justify-between items-center">
              <h3 className="font-bold text-lg">{group}</h3>
              <button
                onClick={() => handleAddGroup(fruits)}
                className="bg-primaryButton hover:bg-buttonHover text-white px-2 py-1 rounded"
              >
                Add All
              </button>
            </div>
          )}
          <ul>
            {fruits.map((fruit) => (
              <motion.li
                key={fruit.name}
                className="flex justify-between mb-2"
                whileHover={{ scale: 1.05 }}
              >
                {fruit.name} ({fruit.nutritions.calories} calories)
                <button
                  onClick={() => handleAddFruit(fruit)}
                  className="ml-4 bg-primaryButton hover:bg-buttonHover text-white px-2 py-1 rounded"
                >
                  Add
                </button>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
};

// code is hard to understand
const groupByFruits = (
  fruits: Fruit[],
  groupBy: "Family" | "Order" | "Genus"
) => {
  return fruits.reduce((groups: Record<string, Fruit[]>, fruit) => {
    const groupKey = fruit[groupBy.toLowerCase() as keyof Fruit] as string;
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(fruit);
    return groups;
  }, {});
};
