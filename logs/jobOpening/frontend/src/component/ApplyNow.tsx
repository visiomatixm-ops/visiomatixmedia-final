import { useState } from "react";
import { Button, Modal, Box } from "@mui/material";
import ApplyForm from "./ApplyFomr";
import JobOpeningForm from "./JobOpeningForm";

const ApplyNow = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="m-5">
      <Button variant="contained" onClick={handleOpen}>
        Apply Now
      </Button>

      {/* Modal Popup */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="apply-form-modal"
        aria-describedby="form-popup"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 3,
            p: 4,
            width: { xs: "90%", sm: "80%", md: "70%" },
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          <div className="flex justify-between items-center mb-4">
            {/* <h2 className="text-2xl font-semibold">Apply Now</h2> */}
            <Button
              variant="outlined"
              color="error"
              onClick={handleClose}
              className="absolute top-0 right-0"
            >
              {/* Close */}
              X
            </Button>
          </div>
          <ApplyForm />
          {/* <JobOpeningForm/> */}
        </Box>
      </Modal>
    </div>
  );
};

export default ApplyNow;
