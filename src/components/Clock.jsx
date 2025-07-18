import { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState("");

  const getTime = () => {
    const currentTime = new Date();
    const koreaTime = currentTime.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    setTime(koreaTime);
  };

  useEffect(() => {
    getTime();
    const updateTime = setInterval(getTime, 1000);
    return () => clearInterval(updateTime);
  }, []);

  const [hour, minute, second] = time.split(":");

  return (
    <div className="flex justify-end items-center text-sm text-gray-500 gap-2">
      <span className="font-medium">현재 시각 :</span>
      <span className="font-mono">
        {hour}시 {minute}분 {second}초
      </span>
    </div>
  );
}
