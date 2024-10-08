import {
  formatCurrency,
  formatDate,
  getTotal,
  isAlpha,
  isLastYear,
  LAST_YEAR,
} from "../../../utils";
import { employeesSelector, locationsSelector } from "../../../store/selectors";
import {
  FaDollarSign,
  FaMapMarkedAlt,
  FaFileInvoiceDollar,
} from "react-icons/fa";
import Badge from "react-bootstrap/Badge";
import classNames from "classnames";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";
import { useState } from "react";

const TransactionsModal = ({ employeeId, handleClose, showModal }) => {
  const employeesList = useSelector(employeesSelector);
  const locationsList = useSelector(locationsSelector);
  const [lastYearOnly, setLastYearOnly] = useState(false);
  const [alphaOnly, setAlphaOnly] = useState(false);

  const filterLastYearAlphaTransactions = ({ timeStamp = null, type = null }) =>
    (!lastYearOnly || isLastYear(timeStamp)) && (!alphaOnly || isAlpha(type));

  const sortByDate = (
    { timeStamp: timeStampA = null },
    { timeStamp: timeStampB = null }
  ) => {
    const dateA = timeStampA && new Date(timeStampA);
    const dateB = timeStampB && new Date(timeStampB);

    return dateA > dateB ? -1 : 1;
  };

  const {
    name = null,
    categoryCode = null,
    lastYearAlphaTotal = 0,
    lastYearTotal = 0,
    location: { id: locationId = null } = {},
    transactions = [],
  } = (employeeId && employeesList.find(({ id }) => id === employeeId)) || {};

  const renderTransactions = () =>
    [...transactions]
      .filter(filterLastYearAlphaTransactions)
      .sort(sortByDate)
      .map(
        ({
          amount = 0,
          timeStamp = null,
          transactionID = null,
          type = null,
        }) => (
          <tr key={`transaction-${transactionID}`}>
            <td>{transactionID}</td>
            <td className="text-center">{formatCurrency(amount)}</td>
            <td className="text-center">
              <span
                className={
                  isAlpha(type) ? "te_transaction_alpha" : "te_transaction_beta"
                }
              >
                {type}
              </span>
            </td>
            <td className="text-center">
              {(timeStamp && formatDate(new Date(timeStamp))) || "-"}
            </td>
          </tr>
        )
      );

  return (
    <Modal show={showModal} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title className="d-flex align-items-center">
          <FaFileInvoiceDollar />
          &nbsp;Transactions List
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex align-items-center justify-content-between">
          <h3
            className={classNames(
              "te_employee_name",
              categoryCode && `category-${categoryCode}`
            )}
          >
            {name}
          </h3>
          <Badge>{employeeId}</Badge>
        </div>
        <div className="my-3">
          <strong>
            <FaMapMarkedAlt />
            &nbsp;Location:
          </strong>
          <span className="ms-1">
            {locationsList?.find(({ id }) => id === locationId)?.name || "-"}
          </span>
        </div>
        <div className="mb-1">
          <strong>
            <FaDollarSign />
            &nbsp;Last Year:
          </strong>
          <span className="ms-1 text-success">
            <strong>{formatCurrency(lastYearTotal)}</strong>
          </span>
        </div>
        <div className="mb-1">
          <strong>
            <FaDollarSign />
            &nbsp;Last Year (Alpha):
          </strong>
          <span className="ms-1 text-success">
            <strong>{formatCurrency(lastYearAlphaTotal)}</strong>
          </span>
        </div>
        <div className="mt-2 d-flex flex-column align-items-end justify-content-stretch">
          <div className="col-4 g-0 flex-grow-0">
            <Form.Check
              type="switch"
              id="te_switch_last_year_only"
              label={`Last year (${LAST_YEAR}) only`}
              checked={lastYearOnly}
              onChange={(evt) => setLastYearOnly(evt?.currentTarget?.checked)}
            />
            <Form.Check
              type="switch"
              id="te_switch_alpha_only"
              label={`Alpha Type only`}
              checked={alphaOnly}
              onChange={(evt) => setAlphaOnly(evt?.currentTarget?.checked)}
            />
          </div>
        </div>
        <div className="mt-1">
          <Table bordered striped>
            <thead>
              <tr>
                <th className="text-center">
                  <small>ID</small>
                </th>
                <th className="text-center">
                  <small>Amount</small>
                </th>
                <th className="text-center">
                  <small>Type</small>
                </th>
                <th className="text-center">
                  <small>Date</small>
                </th>
              </tr>
            </thead>
            <tbody>
              {renderTransactions()}
              <tr>
                <td colSpan={4} className="text-end">
                  <strong>Total:</strong>{" "}
                  {formatCurrency(
                    getTotal(
                      [...transactions].filter(filterLastYearAlphaTransactions)
                    )
                  )}
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default TransactionsModal;
