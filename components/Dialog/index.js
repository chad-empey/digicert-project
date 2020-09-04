import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";
import { useStateValue } from "../../components/useGlobalState";

const AlertDialog = ({ open, setOpen, id }) => {
  const [, dispatch] = useStateValue();

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    fetch(`/api/books/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        dispatch({ type: "DELETE-BOOK", value: { id } });
        setOpen(false);
      })
      .catch(() => {
        setOpen(false);
      });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Are you sure you want to delete this book?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This will permanently remove the book from the database.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          variant="contained"
          color="secondary"
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AlertDialog.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  id: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
};

export default AlertDialog;
