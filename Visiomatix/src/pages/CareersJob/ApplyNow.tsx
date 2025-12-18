import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ApplyForm from "./ApplyForm";

const ApplyNow: React.FC = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Apply Now
      </Button>

      {/* Modal Popup */}
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Apply Now</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ApplyForm />
          {/* <JobOpeningForm/> */}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ApplyNow;
