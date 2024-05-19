import { Button, Col, Form, FormGroup, FormLabel, Row } from "react-bootstrap";
import ReactSwitch from "react-switch";
import { FormInput, SubmitBtn, Loading } from "@/components";
import { useEffect, useState } from "react";
import http from "@/http";
import { imgUrl } from "@/lib";

export const DataForm = ({
  formik,
  loading = false,
  setLoading,
  onDelete,
  images = [],
}) => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    Promise.all([http.get("/cms/catagory"), http.get("/cms/brand")])
      .then((resp) => {
        const [{ data: catData }, { data: brnData }] = resp;
        setCategories(catData);
        setBrands(brnData);
        formik.setFieldValue(
          "catagoryId",
          catData.length > 0 ? catData[0]?._id : ""
        );
        formik.setFieldValue(
          "brandId",
          catData.length > 0 ? brnData[0]?._id : ""
        );
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const handleImageChange = ({ target }) => {
    formik.setFieldValue("images", [...target.files]);
  };

  return loading ? (
    <Loading />
  ) : (
    <Form onSubmit={formik.handleSubmit}>
      <FormInput
        type="text"
        name="name"
        label="Name"
        required
        formik={formik}
      />
      <FormInput
        name="summary"
        label="Summary"
        as="textarea"
        required
        formik={formik}
      />
      <FormInput
        name="description"
        label="Description"
        as="textarea"
        required
        formik={formik}
      />
      <FormInput
        name="price"
        label="Price"
        type="number"
        required
        formik={formik}
      />
      <FormInput
        name="discounted_price"
        label="Discounted_Price"
        type="number"
        formik={formik}
      />
      <FormGroup>
        <Form.Label htmlFor="catagoryId">Catagory</Form.Label>
        <Form.Select
          name="catagoryId"
          id="catagoryId"
          label="CatagoryId"
          value={formik.values.catagoryId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.catagoryId && formik.errors.catagoryId}
          requried
        >
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </Form.Select>
        {formik.touched.catagoryId && formik.errors.catagoryId && (
          <Form.Control.Feedback type="invalid">
            {formik.errors.catagoryId}
          </Form.Control.Feedback>
        )}
      </FormGroup>
      <FormGroup>
        <Form.Label htmlFor="brandId">Brand</Form.Label>
        <Form.Select
          name="brandId"
          id="brandId"
          label="BrandId"
          value={formik.values.brandId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.brandId && formik.errors.brandId}
          requried
        >
          {brands.map((brand) => (
            <option key={brand._id} value={brand._id}>
              {brand.name}
            </option>
          ))}
        </Form.Select>
      </FormGroup>
      {formik.touched.brandId && formik.errors.brandId && (
        <Form.Control.Feedback type="invalid">
          {formik.errors.brandId}
        </Form.Control.Feedback>
      )}
      <Form.Group className="mb-3">
        <Form.Label htmlFor="images">Images</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          name="images"
          id="images"
          onChange={handleImageChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.images && formik.errors.images}
          multiple
        />
        {formik.touched.images && formik.errors.images && (
          <Form.Control.Feedback type="invalid">
            {formik.touched.images && formik.errors.images}
          </Form.Control.Feedback>
        )}
        {formik.values.images?.length > 0 && (
          <Row>
            {formik.values.images.map((image, i) => (
              <Col sm={3} className="mt-3" key={i}>
                <img src={URL.createObjectURL(image)} className="img-fluid" />
              </Col>
            ))}
          </Row>
        )}
        {images.length > 0 && (
          <Row>
            {images.map((image, i) => (
              <Col sm={3} className="mt-3" key={i}>
                <Row>
                  <Col xs={12}>
                    <img src={imgUrl(image)} className="img-fluid" />
                  </Col>
                  <Col xs={12} className="mt-3 text-center">
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => onDelete(image)}
                    >
                      <i className="fa-solid fa-times me-2"></i>
                      Delete
                    </Button>
                  </Col>
                </Row>
              </Col>
            ))}
          </Row>
        )}
      </Form.Group>

      <FormLabel>
        <label htmlFor="status">Status</label>
        <br />
        <ReactSwitch
          checked={formik.values.status}
          onChange={() => {
            formik.setFieldValue("status", !formik.values.status);
          }}
        />
      </FormLabel>
      <br />
      <FormLabel>
        <label htmlFor="featured">Featured</label>
        <br />
        <ReactSwitch
          checked={formik.values.featured}
          onChange={() => {
            formik.setFieldValue("featured", !formik.values.featured);
          }}
        />
      </FormLabel>
      <Form.Group>
        <SubmitBtn disabled={formik.isSubmitting} />
      </Form.Group>
    </Form>
  );
};
