import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { LAST_YEAR } from "../../../utils";

const ConfirmationModal = ({
  confirmationContents = null,
  handleChangeTransactions = null,
  handleClose = null,
  handleConfirm = null,
  handleResetTransactions = null,
  showModal = false,
}) => {
  const handleCancel = () => {
    handleResetTransactions();
    handleClose()
  };

  const handleRemoveTransaction = (transaction) => {
    const newTransactionsList = (
      (Array.isArray(confirmationContents) && confirmationContents) ||
      []
    ).filter((id) => id !== transaction);
    typeof handleChangeTransactions === "function" &&
      handleChangeTransactions(newTransactionsList);
  };

  const renderTransactions = (transactionsList) =>
    ((Array.isArray(transactionsList) && transactionsList) || []).map(
      (transaction) => (
        <Badge key={`transaction-item-${transaction}`}>
          {transaction}
          <Button
            variant="tertiary"
            className="p-0 ms-2"
            onClick={() => handleRemoveTransaction(transaction)}
          >
            &times;
          </Button>
        </Badge>
      )
    );

  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      size={"md"}
      centered
      className="te_cmp_ConfirmationModal"
    >
      <Modal.Header closeButton>
        <Modal.Title className="d-flex align-items-center">
          Confirmation
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Top earner's last year ({LAST_YEAR}) alpha transactions:
        {confirmationContents && (
          <section className="te_transactions_list my-2">
            {renderTransactions(confirmationContents)}
          </section>
        )}
        Do you really want send this transactions list now?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleConfirm}>
          Confirm
        </Button>
        <Button variant="secondary" onClick={handleResetTransactions}>
          Reset Transactions
        </Button>
        <Button variant="danger" onClick={handleCancel}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
