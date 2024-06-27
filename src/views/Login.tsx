import LoginBox from "@/components/LoginBox";
import Signup from "@/components/Signup";
import { FC, useState } from "react";

interface LoginProps {}

const Login: FC<LoginProps> = () => {
  const [login, setLogin] = useState<boolean>(true);
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-6 mt-[-4rem]">
      <h1 className="text-4xl">Global Pokémon Trade System App</h1>
      {login ? (
        <LoginBox setLogin={setLogin} />
      ) : (
        <Signup setLogin={setLogin} />
      )}
    </div>
  );
};

export default Login;
