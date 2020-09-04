import React, { useReducer, useContext } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "INIT-BOOKS": {
      return { ...state, books: action.value };
    }

    case "UPDATE-BOOK": {
      const index = state.books.findIndex(
        (book) => String(book.id) === String(action.value.id)
      );

      state.books[index] = action.value;

      return { ...state, books: state.books };
    }

    case "DELETE-BOOK": {
      const index = state.books.findIndex(
        (book) => String(book.id) === String(action.value.id)
      );

      state.books.splice(index, 1);

      return { ...state, books: state.books };
    }

    default:
      return state;
  }
}

export const StateContext = React.createContext();

export const GlobalState = ({ children }) => {
  return (
    <StateContext.Provider value={useReducer(reducer, { books: [] })}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext) || [];
