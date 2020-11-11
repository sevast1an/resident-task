import React from "react";
import "./App.css";
import { filtersData } from "./constants";
import FiltersPage from "./pages/FiltersPage";

const App = () => {
  //Reformatting the initial data to use it as initialData in our main component
  const initialGlobalState = Object.entries(filtersData).reduce(
    (acc, [name]) => ({
      ...acc,
      [name]: []
    }),
    {}
  );
  return <FiltersPage initialData={initialGlobalState} />;
};

export default App;
