import { FC, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SessionCheck: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const session = {
      user: localStorage.getItem("user"),
    };

    if (location.pathname === "/" && session.user) {
      navigate("/home");
    } else if (location.pathname !== "/" && !session.user) {
      navigate("/");
    }
  }, [navigate, location.pathname]);

  return null;
};

export default SessionCheck;
