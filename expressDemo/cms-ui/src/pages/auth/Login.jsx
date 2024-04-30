import { Col, Row } from "react-bootstrap";

export const Login = () => {
  return (
    <>
      <Col
        xl={4}
        lg={5}
        sm={8}
        xs={10}
        className="bg-white py-3 my-3 rounded-2 shadow-sm"
      >
        <Row>
            <Col className="text-center">
                <h1>Login</h1>
            </Col>
        </Row>
      </Col>
    </>
  );
};
