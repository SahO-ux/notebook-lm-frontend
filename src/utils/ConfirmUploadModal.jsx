import { Modal, Button } from "react-bootstrap";

export default function ConfirmUploadModal({ show, onClose, onConfirm }) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Upload New PDF?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        This will end your current chat session. Are you sure you want to upload
        a new PDF?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          ✖ Close
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          📂 Upload New PDF
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
