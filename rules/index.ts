import * as yup from "yup";

export const schema = yup.object({
    name: yup
        .string()
        .required("Este campo es requerido")
        .min(3, "Mínimo 3 caracteres")
        .max(20, "Máximo 20 caracteres"),
    lastName: yup
        .string()
        .required("Este campo es requerido")
        .min(3, "Mínimo 3 caracteres")
        .max(20, "Máximo 20 caracteres"),
    email: yup
        .string()
        .required("Este campo es requerido")
        .email("Correo inválido")
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Debe ser un email valido"),
    address: yup
        .string()
        .required("Este campo es requerido")
        .min(3, "Mínimo 3 caracteres")
        .max(20, "Máximo 50 caracteres"),
    addressDetail: yup
        .string()
        .min(3, "Mínimo 3 caracteres")
        .max(20, "Máximo 50 caracteres"),
    state: yup
        .string()
        .required("Este campo es requerido")
        .min(3, "Mínimo 3 caracteres")
        .max(20, "Máximo 20 caracteres"),
    city: yup
        .string()
        .required("Este campo es requerido")
        .min(3, "Mínimo 3 caracteres")
        .max(20, "Máximo 20 caracteres"),
    zipCode: yup
        .string()
        .required("Este campo es requerido")
        .matches(/^\d{6}$/, "El código postal debe tener exactamente 6 dígitos"),
    cardNumber: yup
        .string()
        .required("Este campo es requerido")
        .matches(/^\d{12}$/, "El código postal debe tener exactamente 12 dígitos"),
    cardName: yup
        .string()
        .required("Este campo es requerido")
        .min(3, "Mínimo 3 caracteres")
        .max(30, "Máximo 20 caracteres"),
    expirationDate: yup
        .string()
        .required("Este campo es requerido")
        .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Deben ser 4 digitos los 2 para el mes (01-12) y 2 para el año 00-99 Ej: 12/24"),
    cvc: yup
        .string()
        .required("Este campo es requerido")
        .matches(/^\d{3}$/, "El código postal debe tener exactamente 3 dígitos"),
});