import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Loading, DataTable } from "@/components";
import http from "@/http";
import { confirmAlert } from "react-confirm-alert";
import { dt } from "@/lib";

export const List = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    http
      .get("cms/orders")
      .then(({ data }) => setOrders(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };
  const handleUpdate = (id, status) => {
    setLoading(true);
    http
      .patch(`/cms/orders/${id}`, { status })
      .then(() => loadOrders())
      .catch(() => {})
      .finally(() => setLoading(false));
  };
  const handleDelete = (orderId) => {
    confirmAlert({
      title: "Delete Order",
      message: "Are you sure? You want to delete this Item?",
      buttons: [
        {
          label: "Yes",
          className: `bg-danger`,
          onClick: () => {
            http
              .delete(`cms/orders/${orderId}`)
              .then(() => loadOrders())
              .catch(() => {})
              .finally(() => setLoading(false));
          },
        },
        {
          label: "No",
          className: "bg-secondary",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <Col className="bg-white py-2 my-2 rounded-2 shadow-sm">
      <Row>
        <Col>
          <h1>Orders</h1>
        </Col>
      </Row>
      {loading ? (
        <Loading />
      ) : (
        <Row>
          <Col>
            <DataTable
              searchable={[
                "User",
                "Product",
                "Comment",
                "Rating",
                "Created At",
                "Updated At",
              ]}
              sortable={[
                "User",
                "Product",
                "Comment",
                "Rating",
                "Created At",
                "Updated At",
              ]}
              data={orders.map((order) => {
                return {
                  Details: (
                    <ul>
                      {order.details.map((item) => (
                        <li key={item._id}>
                          {item.qty} x {item?.product?.name} @ Rs. {item.price}=
                          Rs. {item.total}
                        </li>
                      ))}
                    </ul>
                  ),
                  User: order.user.name,
                  Status: (
                    <Form.Select
                      value={order.status}
                      onChange={({ target }) =>
                        handleUpdate(order._id, target.value)
                      }
                    >
                      <option value="Processing">Processing</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Shipping">Shipping</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </Form.Select>
                  ),
                  "Created At": dt(order.createdAt),
                  "Updated At": dt(order.updatedAt),
                  Actions: (
                    <>
                      <Button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(order._id)}
                      >
                        <i className="fa-solid fa-times me-2"></i>Delete
                      </Button>
                    </>
                  ),
                };
              })}
            />
          </Col>
        </Row>
      )}
    </Col>
  );
};
