import React, { useState } from "react";
import { Grid, Box } from "@material-ui/core";
import "./App.css";
import { filtersData } from "./constants";
import FilterItem from "./components/FilterItem/FilterItem";

const App = () => {
  console.log(filtersData, "filtersData");
  const [selected, setSelected] = useState([]);

  const test = filterObj => {
    console.log(filterObj, "filterObj");
    const selectedFilter = selected.find(({ name }) => name === filterObj.name);
    if (!!selectedFilter) {
      const otherSelectedFilters = selected.filter(
        item => item.name !== filterObj.name
      );
      setSelected([
        ...otherSelectedFilters,
        {
          name: selectedFilter.name,
          values: [...selectedFilter.values, filterObj.value]
        }
      ]);
    } else {
      setSelected([
        ...selected,
        { name: filterObj.name, values: [filterObj.value] }
      ]);
    }
  };
  console.log(selected, "ahue");
  return (
    <div className="App">
      <header className="App-header">
        <Grid container spacing={2}>
          {Object.entries(filtersData).map(([name, options], idx) => (
            <FilterItem
              name={name}
              options={options}
              key={idx}
              test={test}
              selectedOptions={selected.filter(option => option.name === name)}
            />
          ))}
        </Grid>
      </header>
      <main>
        <Box mt={4}>Applied Filters: -- none --</Box>
      </main>
    </div>
  );
};

export default App;
