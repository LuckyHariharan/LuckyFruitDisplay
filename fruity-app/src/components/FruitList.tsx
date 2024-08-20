import React, { useEffect, useState } from "react";
import { getFruits } from "../services/FruityviceAPI";
import { useFruitContext, Fruit } from "../contexts/FruitContext";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

export const FruitList = () => {
  const [fruits, setFruits] = useState<Fruit[]>([]); // State to store the list of fruits
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [groupBy, setGroupBy] = useState<"None" | "Family" | "Order" | "Genus">(
    "None"
  ); // State to track the current grouping criteria
  const [collapsedGroups, setCollapsedGroups] = useState<
    Record<string, boolean>
  >({}); // State to manage the collapse status of groups
  const { dispatch } = useFruitContext(); // Get the dispatch function from context

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFruits(); // Fetch fruits data from the API
        setFruits(data); // Store the fetched fruits in state
      } catch (error) {
        console.error("Error fetching fruits:", error);
        setFruits([]); // Handle errors by setting an empty list
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchData();
  }, [dispatch]); // Dependency array ensures fetch only runs once

  if (loading) {
    // Show a loading message while fetching data
    return <div>Loading...</div>;
  }

  if (!Array.isArray(fruits)) {
    // Safeguard to ensure fruits is an array before proceeding
    console.log("Type of fruits:", typeof fruits);
    console.log("Fruits value:", fruits);
    return <div>Error: Data is not an array</div>;
  }

  const handleAddFruit = (fruit: Fruit) => {
    // Function to add a single fruit to the jar
    dispatch({ type: "ADD_FRUIT", payload: fruit });
  };

  const handleAddGroup = (groupFruits: Fruit[]) => {
    // Function to add all fruits in a group to the jar
    dispatch({ type: "ADD_ALL_FRUITS", payload: groupFruits });
  };

  const handleGroupChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // Update the grouping criteria based on user selection
    setGroupBy(event.target.value as "None" | "Family" | "Order" | "Genus");
  };

  const toggleGroupCollapse = (group: string) => {
    // Toggle the collapse/expand state of a group
    setCollapsedGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }));
  };

  // Group fruits based on the selected criteria, or show all fruits if "None" is selected
  const groupedFruits =
    groupBy !== "None" ? groupByFruits(fruits, groupBy) : { None: fruits };

  return (
    <div className="flex flex-col w-full h-full">
      {loading ? (
        // Display loading state
        <div className="flex justify-center items-center h-full">
          <p className="text-white">Loading fruits...</p>
        </div>
      ) : (
        <>
          {/* Dropdown to select grouping criteria */}
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

          <div className="overflow-y-auto max-h-96">
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
                        icon={
                          collapsedGroups[group] ? faChevronDown : faChevronUp
                        }
                        className="text-white ml-2"
                      />
                    </div>
                  </div>
                  <motion.li
                    className="flex justify-between mb-2"
                    whileHover={{ scale: 1.02 }}
                  >
                    <button
                      onClick={() => handleAddGroup(fruits)}
                      className="ml-4 bg-primaryButton hover:bg-buttonHover text-white px-2 py-1 rounded"
                    >
                      Add All
                    </button>
                  </motion.li>
                </div>
                {!collapsedGroups[group] && fruits && (
                  <ul>
                    {fruits.map((fruit) => (
                      <motion.li
                        key={fruit.id}
                        className="flex justify-between mb-2"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div>
                          {fruit.name} ({fruit.nutritions.calories} calories)
                        </div>
                        {/* Button to add individual fruit */}
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
        </>
      )}
    </div>
  );
};

// Helper function to group fruits by Family, Order, or Genus
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
