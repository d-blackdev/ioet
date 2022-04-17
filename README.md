## IOET TASK

# Task Overview

The was solved by breaking down each context in to bits.

- The first step was to separate the days into a variable **firstDays** and **secondDays**
- Also get the ranges for both week days and weekends
- I created a function to spilt the given input into the name and schedules into the format below.
  RENE [
  { day: 'MO', start: '10:00', s: 600, end: '12:00', e: 720 },
  { day: 'TU', start: '10:00', s: 600, end: '12:00', e: 720 },
  { day: 'TH', start: '01:00', s: 60, end: '03:00', e: 180 },
  { day: 'SA', start: '14:00', s: 840, end: '18:00', e: 1080 },
  { day: 'SU', start: '20:00', s: 1200, end: '21:00', e: 1260 }
  ]
  where RENE is the name and the array of schedules.
- Also created a function to convert the time to hour format.

- A function **getPayForSchedules** was created to determine the range in which each schedules belongs to and also to check if there is overtime work done ,which then calculates the pay based on the range.

## Running the app

In the project directory, you can run:

# node ioet.js
