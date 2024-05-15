import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Col, Form, Pagination, Row, Table } from "react-bootstrap";

export const DataTable = ({ data = [], searchable = [], sortable = [] }) => {
  const [term, setTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [direction, setDirection] = useState("asc"); // It keeps the arrangment value
  const [filtered, setFiltered] = useState(data); // It stores the data after filtering
  const [perPage, setPerPage] = useState(10); // It denotes no of entries that we can show on the current page
  const [current, setCurrent] = useState(1); // It denotes current page
  const [pages, setTotal] = useState(0); // It denotes total number of pages
  const [offset, setOffset] = useState(0); // It is to identify the place from where the entries will be shown
  const [paginated, setPaginated] = useState([]); //It is to store the data that we get in the single page.
  const [pageLinks, setPageLinks] = useState([]);

  //use effect for search
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
    setCurrent(1);
    setSortBy("");
    setDirection("asc");
  }, [term]);
  //use Effect for sorting
  useEffect(() => {
    if (sortBy.length > 0) {
      let temp = [...filtered].sort((a, b) => {
        let x = parseFloat(`${a[sortBy]}`);
        let y = parseFloat(`${b[sortBy]}`);
        if (isNaN(x) || isNaN(y)) {
          x = a[sortBy];
          y = b[sortBy];
          console.log(dayjs(x).isValid());
          console.log(dayjs(y).isValid());
          if (dayjs(x).isValid() && dayjs(y).isValid()) {
            x = Date.parse(x);
            y = Date.parse(y);
            return x - y;
          } else {
            x = x.toLowerCase();
            y = y.toLowerCase();
            if (x < y) {
              return -1;
            }
            if (x > y) {
              return 1;
            }
            return 0;
          }
        } else {
          return x - y;
        }
      });
      if (direction == "desc") {
        temp.reverse();
      }
      setFiltered(temp);
      setCurrent(1);
    }
  }, [sortBy, direction]);

  //use effect for pagination
  useEffect(() => {
    let temp = (current - 1) * perPage;
    setOffset(temp);
  }, [current, perPage]);

  useEffect(() => {
    let temp = Math.ceil(filtered.length / perPage);
    setTotal(temp);
  }, [filtered, perPage]);

  useEffect(() => {
    let temp = [...filtered].splice(offset, perPage);
    setPaginated(temp);
  }, [offset, perPage, filtered]);

  useEffect(() => {
    setCurrent(1); //Reset the current to page 1 on any change in per page
  }, [perPage]);

  useEffect(() => {
    let temp = [];
    for (let i = 1; i <= pages; i++) {
      temp.push(
        <Pagination.Item active={i == current} onClick={() => setCurrent(i)}>
          {i}
        </Pagination.Item>
      );
    }
    setPageLinks(temp);
  }, [pages, current]);

  const handleClick = (k) => {
    if (sortable.includes(k)) {
      if (k == sortBy) {
        setDirection(direction == "asc" ? "desc" : "asc");
      } else {
        setSortBy(k);
        setDirection("asc");
      }
    }
  };
  return (
    <Row>
      <Col xs={12}>
        <Row>
          <Col md={2} xl={3} className="mb-3">
            <Form.Label htmlFor="perPage">Per Page</Form.Label>
            <Form.Select
              name="perPage"
              id="perPage"
              value={perPage}
              onChange={({ target }) => {
                setPerPage(parseInt(target.value));
              }}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </Form.Select>
          </Col>
          <Col md={4} xl={3} className="mb-3 ms-auto">
            <Form.Label htmlFor="search">Search</Form.Label>
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
                  <th
                    key={i}
                    className={sortable.includes(k) && "sortable"}
                    onClick={() => handleClick(k)}
                  >
                    {k}
                    {sortBy == k && (
                      <i
                        className={`fa-solid fa-chevron-${
                          direction == "asc" ? "down" : "up"
                        } ms-3`}
                      ></i>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((item, i) => (
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
        {pages > 1 && (
          <Row>
            <Col className="text-muted fst-italic">
              Showing {offset + 1} to{" "}
              {current == pages ? filtered.length : current * perPage} in page
              {" " + current} of {pages}
            </Col>
            <Col xs="auto" className="ms-auto">
              <Pagination>
                <Pagination.Prev
                  disabled={current == 1}
                  onClick={() => setCurrent(current - 1)}
                />
                {pageLinks.map((link) => link)}
                <Pagination.Next
                  disabled={current == pages}
                  onClick={() => setCurrent(current + 1)}
                />
              </Pagination>
            </Col>
          </Row>
        )}
      </Col>
    </Row>
  );
};
