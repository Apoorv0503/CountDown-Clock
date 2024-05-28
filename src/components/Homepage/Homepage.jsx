import React, { useState, useEffect } from "react";
import InputForm from "../InputForm/InputForm";
import CountdownTimer from "../CountdownTimer/CountdownTimer";
import "./Homepage.css";

const HomePage = () => {
  // const [targetDateTime, setTargetDateTime] = useState("default");
  const [isCountDownActive, setIsCountDownActive] = useState(false);
  const [countdownData, setCountdownData] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    message: "",
  });
  const [intervalId, setIntervalId] = useState(null);

  const startCountdown = (targetDateTime) => {
    clearInterval(intervalId); // Clear any existing intervals
    const interval = setInterval(() => {
      const now = new Date(); //current date and time
      const target = new Date(targetDateTime); //user input date and time

      if (target > now) {
        const distance = target - now; //this time difference will be in miliseconds
        //from these miliseconds you need to tell, how many days, hours, min and seconds are there in this.

        const days = Math.floor(distance / (1000 * 60 * 60 * 24)); //miliseconds to days

        //abhi distance miliseconds me jitne din nikl gye wo htao, and remainder is remaining miliseconds , now convert then to get remaining hours.
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );

        //to get minutes, jitne ghnte nikl jae wo poora hta do, and convert reaminder to minutes
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (days <= 99 && hours <= 23 && minutes <= 59 && seconds <= 59) {
          setIsCountDownActive(true);
          setCountdownData({ days, hours, minutes, seconds, message: "" });
        } else {
          setCountdownData({
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            message: "Selected time is more than 100 days",
          });
        }
      } else {
        setIsCountDownActive(false);
        setCountdownData({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          message:
            "🎉 The countdown is over! What's next on your adventure? 🎉",
        });
        clearInterval(interval);
      }
    }, 1000);
    setIntervalId(interval);
  };

  useEffect(() => {
    // Cleanup on component unmount
    return () => clearInterval(intervalId);
  }, [intervalId]);

  const handleDateSelect = (date) => {
    startCountdown(date);
  };

  const cancelTimer = () => {
    clearInterval(intervalId);
    setIsCountDownActive(false);

    // back to initial state
    setCountdownData({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      message: "",
    });
  };

  return (
    <div className="home-container">
      <h1 className="heading">
        Countdown <span className="highlight">Timer</span>
      </h1>
      <InputForm
        isCountDownActive={isCountDownActive}
        onDateSelect={handleDateSelect}
        onCancel={cancelTimer}
      />
      <CountdownTimer countdownData={countdownData} />
    </div>
  );
};

export default HomePage;
