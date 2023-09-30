import React from "react"
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

export default function ModalDialog() {
  const [open, setOpen] = React.useState(false);

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <div>
      <button onClick={openDialog}>Open Dialog</button>
      <Dialog open={open} onClose={closeDialog}>
        <DialogTitle>Dialog Title</DialogTitle>
        <DialogContent>
          <p>Dialog content goes here.</p>
        </DialogContent>
        <DialogActions>
          <button onClick={closeDialog}>Cancel</button>
          <button onClick={closeDialog}>Confirm</button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
