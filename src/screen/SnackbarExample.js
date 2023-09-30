import Snackbar from '@mui/material/Snackbar';
import React from "react"
export default function SnackbarExample() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button onClick={handleClick}>Show Snackbar</button>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <div>Snackbar message</div>
      </Snackbar>
    </div>
  );
}
