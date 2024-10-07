import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaBell } from "react-icons/fa";
import { notificationsSelector } from "../../../store/selectors";
import { removeNotification } from "../../../store/reducer/client";
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";

const QUARTER_MINUTE = 15;
const THREE_QUARTER_MINUTE = 45;
const TIMER_INTERVAL = 10000;

const NotificationsContainer = () => {
  const [now, setNow] = useState(new Date().getTime());
  let timerInterval = useRef(null);

  const notifications = useSelector(notificationsSelector);
  const dispatch = useDispatch();

  const handleDismissNotification = (notificationId) => {
    if (
      notificationId &&
      notifications.find(({ id }) => id === notificationId)
    ) {
      dispatch(removeNotification(notificationId));
    }
  };

  const removeOldNotifications = useCallback(() => {
    notifications.forEach(({ id, timeStamp }) => {
      const date = new Date(timeStamp).getTime();
      const timeDiff = now - date;
      if (timeDiff > 60000) {
        dispatch(removeNotification(id));
      }
    });
  }, [dispatch, notifications, now]);

  const renderDate = (id, timeStamp) => {
    const date = new Date(timeStamp).getTime();
    const timeDiff = now - date;
    const minutes = parseInt(Math.floor(timeDiff / 60000), 10);

    if (minutes <= 1) {
      const seconds = parseInt(timeDiff / 1000, 10);

      const aboutHalfMinute =
        seconds > THREE_QUARTER_MINUTE ? "a minute ago" : "half a minute ago";

      return seconds <= QUARTER_MINUTE ? "just now" : aboutHalfMinute;
    }

    return `${minutes} minute(s) ago`;
  };

  const renderNotifications = () =>
    notifications.map(({ id, variant, timeStamp, title, text }) => (
      <Toast
        bg={variant}
        key={`notification-${id}`}
        show={true}
        onClose={() => handleDismissNotification(id)}
        className="bg-opacity-75"
      >
        <Toast.Header>
          <FaBell />
          &nbsp;
          <strong className="me-auto">{title}</strong>
          <small className="text-muted">{renderDate(id, timeStamp)}</small>
        </Toast.Header>
        <Toast.Body className={variant === "Dark" && "text-white"}>
          {text}
        </Toast.Body>
      </Toast>
    ));

  const stopDateMonitor = () => clearInterval(timerInterval.current);

  const startDateMonitor = () => {
    timerInterval.current = setInterval(() => {
      setNow(new Date().getTime());
    }, TIMER_INTERVAL);
  };

  useEffect(() => {
    startDateMonitor();

    return stopDateMonitor;
  }, []);

  useEffect(() => {
    removeOldNotifications();
  }, [now, removeOldNotifications]);

  return (
    <ToastContainer className="te_cmp_NotificationsContainer">
      {renderNotifications()}
    </ToastContainer>
  );
};

export default NotificationsContainer;
