import Notification from "../notification";
import { notificationsSelector } from "../../../store/selectors";
import ToastContainer from "react-bootstrap/ToastContainer";
import { useSelector } from "react-redux";

const NotificationsContainer = () => {
  const notifications = useSelector(notificationsSelector);

  return (
    <ToastContainer className="te_cmp_NotificationsContainer">
      {notifications.map((notification) => (
        <Notification
          key={`notification-${notification.id}`}
          {...notification}
        />
      ))}
    </ToastContainer>
  );
};

export default NotificationsContainer;
