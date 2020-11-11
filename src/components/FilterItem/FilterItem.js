import React from "react";
import { Popover, Button, Grid, makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import OptionItem from "../OptionItem/OptionItem";

const useStyles = makeStyles({
  popover: {
    "& .MuiPopover-paper": {
      maxWidth: "300px",
      padding: "10px"
    }
  },
  selectedFilter: {
    border: "1px solid white"
  },
  actionBtns: {
    marginTop: "20px"
  }
});

const FilterItem = ({
  name,
  options,
  handleFilter,
  selectedOptions,
  handleTestFilter
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selected, setSelected] = React.useState([]);
  const [temporarySelected, setTemporarySelected] = React.useState([]);
  const { popover, actionBtns, selectedFilter } = useStyles();

  const filterObj = !!selectedOptions.length
    ? selectedOptions[0]
    : { values: [] };
  console.log(filterObj, "filterObj");

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = option => {
    // const isOptionSelected = filterObj.values.find(
    //   item => item.id === option.id
    // );
    // // console.log("testObj", testObj);
    // if (!!isOptionSelected) {
    //   console.log("este deja");
    // } else {
    //   handleFilter({
    //     name,
    //     value: { id: option.id, title: option.title }
    //   });
    // }
    // if (selected.includes(option.id)) {
    //   const updatedArr = selected.filter(item => item !== option.id);
    //   setSelected(updatedArr);
    // } else {
    //   setSelected([...selected, option.id]);
    // }

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
    setSelected([]);
  };

  const handleSaveFilters = () => {
    handleClose();
    handleTestFilter({
      name,
      values: temporarySelected
    });
  };

  const isOpen = Boolean(anchorEl);
  const id = isOpen ? "simple-popover" : undefined;

  // console.log(selected, "selected FilterITEM");
  console.log(selectedOptions, "selectedOptions FilterITEM");
  console.log(temporarySelected, "temporarySelected");

  return (
    <Grid item>
      <Button
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={handleClick}
        className={isOpen || !!selected.length ? selectedFilter : ""}
      >
        {`${name} ${selected.length ? `(${selected.length})` : ""}`}
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
                isSelected={selected.includes(option.id)}
              />
            </Grid>
          ))}
        </Grid>
        {!!selected.length && (
          <Grid container justify="space-between" className={actionBtns}>
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleReset()}
              >
                Cancel
              </Button>
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
        )}
      </Popover>
    </Grid>
  );
};

FilterItem.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleFilter: PropTypes.func.isRequired,
  handleTestFilter: PropTypes.func.isRequired
};

export default FilterItem;
