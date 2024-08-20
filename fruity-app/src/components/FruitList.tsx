import React, { useEffect, useState } from "react";
import { getFruits } from "../services/FruityviceAPI";
import { useFruitContext, Fruit } from "../contexts/FruitContext";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

export const FruitList = () => {
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const [groupBy, setGroupBy] = useState<"None" | "Family" | "Order" | "Genus">(
    "None"
  );
  const [collapsedGroups, setCollapsedGroups] = useState<
    Record<string, boolean>
  >({});
  const { dispatch } = useFruitContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFruits(); // Fetch the data
        setFruits(data); // Directly set the data
      } catch (error) {
        console.error("Error fetching fruits:", error);
        setFruits([]); // Set an empty array in case of an error
      }
    };

    fetchData();
  }, [dispatch]);

  const handleAddFruit = (fruit: Fruit) => {
    dispatch({ type: "ADD_FRUIT", payload: fruit });
  };

  const handleAddGroup = (groupFruits: Fruit[]) => {
    dispatch({ type: "ADD_ALL_FRUITS", payload: groupFruits });
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
          <div className="flex py-4 justify-between items-center">
            <div onClick={() => toggleGroupCollapse(group)}>
              <div className="flex items-center cursor-pointer">
                <h3 className="font-bold text-lg">{group}</h3>
                <FontAwesomeIcon
                  icon={collapsedGroups[group] ? faChevronDown : faChevronUp}
                  className="text-white ml-2"
                />
              </div>{" "}
            </div>
            <motion.li
              className="flex justify-between mb-2"
              whileHover={{ scale: 1.05 }}
            >
              <button
                onClick={() => handleAddGroup(fruits)}
                className="ml-4 bg-primaryButton hover:bg-buttonHover text-white px-2 py-1 rounded"
              >
                Add All
              </button>
            </motion.li>
          </div>
          {!collapsedGroups[group] && (
            <ul>
              {fruits.map((fruit) => (
                <motion.li
                  key={fruit.id}
                  className="flex justify-between mb-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <div>
                    {fruit.name} ({fruit.nutritions.calories} calories)
                  </div>
                  <button
                    onClick={() => handleAddFruit(fruit)}
                    className="ml-4 bg-primaryButton hover:bg-buttonHover text-white px-2 py-1 rounded"
                  >
                    Add
                  </button>
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
