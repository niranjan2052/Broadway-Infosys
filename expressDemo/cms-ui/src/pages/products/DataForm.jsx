import { Col, Form, FormGroup, FormLabel, Row } from "react-bootstrap";
import ReactSwitch from "react-switch";
import { FormInput, SubmitBtn } from "@/components";
import { useEffect, useState } from "react";
import http from "@/http";

export const DataForm = ({ formik }) => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [laoding, setLoading] = useState(true);

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
  return (
    <Form onSubmit={formik.handleSubmit} enctype="multipart/form-data">
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
          requried
        >
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </Form.Select>
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
          requried
        >
          {brands.map((brand) => (
            <option key={brand._id} value={brand._id}>
              {brand.name}
            </option>
          ))}
        </Form.Select>
      </FormGroup>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="images">Images</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          name="image"
          id="image"
          onChange={handleImageChange}
          onBlur={formik.handleBlur}
          multiple
        />
        {formik.values.images?.length > 0 && (
          <Row>
            {formik.values.images.map((image, i) => (
              <Col sm={3} className="mt-3" key={i}>
                <img src={URL.createObjectURL(image)} className="img-fluid" />
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
      <Form.Group>
        <SubmitBtn disabled={formik.isSubmitting} />
      </Form.Group>
    </Form>
  );
};
