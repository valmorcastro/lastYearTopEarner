import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import classNames from "classnames";
import Col from "react-bootstrap/Col";
import ConfirmationModal from "../confirmationModal";
import Container from "react-bootstrap/Container";
import { employeesSelector, idSelector } from "../../../store/selectors";
import { FaTrophy } from "react-icons/fa";
import { formatCurrency, LAST_YEAR } from "../../../utils";
import Row from "react-bootstrap/Row";
import TransactionsModal from "../transactionsModal";
import { sendTransactions } from "../../../store/reducer/transactions";

const WinnerInfo = () => {
  const dispatch = useDispatch();
  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [transactionsModalVisible, setTransactionsModalVisible] =
    useState(false);
  const [transactionsList, setTransactionsList] = useState(null);

  const transactionsContextId = useSelector(idSelector);

  const { winner = null } = useSelector(employeesSelector) || {};

  const {
    id = null,
    name = null,
    categoryCode = null,
    lastYearTotal = 0,
    lastYearAlphaTransactions = [],
  } = winner || {};

  const handleResetTransactionsList = useCallback(
    () => setTransactionsList(lastYearAlphaTransactions),
    [lastYearAlphaTransactions, setTransactionsList]
  );

  const handleSubmitResults = useCallback(() => {
    const data = {
      id: transactionsContextId,
      result: transactionsList,
    };
    dispatch(sendTransactions(data));
    handleResetTransactionsList();
    setConfirmationModalVisible(false);
  }, [
    dispatch,
    handleResetTransactionsList,
    setConfirmationModalVisible,
    transactionsContextId,
    transactionsList,
  ]);

  useEffect(() => {
    setTransactionsList(lastYearAlphaTransactions);
  }, [lastYearAlphaTransactions]);

  return (
    <Container className="te_cmp_WinnerInfo h-100 d-flex flex-column justify-content-stretch te_hide_overflow">
      <Row className="mt-3 flex-grow-0">
        <Col className="d-flex align-items-center justify-content-between">
          <h3 className="d-flex align-items-center">
            <FaTrophy />
            &nbsp;Top Earner
          </h3>
        </Col>
      </Row>
      <Row className="mt-3 flex-grow-1">
        <Col className="h-100">
          <Card className="bg-success bg-opacity-75 text-white">
            <Card.Body>
              <Card.Title className="text-center mb-3 display-6">
                <span
                  className={classNames(
                    "text-center mb-3 display-6 te_employee_name",
                    categoryCode && `category-${categoryCode}`
                  )}
                >
                  {name}
                </span>
              </Card.Title>
              <Card.Text>
                <strong>{name}</strong> earned a total of{" "}
                <strong>{formatCurrency(lastYearTotal)}</strong> in transactions
                in <strong>{LAST_YEAR}</strong>, being the last year's top
                earner.
                <br />
                <br />
                <strong className="mb-1">Last Year Alpha Transactions: </strong>
                <br />
                <small>{transactionsList?.join?.(", ")}</small>
              </Card.Text>
              <Card.Footer className="d-grid gap-2">
                <Button
                  variant="primary"
                  onClick={() => setConfirmationModalVisible(true)}
                >
                  Submit Results
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setTransactionsModalVisible(true)}
                >
                  Show Transactions
                </Button>
              </Card.Footer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ConfirmationModal
        confirmationContents={transactionsList}
        confirmationContextId={transactionsContextId}
        handleChangeTransactions={setTransactionsList}
        handleClose={() => setConfirmationModalVisible(false)}
        handleConfirm={handleSubmitResults}
        handleResetTransactions={handleResetTransactionsList}
        showModal={confirmationModalVisible}
      />
      <TransactionsModal
        employeeId={id}
        handleClose={() => setTransactionsModalVisible(false)}
        showModal={transactionsModalVisible}
      />
    </Container>
  );
};

export default WinnerInfo;
