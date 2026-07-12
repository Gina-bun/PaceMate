
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";
import { useAuth } from "../../context/AuthContext";

export function SignUpScreen() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {signup} = useAuth();

  const handleSignUp = async () => {
    try {
      await signup(fullName, email, password);
      navigate("/select-grade");
    } catch (error) {
      console.error("Sign up failed:", error);
    }
    
  };

  return (
    <div className="flex flex-col gap-5 h-screen items-center justify-center bg-amber-50 px-6">
      <div className="flex flex-col gap-1 w-full sm:w-[50vw] items-center text-center">
        <h1 className="text-2xl font-bold">Sign Up</h1>
        <p className="text-gray-600">Create an account</p>
      </div>

      <div className="flex flex-col gap-3 w-full sm:w-[50vw]">
        <TextInput label="Full Name" value={fullName} onChange={setFullName} placeholder="Your full name" />
        <TextInput label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" />
        <TextInput
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="••••••••"
          helperText="Between 8 and 22 characters"
        />

        <Button type="button" onClick={handleSignUp} styles="bg-orange-400 text-amber-50">
          CREATE ACCOUNT
        </Button>

        <p className="text-center text-sm text-gray-500 uppercase">or continue with</p>

        <Button type="button" onClick={() => {}} styles="bg-white border border-gray-300 text-gray-700">
          Continue with Google
        </Button>
        <Button type="button" onClick={() => {}} styles="bg-black text-white">
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
      </div>
    </div>
  );
}