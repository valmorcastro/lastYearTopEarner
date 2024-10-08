import classNames from "classnames";
import Notification from "../notification";
import { notificationsSelector } from "../../../store/selectors";
import ToastContainer from "react-bootstrap/ToastContainer";
import { useSelector } from "react-redux";

const NotificationsContainer = ({ className = null }) => {
  const notifications = useSelector(notificationsSelector);

  return (
    <ToastContainer className={classNames("te_cmp_NotificationsContainer", className)}>
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
