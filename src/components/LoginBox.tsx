import { FC } from "react";

import { InputWithLabel } from "./InputLabel";
import { Button } from "./ui/button";
import { useQueries } from "@/hooks/useQueries";
import { useNavigate } from "react-router-dom";

interface LoginBoxProps {}

const LoginBox: FC<LoginBoxProps> = () => {
  const { login } = useQueries();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    const res = await login(email, password);
    if (res.status === 404) {
      alert("User not found");
      return;
    }
    if (res.status === 401) {
      alert("Invalid password");
      return;
    }
    localStorage.setItem("user", JSON.stringify(res.data));
    navigate("/home");
  }

  return (
    <div className="bg-black border border-zinc-700 rounded-xl w-96 h-[500px] flex flex-col items-center justify-evenly">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-medium">Login</h1>
        <p className="text-zinc-500">Into your account</p>
      </div>
      <form
        className="flex flex-col items-center w-5/6 gap-7"
        onSubmit={handleSubmit}
      >
        <InputWithLabel
          label="Email"
          type="email"
          id="email"
          placeholder="example@mail.com"
        />
        <InputWithLabel
          label="Password"
          type="password"
          id="password"
          placeholder="Enter your password"
        />
        <Button type="submit" className="w-full" variant="secondary">
          Login
        </Button>
      </form>
      <div className="flex items-center">
        <p className="text-zinc-500">Don't have an account?</p>
        <Button variant="link" className="text-white">
          Register
        </Button>
      </div>
    </div>
  );
};

export default LoginBox;
