import { loadingSelector } from "../../../store/selectors";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import { useSelector } from "react-redux";

const LoadingIndicator = () => {
  const isLoading = useSelector(loadingSelector);

  return (
    <Modal show={isLoading} centered>
      <Modal.Body className="">
        <div className="d-flex align-items-center justify-content-center py-3">
          <Spinner /> <div className="mx-3">Loading...</div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoadingIndicator;
