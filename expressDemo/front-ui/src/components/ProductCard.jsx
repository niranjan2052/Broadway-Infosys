import { imgUrl } from "@/lib";
import { Link } from "react-router-dom";

export const ProductCard = ({ product, latest = false }) => {
  return (
    <div className="col my-3">
      <div className="col-12 bg-white text-center h-100 product-item">
        {latest && <span className="new">New</span>}
        <div className="row h-100">
          <div className="col-12 p-0 mb-3">
            <Link to={`/product/${product._id}`}>
              <img src={imgUrl(product.images[0])} className="img-fluid" />
            </Link>
          </div>
          <div className="col-12 mb-3">
            <Link to={`/product/${product._id}`} className="product-name">
              {product.name}
            </Link>
          </div>
          <div className="col-12 mb-3">
            {product.discounted_price > 0 ? (
              <>
                <span className="product-price-old">Rs. {product.price}</span>
                <br />
                <span className="product-price">
                  Rs. {product.discounted_price}
                </span>
              </>
            ) : (
              <span className="product-price">Rs. {product.price}</span>
            )}
          </div>
          <div className="col-12 mb-3 align-self-end">
            <button className="btn btn-outline-dark" type="button">
              <i className="fas fa-cart-plus me-2"></i>Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
