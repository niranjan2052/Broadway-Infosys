import { Form, FormLabel } from "react-bootstrap";
import ReactSwitch from "react-switch";
import { FormInput, SubmitBtn } from "@/components";

export const DataForm = ({ formik, isEdit = false }) => {
  return (
    <Form onSubmit={formik.handleSubmit}>
      <FormInput
        type="text"
        name="name"
        label="Name"
        required
        formik={formik}
      />
      {!isEdit && (
        <>
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
        </>
      )}
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
