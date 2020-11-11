import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  popover: {
    "& .MuiPopover-paper": {
      width: "260px",
      padding: "10px"
    }
  },
  filterStyles: {
    border: "1px solid #3f51b5"
  },
  selectedFilter: {
    border: "1px solid white"
  },
  actionBtns: {
    marginTop: "20px"
  }
});

export default useStyles;
