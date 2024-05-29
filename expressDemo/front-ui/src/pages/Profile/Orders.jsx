import { useEffect, useState } from "react";
import http from "@/http";
import { Col, Row } from "react-bootstrap";
import { DataTable, Loading } from "@/components";
import { dt } from "@/lib";

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    http
      .get("/profile/orders")
      .then(({ data }) => setOrders(data))
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return loading ? (
    <Loading />
  ) : (
    <Row>
      <Col>
        <DataTable
          searchable={[
            "Created At",
            "Updated At",
          ]}
          sortable={[
            "Created At",
            "Updated At",
          ]}
          data={orders.map((order) => {
            return {
              Details: (
                <ul>
                  {order.details.map((item) => (
                    <li key={item._id}>
                      {item.qty} x {item?.product?.name} @ Rs. {item.price}= Rs.{" "}
                      {item.total}
                    </li>
                  ))}
                </ul>
              ),
              Status: order.status,
              "Created At": dt(order.createdAt),
              "Updated At": dt(order.updatedAt),
            };
          })}
        />
      </Col>
    </Row>
  );
};
