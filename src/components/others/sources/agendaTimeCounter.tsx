import { counterType } from "@/@types";
import { TimeSlot } from "@/api";
import { SEC_MIN } from "@/common/constants";
import { Wording, calculateTimeLeft, isValidDateString } from "@/lib";
import { useEffect, useState } from "react";
const COUNTER_INIT: counterType = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

interface AgendaTimeCounterProps extends TimeSlot {}

export function AgendaTimeCounter({ dateTimeTo }: AgendaTimeCounterProps) {
  const [timeLeft, setTimeLeft] = useState<counterType>(COUNTER_INIT);
  const isValidDate = dateTimeTo != null && isValidDateString(dateTimeTo);
  
  useEffect(() => {
    if (isValidDate) {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft(dateTimeTo));
      }, SEC_MIN);
      return () => clearInterval(timer);
    }
  }, [dateTimeTo]);

  if (isValidDate) {
    return (
      <div className="flex items-center justify-between">
        <AgendaCounterItem data={timeLeft.days} label={Wording.days} />
        <span className="text-gray-600 text-4xl -translate-y-2">:</span>
        <AgendaCounterItem data={timeLeft.hours} label={Wording.hours} />
        <span className="text-gray-600 text-4xl -translate-y-2">:</span>
        <AgendaCounterItem data={timeLeft.minutes} label={Wording.minutues} />
        <span className="text-gray-600 text-4xl -translate-y-2">:</span>
        <AgendaCounterItem data={timeLeft.seconds} label={Wording.seconds} />
      </div>
    );
  }
  return null;
}

const AgendaCounterItem = (props: { data: number; label: string }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <span className="text-4xl text-gray-900">{props.data}</span>
      <span className="text-3xs uppercase text-gray-600">{props.label}</span>
    </div>
  );
};
