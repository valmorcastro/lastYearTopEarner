import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";

const LoadingIndicator = () => (
  <Container className="h-100">
    <Row className="h-100 d-flex align-items-center justify-content-center">
      <Col xs={6} sm={2}>
        <Card className="bg-dark text-white">
          <Card.Body className="d-flex align-items-center">
            <Spinner /> <div className="mx-3">Loading...</div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default LoadingIndicator;
