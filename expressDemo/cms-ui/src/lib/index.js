export const setValidationErrors = (formik, response) => {
  if (response && "errors" in response?.data) {
    const { errors } = response.data;
    // for(let k in errors){
    //   formik.setFieldError(k, errors[k])
    // }
    formik.setErrors(errors);
  }
};

export const inStorage = (key, value, remember = false) => {
  remember
    ? localStorage.setItem(key, value)
    : sessionStorage.setItem(key, value);
};

export const fromStorage = (key) => {
  return localStorage.getItem(key) || sessionStorage.getItem(key);
};

export const removeStorage = (key) => {
  localStorage.removeItem(key);
  sessionStorage.removeItem(key);
};
