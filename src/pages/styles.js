import { makeStyles } from "@material-ui/core";

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

export default useStyles;
