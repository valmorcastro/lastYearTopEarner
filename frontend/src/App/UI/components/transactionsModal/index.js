import {
  ALPHA_TYPE,
  formatCurrency,
  formatDate,
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
  const { list: employeesList = {} } = useSelector(employeesSelector);
  const { list: locationsList = {} } = useSelector(locationsSelector);
  const [lastYearOnly, setLastYearOnly] = useState(false);

  const filterLastYearTransactions = ({ timeStamp = null }) =>
    !lastYearOnly || new Date(timeStamp)?.getFullYear() === LAST_YEAR;

  const sortByDateAndType = (
    { timeStamp: timeStampA = null, type: typeA },
    { timeStamp: timeStampB = null, type: typeB }
  ) => {
    const dateA = timeStampA && new Date(timeStampA);
    const dateB = timeStampB && new Date(timeStampB);

    if (typeA !== typeB) {
      const isBAlpha = typeB === ALPHA_TYPE ? 1 : 0;

      return typeA === ALPHA_TYPE ? -1 : isBAlpha;
    }

    if (dateA && !isNaN(dateA) && dateB && !isNaN(dateB)) {
      return dateA > dateB ? -1 : 1;
    }

    return 0;
  };

  const {
    name = null,
    categoryCode = null,
    lastYearAlpha = 0,
    lastYearTotal = 0,
    location: { id: locationId = null } = {},
    transactions = [],
  } = (employeeId && employeesList?.[employeeId]) || {};

  const renderTransactions = () =>
    [...transactions]
      .filter(filterLastYearTransactions)
      .sort(sortByDateAndType)
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
                  type === ALPHA_TYPE
                    ? "te_transaction_alpha"
                    : "te_transaction_beta"
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
            {locationsList?.[locationId]?.name || "-"}
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
            <strong>{formatCurrency(lastYearAlpha)}</strong>
          </span>
        </div>
        <div className="mt-3 d-flex align-items-center justify-content-end">
          <Form.Check
            type="switch"
            id="te_switch_last_year_only"
            label={`Show last year (${LAST_YEAR}) transactions only`}
            checked={lastYearOnly}
            onChange={(evt) => setLastYearOnly(evt?.currentTarget?.checked)}
          />
        </div>
        <div className="mt-1">
          <Table bordered striped>
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th className="text-center">Amount</th>
                <th className="text-center">Type</th>
                <th className="text-center">Date</th>
              </tr>
            </thead>
            <tbody>{renderTransactions()}</tbody>
          </Table>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default TransactionsModal;
