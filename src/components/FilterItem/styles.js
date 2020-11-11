import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  popover: {
    "& .MuiPopover-paper": {
      maxWidth: "260px",
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

export default useStyles;
