import React, { useState } from "react";
import { Grid, Box, Typography, makeStyles } from "@material-ui/core";
import "./App.css";
import { filtersData } from "./constants";
import FilterItem from "./components/FilterItem/FilterItem";

const useStyles = makeStyles({
  selectedItem: {
    padding: "5px 10px",
    margin: "0px 10px 10px",
    border: "1px solid black",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    "&:hover": {
      borderColor: "red",
      color: "red"
    },
    "& span": {
      paddingLeft: "15px"
    }
  },
  filterHeading: {
    minWidth: "150px",
    marginBottom: "10px"
  },
  filterRow: {
    marginBottom: "20px"
  }
});

const App = () => {
  /*
    const [globalState, setGlobalState] = React.useState(globalState);
  const globalState = Object.entries(filtersData).reduce(
    (acc, [name]) => ({
      ...acc,
      [name]: []
    }),
    {}
  );

  const setUpdate = (name, newState:[]) => setGlobalState({...globalState, [name]: newState})

  <FilterItem
  ...
  setUpdate={setUpdate}
  values={globalState[name]}
  />
  */
  const filtersInitialState = Object.entries(filtersData).map(([name]) => ({
    name,
    values: []
  }));
  const [selected, setSelected] = useState(filtersInitialState);
  const { selectedItem, filterHeading, filterRow } = useStyles();

  const handleFilter = filterObj => {
    console.log(filterObj, "filterObj");
    const selectedFilter = selected.find(({ name }) => name === filterObj.name);
    const otherSelectedFilters = selected.filter(
      item => item.name !== filterObj.name
    );
    console.log(selectedFilter, "selectedFilter", filterObj, "filterObj");
    setSelected([
      ...otherSelectedFilters,
      {
        name: filterObj.name,
        values: [...filterObj.values]
      }
    ]);
  };

  const deleteOption = (filterItem, option) => {
    const udatedFilterOptions = filterItem.values.filter(
      item => item.id !== option.id
    );
    handleFilter({
      name: filterItem.name,
      values: udatedFilterOptions
    });
  };

  const clearAll = name => {
    handleFilter({
      name,
      values: []
    });
  };

  const filtersToShow = selected.filter(item => !!item.values.length);

  return (
    <div className="App">
      <header className="App-header">
        <Grid container spacing={2}>
          {Object.entries(filtersData).map(([name, options], idx) => (
            <FilterItem
              name={name}
              options={options}
              key={idx}
              selectedOptions={selected.filter(option => option.name === name)}
              values={
                selected.filter(option => option.name === name)[0].values || []
              }
              handleFilter={handleFilter}
            />
          ))}
        </Grid>
      </header>
      <main className="App-main">
        <Grid container spacing={2}>
          <Grid container item>
            <Grid item xs={12}>
              <Box mb={3} display="flex" alignItems="flex-start">
                <Typography variant="h5">Applied Filters:</Typography>
              </Box>
            </Grid>
            {!!filtersToShow.length ? (
              <>
                {filtersToShow.map(item => (
                  <Grid
                    container
                    item
                    xs={12}
                    key={item.name}
                    className={filterRow}
                  >
                    <Box className={filterHeading}>
                      <Typography
                        color="primary"
                        align="left"
                      >{`${item.name.toUpperCase()}: `}</Typography>
                    </Box>
                    <Box display="flex" flexWrap="wrap">
                      {item.values.map(value => (
                        <Box
                          key={value.id}
                          className={selectedItem}
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          onClick={() => deleteOption(item, value)}
                        >
                          <Typography>{value.title}</Typography>
                          <span>X</span>
                        </Box>
                      ))}
                      <Box
                        key="delete"
                        className={selectedItem}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        onClick={() => clearAll(item.name)}
                      >
                        <Typography>Clear All</Typography>
                        <span>X</span>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </>
            ) : (
              <Box mt={4} display="flex" alignItems="flex-start">
                -- none --
              </Box>
            )}
          </Grid>
        </Grid>
      </main>
    </div>
  );
};

export default App;
