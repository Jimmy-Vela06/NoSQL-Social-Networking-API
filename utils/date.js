//TIMESTAMP FORMAT

// creates suffix for day of the month, ex: 1"st" 23"rd"
const date_Suffix = (date) => {
  let day = date.toString();

  const lastChar = day.charAt(dateStr.length - 1);

  if (day === "1" && day !== "11") {
    day = `${day}st`;
  } else if (lastChar === "2" && day !== "12") {
    day = `${day}nd`;
  } else if (lastChar === "3" && day !== "13") {
    day = `${day}rd`;
  } else {
    day = `${day}th`;
  }
  return day;
};

module.exports = (
  timestamp,
  { monthLength = "short", dateSuffix = true } = {}
) => {
  const month = {
    0: monthLength === "short" ? "Jan" : "January",
    1: monthLength === "short" ? "Feb" : "February",
    2: monthLength === "short" ? "Mar" : "March",
    3: monthLength === "short" ? "Apr" : "April",
    4: monthLength === "short" ? "May" : "May",
    5: monthLength === "short" ? "Jun" : "June",
    6: monthLength === "short" ? "Jul" : "July",
    7: monthLength === "short" ? "Aug" : "August",
    8: monthLength === "short" ? "Sep" : "September",
    9: monthLength === "short" ? "Oct" : "October",
    10: monthLength === "short" ? "Nov" : "November",
    11: monthLength === "short" ? "Dec" : "December",
  };

  const dateObject = new Date(timestamp);

  const monthStamp = month[dateObject.getMonth()];

  const dayStamp = dateSuffix
    ? date_Suffix(dateObject.getDate())
    : dateObject.getDate();

  const year = dateObject.getFullYear();

  let hour =
    dateObject.getHours() > 12
      ? Math.floor(dateObject.getHours() - 12)
      : dateObject.getHours();

  if (hour === 0) {
    hour = 12;
  }

  const minutes =
    (dateObject.getMinutes() < 10 ? "0" : " ") + dateObject.getMinutes();

  const am_pm = dateObject.getHours() >= 12 ? "pm" : "am";

  const formattedTimeStamp = `${monthStamp} ${dayStamp}, ${year} at ${hour}:${minutes} ${am_pm}`;

  return formattedTimeStamp;
};
