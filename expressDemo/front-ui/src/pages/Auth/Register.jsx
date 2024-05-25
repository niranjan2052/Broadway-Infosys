import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { setValidationErrors } from "@/lib";
import { Form } from "react-bootstrap";
import { FormInput, SubmitBtn } from "@/components";
import http from "@/http";
import * as Yup from "yup";
import YupPassword from "yup-password";

YupPassword(Yup);
export const Register = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      agree: true,
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      email: Yup.string().required().email(),
      phone: Yup.string().required().max(30),
      address: Yup.string().required(),
      agree: Yup.boolean().required(),
      password: Yup.string()
        .required()
        .minLowercase(1)
        .minUppercase(1)
        .minNumbers(1)
        .minSymbols(1),
      confirmPassword: Yup.string()
        .required()
        .oneOf([Yup.ref("password")], "Password not Confirmed"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      http
        .post("/auth/register", values)
        .then(() => navigate("/login"))
        .catch(({ response }) => setValidationErrors(formik, response))
        .finally(() => setSubmitting(false));
    },
  });

  return (
    <div className="col-12">
      <div className="row">
        <div className="col-12 mt-3 text-center text-uppercase">
          <h2>Register</h2>
        </div>
      </div>

      <main className="row">
        <div className="col-lg-4 col-md-6 col-sm-8 mx-auto bg-white py-3 mb-4">
          <div className="row">
            <div className="col-12">
              {/* form */}
              <Form onSubmit={formik.handleSubmit}>
                <FormInput
                  type="text"
                  name="name"
                  label="Name"
                  required
                  formik={formik}
                />
                <FormInput
                  type="email"
                  name="email"
                  label="Email"
                  required
                  formik={formik}
                />
                <FormInput
                  type="password"
                  name="password"
                  label="Password"
                  required
                  formik={formik}
                />
                <FormInput
                  type="password"
                  name="confirmPassword"
                  label="confirmPassword"
                  required
                  formik={formik}
                />
                <FormInput
                  type="text"
                  name="phone"
                  label="Phone"
                  required
                  formik={formik}
                />
                <FormInput
                  as="textarea"
                  name="address"
                  label="Address"
                  required
                  formik={formik}
                />
                <Form.Check className="mb-3">
                  <Form.Check.Input
                    name="agree"
                    id="agree"
                    isInvalid={formik.touched.agree && formik.errors.agree}
                    onChange={() =>
                      formik.setFieldValue("agree", !formik.values.agree)
                    }
                    required
                  />
                  <Form.Check.Label htmlFor="agree">
                    I agree to Terms and Conditions
                  </Form.Check.Label>
                  {formik.touched.agree && formik.errors.agree && (
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.agree}
                    </Form.Control.Feedback>
                  )}
                </Form.Check>
                <Form.Group>
                  <SubmitBtn disabled={formik.isSubmitting} />
                </Form.Group>
              </Form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
