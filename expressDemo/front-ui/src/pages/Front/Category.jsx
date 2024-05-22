import { useEffect, useState } from "react";
import http from "@/http";
import { useParams } from "react-router-dom";
import { Loading, ProductCard } from "@/components";
import { Pagination } from "react-bootstrap";

export const Category = () => {
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [perPage] = useState(10); // It denotes no of entries that we can show on the current page
  const [current, setCurrent] = useState(1); // It denotes current page
  const [pages, setTotal] = useState(0); // It denotes total number of pages
  const [offset, setOffset] = useState(0); // It is to identify the place from where the entries will be shown
  const [paginated, setPaginated] = useState([]); //It is to store the data that we get in the single page.
  const [pageLinks, setPageLinks] = useState([]);

  const params = useParams();

  useEffect(() => {
    setLoading(true);
    Promise.all([
      http.get(`/catagories/${params.id}`),
      http.get(`/catagories/${params.id}/products`),
    ])
      .then(([{ data: cat }, { data: prodList }]) => {
        setCategory(cat);
        setProducts(prodList);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }, [params.id]);

  //use effect for pagination
  useEffect(() => {
    let temp = (current - 1) * perPage;
    setOffset(temp);
  }, [current, perPage]);

  useEffect(() => {
    let temp = Math.ceil(products.length / perPage);
    setTotal(temp);
  }, [products, perPage]);

  useEffect(() => {
    let temp = [...products].splice(offset, perPage);
    setPaginated(temp);
  }, [offset, perPage, products]);

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

  return (
    <div className="col-12">
      {loading ? (
        <Loading />
      ) : (
        <main className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-12 py-3">
                <div className="row">
                  <div className="col-12 text-center text-uppercase">
                    <h2>{category.name}</h2>
                  </div>
                </div>
                <div className="row row-cols-xl-6 row-cols-ls-4 row-cols-sm-2 justify-content-center">
                  {paginated.map((product) => (
                    <ProductCard product={product} key={product._id} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col-12">
            {pages > 1 && (
              <Row>
                <Col className="text-muted fst-italic">
                  Showing {offset + 1} to{" "}
                  {current == pages ? filtered.length : current * perPage} in
                  page
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
          </div>
        </main>
      )}
    </div>
  );
};
