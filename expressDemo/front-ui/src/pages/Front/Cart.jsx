import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loading } from "@/components";
import { imgUrl } from "@/lib";

export const Cart = () => {
  const user = useSelector((state) => state.user.value);
  const cart = useSelector((state) => state.cart.value);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let qt = 0,
      tp = 0;
    if (Object.keys(cart).length > 0) {
      for (let k in cart) {
        qt += cart[k].qty;
        tp +=
          (cart[k].product?.discounted_price > 0
            ? cart[k].product?.discounted_price
            : cart[k].product?.price) * cart[k].qty;
      }
    }
    setTotalQty(qt);
    setTotalPrice(tp);
  }, [cart]);

  return loading ? (
    <Loading />
  ) : (
    <div className="col-12">
      <div className="row">
        <div className="col-12 mt-3 text-center text-uppercase">
          <h2>Shopping Cart</h2>
        </div>
      </div>

      <main className="row">
        <div className="col-12 bg-white py-3 mb-3">
          <div className="row">
            <div className="col-lg-6 col-md-8 col-sm-10 mx-auto table-responsive">
              <div className="row">
                {Object.keys(cart).length > 0 ? (
                  <div className="col-12">
                    <table className="table table-striped table-hover table-sm">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Price</th>
                          <th>Qty</th>
                          <th>Amount</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.keys(cart).map((k) => {
                          let product = cart[k].product;
                          let price =
                            cart[k].product?.discounted_price > 0
                              ? cart[k].product?.discounted_price
                              : cart[k].product?.price;
                          let qty = cart[k].qty;
                          return (
                            <tr key={k}>
                              <td>
                                <img
                                  src={imgUrl(product.images[0])}
                                  className="img-fluid me-3"
                                />
                                {product.name}
                              </td>
                              <td>Rs. {price}</td>
                              <td>
                                <input type="number" min="1" value={qty} />
                              </td>
                              <td>Rs. {price * qty}</td>
                              <td>
                                <button className="btn btn-link text-danger">
                                  <i className="fas fa-times"></i>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                      <tfoot>
                        <tr>
                          <th colspan="3" className="text-right">
                            Total
                          </th>
                          <th>Rs. {totalPrice}</th>
                          <th></th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                ) : (
                  <h5>Cart is Empty</h5>
                )}
                <div className="col-12 text-right">
                  <button
                    className="btn btn-outline-secondary me-3"
                    type="submit"
                  >
                    Update
                  </button>
                  <a href="#" className="btn btn-outline-success">
                    Checkout
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
