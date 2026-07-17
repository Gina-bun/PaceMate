import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";
import { useAuth } from "../../context/AuthContext";


const loginSchema = Yup.object({
  email: Yup.string().email("Enter a valid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export function LoginScreen() {
  const navigate = useNavigate();
  const {login} = useAuth();

  const formik = useFormik({
    initialValues: {email: "", password: ""},
    validationSchema: loginSchema,
    onSubmit: async (values, {setSubmitting}) => {
        try {
          await login(values.email, values.password);
          navigate("/dashboard");
        } catch (error) {
          console.error("Login failed:", error);
        } finally {
          setSubmitting(false);
        }
    },
  });

  return (
    <div className="flex flex-col gap-5 h-screen items-center justify-center bg-amber-50 px-6">
      <div className="flex flex-col gap-1 w-full sm:w-[50vw] items-center text-center">
        <h1 className="text-2xl font-bold">Login</h1>
        <p className="text-gray-600">Welcome back!</p>
      </div>

      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3 w-full sm:w-[50vw]">
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
          LOGIN
        </Button>

        <p className="text-center text-sm text-gray-500 uppercase">or continue with</p>

        <Button type="button"  styles="bg-white border border-gray-300 text-gray-700">
          Continue with Google
        </Button>
        <Button type="button" styles="bg-black text-white">
          Continue with Apple
        </Button>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <span
            className="text-orange-500 font-medium cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
}