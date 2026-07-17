import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";
import { useAuth } from "../../context/AuthContext";

const passwordRules = Yup.string()
  .min(8, "Must be at least 8 characters")
  .matches(/[a-z]/, "Must include a lowercase letter")
  .matches(/[A-Z]/, "Must include an uppercase letter")
  .matches(/[0-9]/, "Must include a number")
  .matches(/[^a-zA-Z0-9]/, "Must include a symbol")
  .required("Password is required");

const signUpSchema = Yup.object({
  fullName: Yup.string().trim().required("Full name is required"),
  email: Yup.string().email("Enter a valid email").required("Email is required"),
  password: passwordRules,
});

export function SignUpScreen() {
  const navigate = useNavigate();
  const {signup} = useAuth();

  const formik = useFormik({
    initialValues: {fullName: "", email: "", password: ""},
    validationSchema: signUpSchema,
    onSubmit: async (mapValues, {setSubmitting}) => {
      try {
        await signup(mapValues.fullName, mapValues.email, mapValues.password);
        navigate("/select-grade");
      } catch (error) {
        console.error("Sign up failed:", error);
      } finally {
        setSubmitting(false);
      }
    },
  })


  return (
    <div className="flex flex-col gap-5 h-screen items-center justify-center bg-amber-50 px-6">
      <div className="flex flex-col gap-1 w-full sm:w-[50vw] items-center text-center">
        <h1 className="text-2xl font-bold">Sign Up</h1>
        <p className="text-gray-600">Create an account</p>
      </div>

      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3 w-full sm:w-[50vw]">
        <TextInput 
           label="Full Name" 
           value={formik.values.fullName} 
           onChange={(value) => formik.setFieldValue("fullName", value)} 
           placeholder="Your full name"
           error={formik.touched.fullName ? formik.errors.fullName : undefined}
        />
        <TextInput 
           label="Email"
           type="email" 
           value={formik.values.email} 
           onChange={(value) => formik.setFieldValue("email", value)} 
           placeholder="you@example.com"
            error={formik.touched.email ? formik.errors.email : undefined}
        />
        <TextInput
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={(value) => formik.setFieldValue("password", value)}
          placeholder="••••••••"
           error={formik.touched.password ? formik.errors.password : undefined}
        />

        <Button type="submit" disabled={formik.isSubmitting} styles="bg-orange-400 text-amber-50">
          CREATE ACCOUNT
        </Button>

        <p className="text-center text-sm text-gray-500 uppercase">or continue with</p>

        <Button type="button" styles="bg-white border border-gray-300 text-gray-700">
          Continue with Google
        </Button>
        <Button type="button" styles="bg-black text-white">
          Continue with Apple
        </Button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <span
            className="text-orange-500 font-medium cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}