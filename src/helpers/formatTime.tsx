const getMinutes = (time: number) =>
  Math.floor((time % 360000) / 6000)
    .toString()
    .padStart(2, "0");
const getSeconds = (time: number) =>
  Math.floor((time % 6000) / 100)
    .toString()
    .padStart(2, "0");
const getMilliseconds = (time: number) =>
  (time % 100).toString().padStart(2, "0");

export { getMinutes, getSeconds, getMilliseconds };
