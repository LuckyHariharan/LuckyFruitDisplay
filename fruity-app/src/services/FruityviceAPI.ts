import axios from "axios";

// Base URL for the Fruityvice API
const API_URL = "/api/fruit/all";

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
