import { idSelector, winnerSelector } from "../../../store/selectors";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import classNames from "classnames";
import { FaCheck, FaPen, FaTimes } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { LAST_YEAR } from "../../../utils";
import Modal from "react-bootstrap/Modal";
import { sendTransactions } from "../../../store/reducer/transactions";

const ConfirmationModal = ({ handleClose = null, showModal = false }) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [transactionsList, setTransactionsList] = useState(null);
  const [transactionsId, setTransactionsId] = useState(null);
  const transactionsContextId = useSelector(idSelector);
  const winner = useSelector(winnerSelector);

  const {
    name = null,
    categoryCode = null,
    lastYearAlphaTransactions = [],
  } = winner || {};

  const handleResetData = () => {
    setEditMode(false);
    setTransactionsId(transactionsContextId);
    setTransactionsList(
      lastYearAlphaTransactions.map(({ transactionID }) => transactionID)
    );
  };

  const handleRemoveTransaction = (transaction) => {
    const newTransactionsList = (
      (Array.isArray(transactionsList) && transactionsList) ||
      []
    ).filter((id) => id !== transaction);
    setTransactionsList(newTransactionsList);
  };

  const handleCancel = () => {
    handleResetData();
    handleClose();
  };

  const handleSubmitResults = () => {
    const data = {
      id: transactionsId,
      result: transactionsList,
    };
    dispatch(sendTransactions(data));
    handleCancel();
  };

  const renderTransactions = () =>
    ((Array.isArray(transactionsList) && transactionsList) || []).map(
      (transaction) => (
        <Badge
          key={`transaction-item-${transaction}`}
          className="d-flex align-items-center"
        >
          {transaction}
          <Button
            variant="tertiary"
            className="p-0 m-0 ms-2"
            onClick={() => handleRemoveTransaction(transaction)}
          >
            &times;
          </Button>
        </Badge>
      )
    );

  const renderTransactionId = () =>
    editMode ? (
      <InputGroup>
        <Form.Control
          placeholder="Transaction ID"
          aria-label="Transaction ID"
          value={transactionsId}
          onChange={(evt) => setTransactionsId(evt.currentTarget.value)}
          id="transactionId"
          name="transactionId"
        />
        <Button
          variant="outline-secondary"
          id="button-confirm"
          onClick={() => setEditMode(false)}
        >
          <FaCheck className="text-success" />
        </Button>
        <Button
          variant="outline-secondary"
          id="button-cancel"
          onClick={() => {
            setTransactionsId(transactionsContextId);
            setEditMode(false);
          }}
        >
          <FaTimes className="text-danger" />
        </Button>
      </InputGroup>
    ) : (
      <div className="d-inline-flex align-items-center">
        <strong>{transactionsId}</strong>&nbsp;
        <small>
          <Button
            variant="tertiary"
            className="p-0 m-0"
            onClick={() => setEditMode(!editMode)}
          >
            <FaPen size={12} />
          </Button>
        </small>
      </div>
    );

  useEffect(
    () =>
      setTransactionsList(
        lastYearAlphaTransactions.map(({ transactionID }) => transactionID)
      ),
    [winner]
  );

  useEffect(
    () => setTransactionsId(transactionsContextId),
    [transactionsContextId]
  );

  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      size={"lg"}
      centered
      className="te_cmp_ConfirmationModal"
    >
      <Modal.Header closeButton>
        <Modal.Title className="d-flex align-items-center me-auto">
          Confirmation
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-1">
          Employee:&nbsp;
          <strong>
            <span
              className={classNames(
                "te_employee_name",
                categoryCode && `category-${categoryCode}`
              )}
            >
              {name}
            </span>
          </strong>
        </div>
        <div className="mb-1 d-flex flex-row flex-nowrap align-items-center">
          <span>ID:&nbsp;</span>
          {renderTransactionId()}
        </div>
        <div className="mb-1">
          Last year's ({LAST_YEAR}) top earner's Alpha Transactions:
        </div>
        <section className="te_transactions_list mb-1">
          {renderTransactions()}
        </section>
        <div className="mb-1">
          Do you really want send this transactions list now?
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          disabled={editMode}
          onClick={handleSubmitResults}
        >
          Confirm
        </Button>
        <Button variant="secondary" onClick={handleResetData}>
          Reset Data
        </Button>
        <Button variant="danger" onClick={handleCancel}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
