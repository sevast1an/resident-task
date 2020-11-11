import React from "react";
import { Popover, Button, Grid } from "@material-ui/core";
import PropTypes from "prop-types";

import OptionItem from "../OptionItem/OptionItem";
import useStyles from "./styles";

const FilterItem = ({
  name,
  options,
  handleFilter,
  selectedOptions,
  values
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { popover, actionBtns, selectedFilter } = useStyles();

  const filterObj = selectedOptions[0];
  const isOpen = Boolean(anchorEl);
  const id = isOpen ? "simple-popover" : undefined;

  const [temporarySelected, setTemporarySelected] = React.useState(
    filterObj.values
  );

  React.useEffect(() => {
    setTemporarySelected(filterObj.values);
  }, [filterObj.values]);

  console.log({ name, state: temporarySelected, values });

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = option => {
    if (!!temporarySelected.find(item => item.id === option.id)) {
      const temporaryUpdatedArr = temporarySelected.filter(
        item => item.id !== option.id
      );
      setTemporarySelected(temporaryUpdatedArr);
    } else {
      setTemporarySelected([...temporarySelected, option]);
    }
  };

  const handleReset = () => {
    handleClose();
    setTemporarySelected([]);
    handleFilter({
      name,
      values: []
    });
  };

  const handleSaveFilters = () => {
    handleClose();
    handleFilter({
      name,
      values: temporarySelected
    });
    // setTemporarySelected([]);
  };

  // console.log(selected, "selected FilterITEM");
  console.log(selectedOptions, "selectedOptions FilterITEM", name);
  console.log(temporarySelected, "temporarySelected");

  return (
    <Grid item>
      <Button
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={handleClick}
        className={isOpen || !!filterObj.values.length ? selectedFilter : ""}
      >
        {`${name} ${
          filterObj.values.length ? `(${filterObj.values.length})` : ""
        }`}
      </Button>
      <Popover
        id={id}
        open={isOpen}
        anchorEl={anchorEl}
        // onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        className={popover}
      >
        <Grid container spacing={2}>
          {options.map(option => (
            <Grid item key={option.id}>
              <OptionItem
                key={option.id}
                option={option}
                handleSelect={handleSelect}
                isSelected={
                  !!temporarySelected.find(item => item.id === option.id)
                }
              />
            </Grid>
          ))}
        </Grid>
        <Grid container justify="space-between" className={actionBtns}>
          <Grid item>
            {!!temporarySelected.length && (
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleReset()}
              >
                Cancel
              </Button>
            )}
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleSaveFilters()}
            >
              Apply
            </Button>
          </Grid>
        </Grid>
      </Popover>
    </Grid>
  );
};

FilterItem.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleFilter: PropTypes.func.isRequired,
  values: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default FilterItem;
