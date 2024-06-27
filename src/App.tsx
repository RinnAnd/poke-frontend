import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./views/Login";
import Home from "./views/Home";
import AllPokemons from "./views/AllPokemons";
import Trade from "./views/Trade";
import SessionCheck from "./utils/session";
import MyOffers from "./views/MyOffers";

function App() {
  return (
    <Router>
      <SessionCheck />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/pokemons" element={<AllPokemons />} />
        <Route path="/trading" element={<Trade />} />
        <Route path="/my-offers" element={<MyOffers />} />
        <Route path="*" element={<h1>404 not found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
