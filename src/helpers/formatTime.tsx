const getMinutes = (time: number) =>
  Math.floor((time % 360000) / 6000)
    .toString()
    .padStart(2, "0");
const getSeconds = (time: number) =>
  Math.floor((time % 6000) / 100)
    .toString()
    .padStart(2, "0");
const getMilliseconds = (time: number) =>
  (Math.floor(time) % 100).toString().padStart(2, "0");

type TimeAndModifiers = {
  timer: number;
  pickupCharge?: number;
  holdPrice?: number;
  rejectionPenalty?: number;
};

const calculateTotalTime = ({
  timer,
  pickupCharge = 0,
  holdPrice = 0,
  rejectionPenalty = 0,
}: TimeAndModifiers) => {
  // UPDATE MATH AS NEEDED
  const pickupPenalty = (pickupCharge / 50) * 30;
  const holdBonus = (holdPrice / 1000) * 2;
  const rejectionAdjustment = rejectionPenalty * 1;
  return timer + pickupPenalty - holdBonus + rejectionAdjustment;
};

const formatTime = (time: number) =>
  `${getMinutes(time)}:${getSeconds(time)}:${getMilliseconds(time)}`;

export {
  calculateTotalTime,
  formatTime,
  getMinutes,
  getSeconds,
  getMilliseconds,
};
