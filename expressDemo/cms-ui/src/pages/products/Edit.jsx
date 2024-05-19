import { useFormik } from "formik";
import { Row, Col } from "react-bootstrap";
import { Loading } from "@/components";
import * as Yup from "yup";
import http from "@/http";
import { setValidationErrors } from "@/lib";
import YupPassword from "yup-password";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { DataForm } from "./DataForm";

YupPassword(Yup);

export const Edit = () => {
  const params = useParams();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      summary: "",
      description: "",
      price: "",
      discounted_price: "",
      images: [],
      catagoryId: "",
      brandId: "",
      status: true,
      featured: true,
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      summary: Yup.string().required(),
      description: Yup.string().required(),
      price: Yup.number().required(),
      discounted_price: Yup.number(),
      catagoryId: Yup.string().required(),
      brandId: Yup.string().required(),
      status: Yup.boolean().required(),
      featured: Yup.boolean().required(),
      images: Yup.array().test(
        "fileType",
        "All files must be a valid image",
        (item) => {
          for (let img of item) {
            if (!img.type.startsWith("image/")) {
              return false;
            }
          }
          return true;
        }
      ),
    }),
    onSubmit: (values, { setSubmitting }) => {
      let fd = new FormData();
      for (let k in values) {
        if (k == "images" && values[k].length >= 0) {
          for (let image of values[k]) {
            fd.append(k, image);
          }
        } else {
          fd.append(k, values[k]);
        }
      }
      console.log(values);
      http
        .patch(`/cms/products/${params.id}`, fd, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => navigate("/products"))
        .catch(({ response }) => setValidationErrors(formik, response))
        .finally(() => setSubmitting(false));
    },
  });
  const handleDelete = (filename) => {
    if (images.length > 1) {
      setLoading(true);
      http
        .delete(`/cms/products/${params.id}/image/${filename}`)
        .then(() => loadProducts())
        .catch(() => {})
        .finally(() => setLoading(false));
    } else {
      toast.error("At least One Image is Compulsory.");
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    setLoading(true);
    http
      .get(`/cms/products/${params.id}`)
      .then(({ data }) => {
        formik.setValues({
          name: data[0].name,
          summary: data[0].summary,
          description: data[0].description,
          price: data[0].price,
          discounted_price: data[0].discounted_price,
          catagoryId: data[0].catagoryId,
          brandId: data[0].brandId,
          status: data[0].status,
          featured: data[0].featured,
        });
        setImages(data[0].images);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };
  return (
    <Col className="bg-white px-3 py-5 mx-2 my-4">
      <Row>
        <Col>
          <h1>Edit Product</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <DataForm
            formik={formik}
            loading={loading}
            setLoading={setLoading}
            onDelete={handleDelete}
            images={images}
          />
        </Col>
      </Row>
    </Col>
  );
};
