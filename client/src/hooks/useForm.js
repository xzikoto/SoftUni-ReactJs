import { useState } from "react";

export function useForm(initialValues, submitCallback, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const changeHandler = (e) => {
    setValues((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
    setErrors((state) => ({
      ...state,
      [e.target.name]: "",
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const validationErrors = validate !== undefined ? validate(values) : [];
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      submitCallback(values);
    }
  };

  return { values, changeHandler, submitHandler, setValues, errors };
}
