import { Provider } from "react-redux";
import AppRouter from "./router";
import store from "./store";

const App = () => (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

export default App;
