import { Form, FormLabel } from "react-bootstrap";
import ReactSwitch from "react-switch";
import { FormInput, SubmitBtn } from "@/components";

export const DataForm = ({ formik}) => {
  return (
    <Form onSubmit={formik.handleSubmit}>
      <FormInput
        type="text"
        name="name"
        label="Name"
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
