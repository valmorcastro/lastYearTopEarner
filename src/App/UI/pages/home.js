import {
  EmployeesList,
  PageWrapper,
  TransactionsSummary,
  WinnerInfo,
} from "../components";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { fetchTransactions } from "../../store/reducer/transactions";
import Row from "react-bootstrap/Row";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useDispatch();

  const initialize = async () => {
    dispatch(fetchTransactions());
  };

  useEffect(() => {
    initialize();

    return () => {};
  }, []);

  return (
    <PageWrapper pageClassName="te_pg_Home te_hide_overflow">
      <Container className="g-0 h-100 d-flex flex-column justify-content-stretch te_hide_overflow">
        <Row className="g-0 flex-grow-0 te_Home_row_1">
          <Col className="g-0">
            <TransactionsSummary />
          </Col>
        </Row>
        <Row className="g-0 flex-grow-1 flex-sm-row-reverse te_Home_row_2 te_hide_overflow">
          <Col className="g-0 te_hide_overflow" xs={12} sm={4}>
            <WinnerInfo />
          </Col>
          <Col className="g-0 te_hide_overflow" xs={12} sm={8}>
            <EmployeesList />
          </Col>
        </Row>
      </Container>
    </PageWrapper>
  );
};

export default Home;
