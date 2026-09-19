import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import Dash from "./Dash";
import Login from "./Login";

export default function App() {
  return (
    <>
      {/* <Login />
      <Dash /> */}

      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Dash />} />
        </Routes>
      </Router>
    </>
  );
}
