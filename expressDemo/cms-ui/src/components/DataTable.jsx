import { useEffect, useState } from "react";
import { Col, Form, Row, Table } from "react-bootstrap";

export const DataTable = ({ data = [], searchable = [] }) => {
  const [term, setTerm] = useState("");
  const [filtered, setFiltered] = useState(data);
  useEffect(() => {
    if (term.length > 0) {
      let temp = data.filter((item) => {
        for (let k of searchable) {
          if (`${item[k]}`.toLowerCase().includes(term.toLowerCase()))
            return true;
        }
        return false;
      });
      setFiltered(temp);
    } else {
      setFiltered(data);
    }
  }, [term]);
  return (
    <Row>
      <Col xs={12}>
        <Row>
          <Col md={4} xl={3} className="mb-3 ms-auto">
            <Form.Control
              type="search"
              name="term"
              id="term"
              placeholder="Search..."
              value={term}
              onChange={({ target }) => setTerm(target.value)}
            />
          </Col>
        </Row>
      </Col>
      <Col xs={12}>
        {filtered.length > 0 ? (
          <Table size="sm" striped hover bordered>
            <thead className="table-dark">
              <tr>
                {Object.keys(data[0]).map((k, i) => (
                  <th key={i}>{k}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, i) => (
                <tr key={i}>
                  {Object.values(item).map((v, j) => (
                    <td key={j}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <h4 className="text-muted">No Data Found!!</h4>
        )}
      </Col>
    </Row>
  );
};
