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
  const pickupPenalty = pickupCharge <= 0 ? 0 : 3000;
  const holdBonus = holdPrice / 10;
  const rejectionAdjustment = rejectionPenalty / 5;
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
