import React, { createContext, useContext, useReducer, ReactNode } from "react";

export interface Fruit {
  name: string;
  id: string;
  family: string;
  order: string;
  genus: string;
  nutritions: {
    calories: number;
    fat: number;
    sugar: number;
    carbohydrates: number;
    protein: number;
  };
}

interface State {
  selectedFruits: { fruit: Fruit; quantity: number }[];
  totalCalories: number;
}

interface Action {
  type:
    | "ADD_FRUIT"
    | "REMOVE_FRUIT"
    | "REMOVE_ALL_FRUITS"
    | "INCREASE_QUANTITY"
    | "DECREASE_QUANTITY"
    | "ADD_ALL_FRUITS";
  payload?: Fruit | Fruit[];
}

const initialState: State = {
  selectedFruits: [],
  totalCalories: 0,
};

const FruitContext = createContext<
  { state: State; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

export const fruitReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_FRUIT": {
      const fruit = action.payload as Fruit;
      const existingFruit = state.selectedFruits.find(
        (item) => item.fruit.name === fruit.name
      );
      if (existingFruit) {
        return {
          ...state,
          selectedFruits: state.selectedFruits.map((item) =>
            item.fruit.name === fruit.name
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          totalCalories: state.totalCalories + fruit.nutritions.calories,
        };
      } else {
        return {
          ...state,
          selectedFruits: [...state.selectedFruits, { fruit, quantity: 1 }],
          totalCalories: state.totalCalories + fruit.nutritions.calories,
        };
      }
    }
    case "REMOVE_FRUIT": {
      const fruit = action.payload as Fruit;
      const existingFruit = state.selectedFruits.find(
        (item) => item.fruit.name === fruit.name
      );
      if (existingFruit && existingFruit.quantity > 1) {
        return {
          ...state,
          selectedFruits: state.selectedFruits.map((item) =>
            item.fruit.name === fruit.name
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
          totalCalories: state.totalCalories - fruit.nutritions.calories,
        };
      } else {
        return {
          ...state,
          selectedFruits: state.selectedFruits.filter(
            (item) => item.fruit.name !== fruit.name
          ),
          totalCalories: state.totalCalories - fruit.nutritions.calories,
        };
      }
    }
    case "REMOVE_ALL_FRUITS": {
      return {
        ...state,
        selectedFruits: [],
        totalCalories: 0,
      };
    }
    case "INCREASE_QUANTITY": {
      const fruit = action.payload as Fruit;
      return {
        ...state,
        selectedFruits: state.selectedFruits.map((item) =>
          item.fruit.name === fruit.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
        totalCalories: state.totalCalories + fruit.nutritions.calories,
      };
    }
    case "DECREASE_QUANTITY": {
      const fruit = action.payload as Fruit;
      const existingFruit = state.selectedFruits.find(
        (item) => item.fruit.name === fruit.name
      );
      if (existingFruit && existingFruit.quantity > 1) {
        return {
          ...state,
          selectedFruits: state.selectedFruits.map((item) =>
            item.fruit.name === fruit.name
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
          totalCalories: state.totalCalories - fruit.nutritions.calories,
        };
      } else {
        return {
          ...state,
          selectedFruits: state.selectedFruits.filter(
            (item) => item.fruit.name !== fruit.name
          ),
          totalCalories: state.totalCalories - fruit.nutritions.calories,
        };
      }
    }
    case "ADD_ALL_FRUITS": {
      const fruits = action.payload as Fruit[];
      let updatedSelectedFruits = [...state.selectedFruits];
      let additionalCalories = 0;

      fruits.forEach((fruit) => {
        const existingFruit = updatedSelectedFruits.find(
          (item) => item.fruit.name === fruit.name
        );
        if (existingFruit) {
          updatedSelectedFruits = updatedSelectedFruits.map((item) =>
            item.fruit.name === fruit.name
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          updatedSelectedFruits.push({ fruit, quantity: 1 });
        }
        additionalCalories += fruit.nutritions.calories;
      });

      return {
        ...state,
        selectedFruits: updatedSelectedFruits,
        totalCalories: state.totalCalories + additionalCalories,
      };
    }
    default:
      return state;
  }
};

export const FruitProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(fruitReducer, initialState);

  return (
    <FruitContext.Provider value={{ state, dispatch }}>
      {children}
    </FruitContext.Provider>
  );
};

export const useFruitContext = () => {
  const context = useContext(FruitContext);
  if (!context) {
    throw new Error("useFruitContext must be used within a FruitProvider");
  }
  return context;
};
