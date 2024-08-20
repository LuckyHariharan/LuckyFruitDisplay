import { Fruit } from "../contexts/FruitContext";
import { fruitReducer } from "../contexts/FruitContext";

// create fake fruit data
const cucumber: Fruit = {
  name: "cucumber",
  family: "cucumberfamily",
  order: "cucumberorder",
  genus: "cucumbergenus",
  nutritions: {
    calories: 1,
    fat: 2,
    sugar: 3,
    carbohydrates: 4,
    protein: 5,
  },
};

const banana: Fruit = {
  name: "banana",
  family: "bananafamily",
  order: "bananaorder",
  genus: "bananagenus",
  nutritions: {
    calories: 22,
    fat: 33,
    sugar: 12,
    carbohydrates: 32,
    protein: 12,
  },
};
const seaBanana: Fruit = {
  name: "banana",
  family: "bananafamily",
  order: "bananaorder",
  genus: "bananagenus",
  nutritions: {
    calories: 22,
    fat: 33,
    sugar: 12,
    carbohydrates: 32,
    protein: 12,
  },
};

// create tests for all edgecases to ensure the reducer works
// test each groupby (all taxonomy)
// create a test to add a fruit and to update the total calories

test("add a fruit to our list and upate the calories", () => {
  const initialState = { selectedFruits: [], totalCalories: 0 };
  const newState = fruitReducer(initialState, {
    type: "ADD_FRUIT",
    payload: cucumber,
  });
  expect(newState.selectedFruits).toContain(cucumber);
  expect(newState.totalCalories).toBe(1);
});

test("test that the reducer adds all fruits to the selecatedFruits state", () => {
  const initialState = { selectedFruits: [], totalCalories: 0 };
  const newState = fruitReducer(initialState, {
    type: "ADD_FRUIT",
    payload: cucumber,
  });
  const bothState = fruitReducer(newState, {
    type: "ADD_FRUIT",
    payload: banana,
  });
  expect(bothState.selectedFruits).toContain(cucumber);
  expect(bothState.selectedFruits).toContain(banana);
  expect(bothState.totalCalories).toBe(23);
});
