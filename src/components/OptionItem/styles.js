import { makeStyles } from "@material-ui/core";

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

export default useStyles;
