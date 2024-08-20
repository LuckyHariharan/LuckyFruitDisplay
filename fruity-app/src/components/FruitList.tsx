import React, { useEffect, useState } from "react";
import { getFruits } from "../services/FruityviceAPI";
import { useFruitContext, Fruit } from "../contexts/FruitContext";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";

export const FruitList = () => {
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const [groupBy, setGroupBy] = useState<"None" | "Family" | "Order" | "Genus">(
    "None"
  );
  const [collapsedGroups, setCollapsedGroups] = useState<
    Record<string, boolean>
  >({});
  const { state, dispatch } = useFruitContext();

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

  const handleRemoveFruit = (fruit: Fruit) => {
    dispatch({ type: "REMOVE_FRUIT", payload: fruit });
  };

  const handleAddGroup = (groupFruits: Fruit[]) => {
    groupFruits.forEach((fruit) => handleAddFruit(fruit));
  };

  const handleGroupChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGroupBy(event.target.value as "None" | "Family" | "Order" | "Genus");
  };

  const toggleGroupCollapse = (group: string) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }));
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
          className="mb-4 bg-gray-800 p-4 border rounded-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleGroupCollapse(group)}
          >
            <h3 className="font-bold text-lg">{group}</h3>
            <div className="flex p-4 items-center">
              <FontAwesomeIcon
                icon={collapsedGroups[group] ? faChevronDown : faChevronUp}
                className="text-white mr-4"
              />
              <button
                onClick={() => handleAddGroup(fruits)}
                className="bg-primaryButton hover:bg-buttonHover text-white px-4 py-1 rounded"
              >
                Add All
              </button>
            </div>
          </div>
          {!collapsedGroups[group] && (
            <ul>
              {fruits.map((fruit) => (
                <motion.li
                  key={fruit.name}
                  className="flex justify-between mb-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <div>
                    {fruit.name} ({fruit.nutritions.calories} calories)
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => handleRemoveFruit(fruit)}
                      className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded"
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span className="mx-2">
                      {state.selectedFruits.find(
                        (item) => item.fruit.name === fruit.name
                      )?.quantity || 0}
                    </span>
                    <button
                      onClick={() => handleAddFruit(fruit)}
                      className="bg-green-500 hover:bg-green-700 text-white px-2 py-1 rounded"
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                </motion.li>
              ))}
            </ul>
          )}
        </motion.div>
      ))}
    </div>
  );
};

// Helper function to group fruits
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
