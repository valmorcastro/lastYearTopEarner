import { useCallback, useEffect, useRef, useState } from "react";
import { FaBell } from "react-icons/fa";
import { removeNotification } from "../../../store/reducer/client";
import Toast from "react-bootstrap/Toast";
import { useDispatch } from "react-redux";

const QUARTER_MINUTE = 15;
const SECOND = 1000;
const MINUTE = 60 * SECOND;
const TIMER_INTERVAL = QUARTER_MINUTE * SECOND;
const DELAY = 5 * TIMER_INTERVAL;

const Notification = ({ id, timeStamp, title, text, variant }) => {
  let timerInterval = useRef(null);
  const [now, setNow] = useState(new Date().getTime());
  const dispatch = useDispatch();

  const dismissNotification = () => {
    dispatch(removeNotification(id));
  };

  const renderDate = (id, timeStamp) => {
    const date = new Date(timeStamp).getTime();
    const timeDiff = now - date;
    const minutes = parseInt(Math.floor(timeDiff / MINUTE), 10);

    if (minutes < 1) {
      const seconds = parseInt(timeDiff / SECOND, 10);
      const quarters = parseInt(Math.floor(seconds / QUARTER_MINUTE), 10);

      return quarters < 1
        ? "just now"
        : quarters === 2
        ? "half min ago"
        : `${quarters * QUARTER_MINUTE}s ago`;
    }

    return `${minutes} min ago`;
  };

  const startTimer = useCallback(
    () =>
      (timerInterval.current = setInterval(() => {
        setNow(new Date().getTime());
      }, TIMER_INTERVAL)),
    []
  );

  const stopTimer = useCallback(() => clearInterval(timerInterval.current), []);

  useEffect(() => {
    startTimer();

    return () => {
      stopTimer();
    };
  }, []);

  return (
    <Toast
      bg={variant}
      text={"white"}
      key={`notification-${id}`}
      show={true}
      onClose={() => dismissNotification(id)}
      delay={DELAY}
      className="te_cmp_Notification"
      autohide
    >
      <div className="bg-fade bg-white bg-opacity-25">
        <Toast.Header>
          <FaBell />
          &nbsp;
          <strong className="me-auto">{title}</strong>
          <small className="text-muted">{renderDate(id, timeStamp)}</small>
        </Toast.Header>
        <Toast.Body
          className={variant === "warning" ? "text-black" : "text-white"}
        >
          {text}
        </Toast.Body>
      </div>
    </Toast>
  );
};

export default Notification;
