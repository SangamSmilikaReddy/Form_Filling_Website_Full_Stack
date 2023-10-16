import * as yup from "yup";

export const userSchema = yup.object().shape({
  name: yup.string().min(3).required("Please enter your Name"),
  regNo: yup.string().required("Please enter your Registration Number"),
  pEmail: yup
    .string()
    .email()
    .required("Please enter your Personal Email Address"),
  sEmail: yup.string().email().required("Please enter your SRM Email Address"),
  gitlink: yup.string().url().required("Please enter your Github Link"),
});
