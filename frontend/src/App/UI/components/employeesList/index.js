import { employeesSelector, locationsSelector } from "../../../store/selectors";
import {
  FaDollarSign,
  FaFileInvoiceDollar,
  FaMapMarkedAlt,
  FaThList,
  FaThLarge,
  FaUserTie,
} from "react-icons/fa";
import { useCallback, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import classNames from "classnames";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { formatCurrency } from "../../../utils";
import { isMobile } from "react-device-detect";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import TransactionsModal from "../transactionsModal";
import { useSelector } from "react-redux";

const EmployeesList = () => {
  const { list: employeesList = {} } = useSelector(employeesSelector) || {};
  const { list: locationsList = {} } = useSelector(locationsSelector) || {};

  const [renderCards, setRenderCards] = useState(false);
  const [showTransactionsModal, setShowTransactionsModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const closeModal = useCallback(
    () => setShowTransactionsModal(false),
    [setShowTransactionsModal]
  );

  const showTransactions = (employee) => {
    setSelectedEmployee(employee);
    setShowTransactionsModal(true);
  };

  const sortByLastYear = (
    { lastYearTotal: totalA },
    { lastYearTotal: totalB }
  ) => (totalB > totalA ? 1 : -1);

  const handleViewToggle = () => setRenderCards(!renderCards);

  const renderPopover = (id, title, total) => (
    <Popover id={`popover-${id}`}>
      <Popover.Header as="h5">{title}</Popover.Header>
      <Popover.Body className="text-center">
        <h6>{formatCurrency(total)}</h6>
      </Popover.Body>
    </Popover>
  );

  const renderOverlayTrigger = (
    id,
    placement = "top",
    title,
    content,
    popoverContent
  ) => (
    <OverlayTrigger
      trigger={["hover", "focus"]}
      key={id}
      placement={"top"}
      overlay={renderPopover(id, title, popoverContent)}
    >
      <span>{content}</span>
    </OverlayTrigger>
  );

  const renderEmployeesTable = () => (
    <Table bordered striped className="mb-3">
      <thead>
        <tr>
          <th className="text-center">
            <small>Employee name</small>
          </th>
          <th className="text-center">
            <small>Location</small>
          </th>
          <th className="text-center">
            <small>Last Year Total</small>
          </th>
          <th className="text-center">
            <small>Last Year Alpha Total</small>
          </th>
          <th className="text-center">-</th>
        </tr>
      </thead>
      <tbody>
        {Object.values(employeesList)
          .sort(sortByLastYear)
          .map(
            ({
              name = null,
              id = null,
              categoryCode = null,
              location: { id: locationId = null } = {},
              lastYearTotal = 0,
              lastYearAlpha = 0,
              total = 0,
              totalAlpha = 0,
            }) => (
              <tr key={`employee-${id}`}>
                <td>
                  <span
                    className={classNames(
                      "te_employee_name",
                      categoryCode && `category-${categoryCode}`
                    )}
                  >
                    {name} <small>({id})</small>
                  </span>
                </td>
                <td className="text-center">
                  {locationsList?.[locationId]?.name || "-"}
                </td>
                <td className="text-center">
                  {renderOverlayTrigger(
                    `${id}-total`,
                    "right",
                    "Every Time Total",
                    formatCurrency(lastYearTotal),
                    total
                  )}
                </td>
                <td className="text-center">
                  {renderOverlayTrigger(
                    `${id}-alpha-total`,
                    "left",
                    "Every Time Alpha Total",
                    formatCurrency(lastYearAlpha),
                    totalAlpha
                  )}
                </td>
                <td className="text-center">
                  <Button
                    variant="tertiary"
                    onClick={() => showTransactions(id)}
                    className="p-0"
                  >
                    <FaFileInvoiceDollar />
                  </Button>
                </td>
              </tr>
            )
          )}
      </tbody>
    </Table>
  );

  const renderEmployeesCards = () => (
    <div className="d-flex flex-row flex-wrap align-content-around justify-space-around card-container mb-3">
      {Object.values(employeesList)
        .sort(sortByLastYear)
        .map(
          ({
            name = null,
            id = null,
            categoryCode = null,
            location: { id: locationId = null } = {},
            lastYearTotal = 0,
            lastYearAlpha = 0,
            total = 0,
            totalAlpha = 0,
          }) => (
            <Card key={`employee-card-${id}`}>
              <Card.Body>
                <Card.Title className="w-100 d-flex flex-row align-items-center justify-content-between">
                  <h4
                    className={classNames(
                      "te_employee_name",
                      categoryCode && `category-${categoryCode}`
                    )}
                  >
                    {name}
                  </h4>
                  <Button
                    onClick={() => showTransactions(id)}
                    variant="tertiary"
                  >
                    <FaFileInvoiceDollar />
                  </Button>
                </Card.Title>
                <Card.Subtitle className="mb-4 text-muted">
                  <small>{id}</small>
                </Card.Subtitle>
                <Container fluid>
                  <Row className="mb-1">
                    <Col xs={5} className="g-0 text-end">
                      <strong>
                        <FaMapMarkedAlt />
                        &nbsp;Location:
                      </strong>
                    </Col>
                    <Col xs={7}>{locationsList?.[locationId]?.name || "-"}</Col>
                  </Row>
                  <Row className="mb-1">
                    <Col xs={5} className="g-0 text-end">
                      <strong>
                        <FaDollarSign />
                        &nbsp;Last Year:
                      </strong>
                    </Col>
                    <Col xs={7}>
                      <span className="text-success">
                        <strong>{formatCurrency(lastYearTotal)}</strong>
                      </span>
                    </Col>
                  </Row>
                  <Row className="mb-1">
                    <Col xs={5} className="g-0 text-end">
                      &nbsp;
                    </Col>
                    <Col xs={7}>
                      <span className="text-success">
                        <strong>{formatCurrency(lastYearAlpha)} (Alpha)</strong>
                      </span>
                    </Col>
                  </Row>
                </Container>
              </Card.Body>
            </Card>
          )
        )}
    </div>
  );

  const renderEmployees = () =>
    isMobile || renderCards ? renderEmployeesCards() : renderEmployeesTable();

  return (
    <Container className="te_cmp_EmployeesList h-100 d-flex flex-column justify-content-stretch te_hide_overflow">
      <Row className="mt-3 flex-grow-0">
        <Col className="d-flex align-items-center justify-content-between">
          <h3 className="d-flex align-items-center">
            <FaUserTie />
            &nbsp;Employees
          </h3>
          <Button
            variant="secondary"
            onClick={handleViewToggle}
            className="d-none d-sm-block"
          >
            {renderCards ? <FaThList /> : <FaThLarge />}
          </Button>
        </Col>
      </Row>
      <Row className="mt-3 flex-grow-1 te_hide_overflow">
        <Col>
          <div className="te_scrollable_wrapper">{renderEmployees()}</div>
        </Col>
      </Row>
      <TransactionsModal
        employeeId={selectedEmployee}
        showModal={showTransactionsModal}
        handleClose={closeModal}
      />
    </Container>
  );
};

export default EmployeesList;
