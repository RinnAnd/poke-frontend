import LoginBox from "@/components/LoginBox";
import { FC } from "react";

interface LoginProps {}

const Login: FC<LoginProps> = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <LoginBox />
    </div>
  );
};

export default Login;
