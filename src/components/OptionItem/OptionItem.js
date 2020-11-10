import React from "react";
import PropTypes from "prop-types";
import { Box, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  optionStyles: {
    padding: "3px 5px",
    border: "1px solid black",
    borderRadius: "5px",
    transition: "all 0.3s ease",
    "&:hover": {
      border: "1px solid #f50057",
      backgroundColor: "rgba(245, 0, 87, 0.04)",
      cursor: "pointer"
    }
  },
  selected: {
    border: "1px solid #f50057"
  }
});

const OptionItem = ({ option, handleSelect, isSelected }) => {
  const { optionStyles, selected } = useStyles();
  return (
    <Box
      className={`${optionStyles} ${isSelected ? selected : ""}`}
      onClick={() => handleSelect(option)}
    >
      <Typography>{option.title}</Typography>
    </Box>
  );
};

OptionItem.propTypes = {
  option: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.string
  }).isRequired,
  handleSelect: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired
};

export default OptionItem;
