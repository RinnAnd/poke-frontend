import { FC } from "react";
import { InputWithLabel } from "./InputLabel";
import { Button } from "./ui/button";
import { useQueries } from "@/hooks/useQueries";
import { useNavigate } from "react-router-dom";

interface SignupProps {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const Signup: FC<SignupProps> = ({ setLogin }) => {
  const { signup, login } = useQueries();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const name = e.currentTarget.fullname.value;
    const username = e.currentTarget.username.value;
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    const res = await signup(name, username, email, password);
    if (res.status === 409) {
      alert("User already exists");
      return;
    }
    const loginRes = await login(email, password);
    localStorage.setItem("user", JSON.stringify(loginRes.data));
    navigate("/home");
  }

  return (
    <div className="bg-black border border-zinc-700 rounded-xl w-96 h-[500px] flex flex-col items-center justify-evenly">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-medium">Signup</h1>
        <p className="text-zinc-500 text-sm">Create a new account</p>
      </div>
      <form
        className="flex flex-col items-center w-5/6 gap-4"
        onSubmit={handleSubmit}
      >
        <InputWithLabel
          label="Name"
          type="text"
          id="fullname"
          placeholder="e.g John Doe"
        />
        <InputWithLabel
          label="Username"
          type="text"
          id="username"
          placeholder="Enter your username"
        />
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
          Register
        </Button>
      </form>
      <div className="flex items-center">
        <p className="text-zinc-500">Already have an account?</p>
        <Button
          variant="link"
          className="text-white"
          onClick={() => setLogin(true)}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default Signup;
