import axios from "axios";

// Set the API URL based on the environment
const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://www.fruityvice.com/api/fruit/all"
    : "/api/fruit/all";

/**
 * Fetches the list of fruits from the Fruityvice API.
 * @returns {Promise<any>} Promise resolving to the fruits data.
 */
export const getFruits = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching fruits data");
  }
};
