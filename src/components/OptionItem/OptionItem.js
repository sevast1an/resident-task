import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@material-ui/core";

import useStyles from "./styles";

const OptionItem = ({ option, handleSelect, isSelected }) => {
  const { optionStyles, selected } = useStyles();
  return (
    <Box
      className={`${optionStyles} ${isSelected ? selected : ""}`}
      onClick={() => handleSelect(option)}
    >
      <Typography className="option-enzyme">{option.title}</Typography>
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
