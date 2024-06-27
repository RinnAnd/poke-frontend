import { useNavigate } from "react-router-dom";
import { ExitIcon } from "@radix-ui/react-icons";

const Logout = () => {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("user");
    navigate("/");
  }

  return (
    <button
      onClick={logout}
      className="bg-zinc-800 text-xs rounded-full w-fit p-2 hover:bg-zinc-600 transition-all"
    >
      <ExitIcon />
    </button>
  );
};

export default Logout;
