import React, { useState } from "react";
import { Grid, Box } from "@material-ui/core";
import "./App.css";
import { filtersData } from "./constants";
import FilterItem from "./components/FilterItem/FilterItem";

const App = () => {
  console.log(filtersData, "filtersData");
  return (
    <div className="App">
      <header className="App-header">
        <Grid container spacing={2}>
          {Object.entries(filtersData).map(([name, options], idx) => (
            <FilterItem name={name} options={options} key={idx} />
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
