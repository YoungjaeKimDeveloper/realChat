import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const SignUpPage = () => {
  const { signUp, isSigningUp } = useAuthStore();
  const [showPassword, setShowPassword] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    password: "",
  });
  return <div>SignUpPage</div>;
};

export default SignUpPage;
