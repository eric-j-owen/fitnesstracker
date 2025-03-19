import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

interface SignUpFormState {
  firstName: string;
  email: string;
  passwordRaw: string;
  confirmPassword: string;
}

const registerUser = async (data: SignUpFormState) => {
  const response = await fetch("http://localhost:3000/api/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

export default function Form() {
  const [formData, setFormData] = useState<SignUpFormState>({
    firstName: "",
    email: "",
    passwordRaw: "",
    confirmPassword: "",
  });

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      setFormData({
        firstName: "",
        email: "",
        passwordRaw: "",
        confirmPassword: "",
      });
      alert("Registration successful!");
    },
    onError: (error) => {
      alert(error);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {mutation.isPending && <div>Loading...</div>}
      {mutation.isError && <div>Error: {mutation.error.message}</div>}
      <div>
        <label htmlFor="firstName">First Name: </label>
        <input
          type="text"
          name="firstName"
          id="fname"
          onChange={handleChange}
          value={formData.firstName}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={handleChange}
          value={formData.email}
          required
        />
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="passwordRaw"
            id="passwordRaw"
            onChange={handleChange}
            value={formData.passwordRaw}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password: </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            onChange={handleChange}
            value={formData.confirmPassword}
            required
          />
        </div>
      </div>
      <button>Sign up</button>
    </form>
  );
}
