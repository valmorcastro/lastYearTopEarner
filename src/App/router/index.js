import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "../UI/pages";

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" Component={Home} exact></Route>
    </Routes>
  </Router>
);

export default AppRouter;
