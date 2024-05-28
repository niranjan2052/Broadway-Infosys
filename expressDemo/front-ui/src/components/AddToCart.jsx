import { useDispatch, useSelector } from "react-redux";
import { SubmitBtn } from "./SubmitBtn";
import { useState } from "react";
import { setCart } from "@/store";
import { inStorage } from "@/lib";
import { toast } from "react-toastify";

export const AddToCart = ({ product, qty = 1 }) => {
  const cart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true);
    let temp = { ...cart };
    let pid = product._id;
    let qt = qty;
    if (pid in temp) {
      qt += temp[pid].qty;
    }
    temp = {
      ...temp,
      [pid]: {
        qty: qt,
        product,
      },
    };
    dispatch(setCart(temp));
    inStorage("cart", JSON.stringify(temp), true);
    setLoading(false);
    toast.success("Added to Cart");
  };
  return (
    <SubmitBtn
      label="Add to Cart"
      icon="fa-cart-plus"
      disabled={loading}
      onClick={handleClick}
    />
  );
};
