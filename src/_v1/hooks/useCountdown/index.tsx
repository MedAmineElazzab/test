import React, { useState, useEffect } from "react";
import { format, differenceInMilliseconds } from "date-fns";

const useCountdown = (targetDate: string) => {
  const [timeRemaining, setTimeRemaining] = useState<any | undefined>(
    undefined
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  function calculateTimeRemaining() {
    const now = new Date();
    const target = new Date(targetDate);
    const difference = differenceInMilliseconds(target, now);

    if (difference <= 0) {
      // Target date has passed
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  return { timeRemaining };
};

export default useCountdown;
