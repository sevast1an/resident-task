import React, { useState } from "react";
import PropTypes from "prop-types";
import { Grid, Box, Typography } from "@material-ui/core";

import useStyles from "./styles";
import { filtersData } from "../constants";
import FilterItem from "../components/FilterItem/FilterItem";

const FiltersPage = ({ initialData }) => {
  const [globalState, setGlobalState] = useState(initialData);
  const { selectedItem, filterHeading, filterRow } = useStyles();

  const filtersToShow = Object.entries(globalState)
    .map(([name, values]) => ({ name, values }))
    .filter(item => !!item.values.length);

  const setUpdate = (name, newState) =>
    setGlobalState({ ...globalState, [name]: newState });

  const deleteOption = (filterName, option) => {
    const udatedFilterOptions = globalState[filterName].filter(
      item => item.id !== option.id
    );
    setGlobalState({ ...globalState, [filterName]: udatedFilterOptions });
  };

  const clearAll = name => {
    setUpdate(name, []);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Grid container spacing={2}>
          {Object.entries(filtersData).map(([name, options], idx) => (
            <FilterItem
              key={idx}
              options={options}
              name={name}
              values={globalState[name]}
              handleFilter={setUpdate}
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
                          onClick={() => deleteOption(item.name, value)}
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

FiltersPage.propTypes = {
  initialData: PropTypes.shape().isRequired
};

export default FiltersPage;
