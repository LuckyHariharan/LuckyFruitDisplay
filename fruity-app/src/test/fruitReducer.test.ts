import { fruitReducer, Fruit } from "../contexts/FruitContext";

// Create fake fruit data
const cucumber: Fruit = {
  name: "cucumber",
  id: "22",
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
  id: "21",
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

// Test adding a fruit and updating calories
test("add a fruit to our list and update the calories", () => {
  const initialState = { selectedFruits: [], totalCalories: 0 };
  const newState = fruitReducer(initialState, {
    type: "ADD_FRUIT",
    payload: cucumber,
  });
  expect(newState.selectedFruits.length).toBe(1);
  expect(newState.selectedFruits[0].fruit.name).toBe("cucumber");
  expect(newState.totalCalories).toBe(1);
});

// Test adding multiple fruits
test("add multiple fruits to our list and update the calories", () => {
  const initialState = { selectedFruits: [], totalCalories: 0 };
  let newState = fruitReducer(initialState, {
    type: "ADD_FRUIT",
    payload: cucumber,
  });
  newState = fruitReducer(newState, {
    type: "ADD_FRUIT",
    payload: banana,
  });
  expect(newState.selectedFruits.length).toBe(2);
  expect(newState.totalCalories).toBe(23);
});

// Test removing a fruit and updating calories
test("remove a fruit from our list and update the calories", () => {
  const initialState = {
    selectedFruits: [{ fruit: cucumber, quantity: 1 }],
    totalCalories: 1,
  };
  const newState = fruitReducer(initialState, {
    type: "REMOVE_FRUIT",
    payload: cucumber,
  });
  expect(newState.selectedFruits.length).toBe(0);
  expect(newState.totalCalories).toBe(0);
});

// Test increasing the quantity of a fruit
test("increase the quantity of a fruit and update the calories", () => {
  const initialState = {
    selectedFruits: [{ fruit: cucumber, quantity: 1 }],
    totalCalories: 1,
  };
  const newState = fruitReducer(initialState, {
    type: "INCREASE_QUANTITY",
    payload: cucumber,
  });
  expect(newState.selectedFruits[0].quantity).toBe(2);
  expect(newState.totalCalories).toBe(2);
});

// Test decreasing the quantity of a fruit
test("decrease the quantity of a fruit and update the calories", () => {
  const initialState = {
    selectedFruits: [{ fruit: cucumber, quantity: 2 }],
    totalCalories: 2,
  };
  const newState = fruitReducer(initialState, {
    type: "DECREASE_QUANTITY",
    payload: cucumber,
  });
  expect(newState.selectedFruits[0].quantity).toBe(1);
  expect(newState.totalCalories).toBe(1);
});

// Test removing all fruits
test("remove all fruits from our list and reset the calories", () => {
  const initialState = {
    selectedFruits: [
      { fruit: cucumber, quantity: 1 },
      { fruit: banana, quantity: 1 },
    ],
    totalCalories: 2,
  };
  const newState = fruitReducer(initialState, { type: "REMOVE_ALL_FRUITS" });
  expect(newState.selectedFruits.length).toBe(0);
  expect(newState.totalCalories).toBe(0);
});

// Test adding all fruits
test("add all fruits to our list and update the calories", () => {
  const initialState = { selectedFruits: [], totalCalories: 0 };
  const newState = fruitReducer(initialState, {
    type: "ADD_ALL_FRUITS",
    payload: [cucumber, banana],
  });
  expect(newState.selectedFruits.length).toBe(2);
  expect(newState.totalCalories).toBe(23);
});
