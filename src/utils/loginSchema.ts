import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().trim().required("Обязательное поле").email("Неверный e-mail"),
  password: yup.string().trim().required("Обязательное поле").min(6, "Пароль должен содержать минимум 6 символов"),
});
export const passwordSchema = yup.object().shape({
  password: yup.string().trim().min(6, "Пароль должен содержать минимум 6 символов").required("Обязательное поле"),
});

export const createAccountSchema = yup.object().shape({
  name: yup.string().trim(),
  email: yup.string().trim().required("Обязательное поле").email("Неверный e-mail"),
  password: yup.string().trim().required("Обязательное поле").min(6, "Пароль должен содержать минимум 6 символов"),
  confirmPassword: yup
    .string()
    .required("Обязательное поле")
    .oneOf([yup.ref("password")], "Пароль не совпадает"),
});
