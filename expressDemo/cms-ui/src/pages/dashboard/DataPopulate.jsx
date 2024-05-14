import { Col, Row } from "react-bootstrap";
import http from "@/http";
import { useEffect, useState } from "react";

export const DataPopulate = () => {
  const [num, setNum] = useState(1);
  useEffect(() => {
    populate();
  }, []);
  const populate = async () => {
    for (let i = 1; i <= 50; i++) {
      setNum(i);
      const data = {
        name: `Person ${i}`,
        email: `Person.${i}@email.com`,
        password: "Password@123",
        confirmPassword: "Password@123",
        phone: "987654321",
        address: `Location ${i}`,
        status: i % 2 == 0 ? true : false,
      };
      try {
        await http.post("cms/staffs", data);
      } catch (e) {
        
      }
    }
  };
  return (
    <Col className="bg-white py-2 my-2 rounded-2 shadow-sm">
      <Row>
        <Col>
          <h1>{num} of 50 added.</h1>
        </Col>
      </Row>
    </Col>
  );
};
