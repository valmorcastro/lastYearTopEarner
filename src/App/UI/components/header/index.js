import { employeesSelector, locationsSelector } from "../../../store/selectors";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { FaSyncAlt } from "react-icons/fa";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import { fetchTransactions } from "../../../store/reducer/transactions";

const Header = () => {
  const dispatch = useDispatch();
  const employees = useSelector(employeesSelector);
  const locations = useSelector(locationsSelector);

  const sortByName = ({ name: nameA }, { name: nameB }) =>
    nameA > nameB ? 1 : -1;

  const employeesList = [...employees].sort(sortByName) || [];
  const locationsList = [...locations].sort(sortByName) || [];

  const renderEmployeesDD = () => (
    <NavDropdown title="Employees" id="employees-dropdown">
      {employeesList.map(({ id, name }) => (
        <NavDropdown.Item as={NavLink} to={`/employee/${id}`}>
          {name}
        </NavDropdown.Item>
      ))}
      {employeesList.length && <NavDropdown.Divider />}
      <NavDropdown.Item as={NavLink} to="employees">
        All Employees
      </NavDropdown.Item>
    </NavDropdown>
  );

  const renderLocationsDD = () => (
    <NavDropdown title="Locations" id="locations-dropdown">
      {locationsList.map(({ id, name }) => (
        <NavDropdown.Item as={NavLink} to={`/location/${id}`}>
          {name}
        </NavDropdown.Item>
      ))}
      {locationsList.length && <NavDropdown.Divider />}
      <NavDropdown.Item as={NavLink} to="locations">
        All Locations
      </NavDropdown.Item>
    </NavDropdown>
  );

  const handleRefreshContents = () => {
    dispatch(fetchTransactions());
  };

  return (
    <header className="te_cmp_Header">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand
            as={NavLink}
            to="/"
            className="d-flex align-items-center"
          >
            <img
              src="./logo.png"
              alt="ADP"
              className="img-responsive"
              height="40"
            />
            <div className="mx-3">Last Year Top Earner</div>
          </Navbar.Brand>
          {/* <Navbar.Toggle aria-controls="te-navbar-nav" />
          <Navbar.Collapse id="te-navbar-nav"> */}
            <Nav className="me-auto">
              {/* {renderEmployeesDD()}
              {renderLocationsDD()} */}
            </Nav>
            <Nav className="ms-auto">
              <Button variant="tertiary" onClick={handleRefreshContents}>
                <FaSyncAlt />
              </Button>
            </Nav>
          {/* </Navbar.Collapse> */}
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
