import { useSelector } from "react-redux";
import LoadingIndicator from "../loadingIndicator";
import { loadingSelector } from "../../../store/selectors";

const Main = ({ children = null }) => {
  const isLoading = useSelector(loadingSelector);

  return (
    <main className="te_cmp_Main">
      {children}
      <LoadingIndicator />
    </main>
  );
};

export default Main;
