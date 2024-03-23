import * as Yup from "yup"

export const SignUpSchema = Yup.object({
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().min(4).max(10).required("Please enter your password"),
    confirm_password: Yup.string().required().oneOf([Yup.ref("password"),null],"Password and confirm password should be same"),
})

export const SignInSchema = Yup.object({
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().min(4).max(10).required("Please enter your password"),
})
export const AddPolicySchema = Yup.object({
    policy_name: Yup.string().min(3).max(45).required("Please enter policy name."),
    policy_price: Yup.number().moreThan(0).required("Please enter policy price."),
    policy_description: Yup.string().required("Please provide policy description.")
})