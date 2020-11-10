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

const FilterItem = ({ name, options }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selected, setSelected] = React.useState([]);
  const { popover, actionBtns, selectedFilter } = useStyles();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = option => {
    if (selected.includes(option.id)) {
      const updatedArr = selected.filter(item => item !== option.id);
      setSelected(updatedArr);
    } else {
      setSelected([...selected, option.id]);
    }
  };

  const handleReset = () => {
    handleClose();
    setSelected([]);
  };

  const handleSaveFilters = () => {
    handleClose();
  };

  const isOpen = Boolean(anchorEl);
  const id = isOpen ? "simple-popover" : undefined;

  console.log(selected, "selected");

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
  options: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default FilterItem;
