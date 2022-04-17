const input1 =
  "RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00";

const input2 = "ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00";

const firstDays = ["MO", "TU", "WE", "TH", "FR"];
const secondDays = ["SA", "SU"];

const firstRanges = [
  { s: 1, e: 540, d: 539, c: 25 },
  { s: 541, e: 1080, d: 539, c: 15 },
  { s: 1081, e: 1440, d: 359, c: 20 },
];
const secondRanges = [
  { s: 1, e: 540, d: 539, c: 30 },
  { s: 541, e: 1080, d: 539, c: 20 },
  { s: 1081, e: 1440, d: 359, c: 25 },
];

const separateComponents = (input) => {
  const name = input.split("=")[0];
  let schedules = input.split("=")[1];
  if (schedules) {
    schedules = schedules.split(",").map((i) => {
      return {
        day: i.slice(0, 2),
        start: i.slice(2).split("-")[0],
        s: convertTimeToHourFormat(i.slice(2).split("-")[0]),
        end: i.slice(2).split("-")[1],
        e: convertTimeToHourFormat(i.slice(2).split("-")[1]),
      };
    });
  }
  console.log(name, schedules);
  return {
    name,
    schedules,
  };
};
const convertTimeToHourFormat = (time) => {
  const hour = time.split(":")[0];
  const minute = time.split(":")[1];

  return Number(hour * 60) + Number(minute);
};

const getPayForSchedules = (input) => {
  let pay = 0;
  const calculatePayForAScheduleInFirstRanges = (Ri) => {
    for (let index = 0; index < firstRanges.length; index++) {
      const R = firstRanges[index];
      if (Ri.s >= R.s && R.e >= Ri.s) {
        if (Ri.e > R.e) {
          //if there are overtime
          if (Ri.s + hr < Ri.e) {
            //New range
            // const Rn = { s: Ri.s + hr + 1, e: Ri.e };
            if (firstDays.includes(Ri.day)) {
              calculatePayForAScheduleInFirstRanges({
                s: Ri.s + hr + 1,
                e: Ri.e,
              });
            }
          }
        } else {
          const hr = Ri.e - Ri.s;
          const cost = hr * R.c;
          pay += cost;
        }
      }
    }
  };
  const calculatePayForAScheduleInSecondRanges = (Ri) => {
    for (let index = 0; index < secondRanges.length; index++) {
      const R = secondRanges[index];
      if (Ri.s >= R.s && R.e >= Ri.s) {
        if (Ri.e > R.e) {
          const hr = R.e - Ri.s;
          const cost = hr * R.c;
          pay += cost;

          //if there are overtime
          if (Ri.s + hr < Ri.e) {
            //New range
            // const Rn = { s: Ri.s + hr + 1, e: Ri.e };
            if (firstDays.includes(Ri.day)) {
              calculatePayForAScheduleInSecondRanges({
                s: Ri.s + hr + 1,
                e: Ri.e,
              });
            }
          }
        } else {
          const hr = Ri.e - Ri.s;
          const cost = hr * R.c;
          pay += cost;
        }
      }
    }
  };
  const name = separateComponents(input).name;
  const schedules = separateComponents(input).schedules;

  for (let index = 0; index < schedules.length; index++) {
    const schedule = schedules[index];
    if (firstDays.includes(schedule.day)) {
      calculatePayForAScheduleInFirstRanges(schedule);
    }
    if (secondDays.includes(schedule.day)) {
      calculatePayForAScheduleInSecondRanges(schedule);
    }
  }

  return { name, pay: pay / 60 };
};

console.log("getPayForSchedules", getPayForSchedules(input1));
console.log("getPayForSchedules", getPayForSchedules(input2));
