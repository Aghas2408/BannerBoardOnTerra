import { useState, useEffect } from "react";

import "./styles.scss";

export default function Timer({ futureDate }) {
  const [deadline, setDeadline] = useState();
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const getTime = () => {
    const time = Date.parse(deadline) - Date.now();

    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    const isDeadline = deadline && typeof deadline === "object";
    if (!isDeadline) return;
    const interval = setInterval(() => getTime(deadline), 1000);
    return () => clearInterval(interval);
  }, [deadline]);

  useEffect(() => {
    setDeadline(futureDate);
  }, [futureDate]);

  return (
    <div className="timer-box">
      <p>
        {hours}
        <span>Hours</span>
      </p>
      <p>
        {minutes}
        <span>Minutes</span>
      </p>
      <p>
        {seconds}
        <span>Seconds</span>
      </p>
    </div>
  );
}
