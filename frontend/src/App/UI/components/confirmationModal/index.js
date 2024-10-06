import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ConfirmationModal = ({ handleClose, handleConfirm, showModal }) => (
  <Modal show={showModal} onHide={handleClose} centered>
    <Modal.Header closeButton>
      <Modal.Title className="d-flex align-items-center">
        Confirmation
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>Do you really want send the transactions list now?</Modal.Body>
    <Modal.Footer>
      <Button variant="primary" onClick={handleConfirm}>
        Confirm
      </Button>
      <Button variant="danger" onClick={handleClose}>
        Cancel
      </Button>
    </Modal.Footer>
  </Modal>
);
export default ConfirmationModal;
