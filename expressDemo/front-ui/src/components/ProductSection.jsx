import { ProductCard } from "./ProductCard";

export const ProductSection = ({
  products = [],
  title = "",
  latest = false,
}) => {
  return (
    <div className="col-12">
      <div className="row">
        <div className="col-12 py-3">
          <div className="row">
            <div className="col-12 text-center text-uppercase">
              <h2>{title}</h2>
            </div>
          </div>
          <div className="row row-cols-lg-4 row-cols-sm-2 justify-content-center">
            {[...products].splice(0, 4).map((product) => (
              <ProductCard product={product} latest={latest} key={product._id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
