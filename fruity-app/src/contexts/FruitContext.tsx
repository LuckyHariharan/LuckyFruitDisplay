import React, { createContext, useContext, useReducer, ReactNode } from "react";

export interface Fruit {
  name: string;
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
  selectedFruits: Fruit[];
  totalCalories: number;
}

interface Action {
  type: "ADD_FRUIT" | "REMOVE_FRUIT";
  payload: Fruit;
}

const initialState: State = {
  selectedFruits: [],
  totalCalories: 0,
};

const FruitContext = createContext<
  { state: State; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

const fruitReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_FRUIT":
      return {
        ...state,
        selectedFruits: [...state.selectedFruits, action.payload],
        totalCalories: state.totalCalories + action.payload.nutritions.calories,
      };
    case "REMOVE_FRUIT":
      const filteredFruits = state.selectedFruits.filter(
        (fruit) => fruit.name !== action.payload.name
      );
      return {
        ...state,
        selectedFruits: filteredFruits,
        totalCalories: state.totalCalories - action.payload.nutritions.calories,
      };
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
