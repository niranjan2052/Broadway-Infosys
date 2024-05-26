import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setValidationErrors, inStorage } from "@/lib";
import * as Yup from "yup";
import { Form } from "react-bootstrap";
import { FormInput, SubmitBtn } from "@/components";
import http from "@/http";
import { setUser } from "@/store";
import { toast } from "react-toastify";

export const Login = () => {
  const [remember, setRemember] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required().email(),
      password: Yup.string().required(),
    }),
    onSubmit: (value, { setSubmitting }) => {
      http
        .post("/auth/login", value)
        .then(({ data }) => {
          inStorage("frontToken", data.token, remember);
          return http.get("/profile");
        })
        .then(({ data }) => {
          dispatch(setUser(data));
          navigate("/");
        })
        .catch(({ response }) => setValidationErrors(formik, response))
        .finally(() => {
          toast.success("You are Logged In.");
          setSubmitting(false);
        });
    },
  });
  return (
    <div className="col-12">
      {/* <!-- Main Content --> */}
      <div className="row">
        <div className="col-12 mt-3 text-center text-uppercase">
          <h2>Login</h2>
        </div>
      </div>

      <main className="row">
        <div className="col-lg-4 col-md-6 col-sm-8 mx-auto bg-white py-3 mb-4">
          <div className="row">
            <div className="col-12">
              {/* Form */}
              <Form onSubmit={formik.handleSubmit}>
                <FormInput
                  formik={formik}
                  type="email"
                  name="email"
                  label="Email"
                  required
                  placeholder="Enter your Email"
                />
                <FormInput
                  formik={formik}
                  type="password"
                  name="password"
                  label="Password"
                  required
                  placeholder="Enter your Password"
                />
                <Form.Check className="mb-3">
                  <Form.Check.Input
                    name="remember"
                    id="remember"
                    value={true}
                    checked={remember}
                    onChange={() => setRemember(!remember)}
                  />
                  <Form.Check.Label htmlFor="remember">
                    Remember Me
                  </Form.Check.Label>
                  {remember ? (
                    <div className="text-success">Stay! Logged In!</div>
                  ) : undefined}
                </Form.Check>
                <Form.Group className="d-grid">
                  <SubmitBtn
                    label="Log In"
                    icon="fa-arrow-right-to-bracket"
                    disabled={formik.isSubmitting}
                  />
                </Form.Group>
              </Form>
            </div>
          </div>
        </div>
      </main>
      {/* <!-- Main Content --> */}
    </div>
  );
};
