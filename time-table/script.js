const START_HOUR = 8;
const HOUR_HEIGHT = 80;
const TIME_COL = 80;
const DAY_WIDTH = 200;

const times = ["8am","9am","10am","11am","12pm","1pm","2pm","3pm","4pm","5pm"];

const grid = document.getElementById("grid");
const eventsLayer = document.getElementById("events");



/* Build grid */
times.forEach(t => {
  const timeCell = document.createElement("div");
  timeCell.className = "time-label";
  timeCell.textContent = t;
  grid.appendChild(timeCell);

  for (let i = 0; i < 5; i++) {
    grid.appendChild(document.createElement("div"));
  }
});

/* Events data */
const events = [
  {subject: "MTH210", day: 0, start: 10, end: 10.83, room: "L5"},
  {subject: "MTH418", day: 0, start: 14, end: 14.83, room: "L4"},
  {subject: "MTH212M", day: 0, start: 15.50,end: 16.75, room: "L4", type: "modular", slot: 0, slots: 2}, // 3:30 -> 30/60=50 so 15.50 same for 45/60
  {subject: "MTH313M", day: 0, start: 15.50,end: 16.75, room: "L4", type: "modular", slot: 1, slots: 2},
  {subject: "MTH309", day: 1, start: 11, end: 11.83, room: "L13"},
  {subject: "MTH418", day: 1, start: 14, end: 14.83, room: "L4"},
  {subject: "MTH209", day: 1, start: 17.25, end: 18, room: "L5"},
  {subject: "MTH210", day: 2, start: 10, end: 10.83, room: "TBD"},
  {subject: "MTH309", day: 2, start: 11, end: 11.83, room: "L13"},
  {subject: "MTH209", day: 2, start: 14, end: 14.83, room: "TBD"},
  {subject: "MTH212M", day: 2, start: 15.50,end: 16.75, room: "L4", type: "modular", slot: 0, slots: 2},
  {subject: "MTH313M", day: 2, start: 15.50,end: 16.75, room: "L4", type: "modular", slot: 1, slots: 2},
  {subject: "MTH418", day: 3, start: 9, end: 9.83, room: "L2"},
  {subject: "MTH210", day: 3, start: 10, end: 10.83, room: "L5"},
  {subject: "MTH309", day: 3, start: 11, end: 11.83, room: "L13"},
  {subject: "MTH209", day: 3, start: 14, end: 14.83, room: "TBD"},
  {subject: "MTH210", day: 4, start: 10, end: 10.83, room: "L5"},
  {subject: "MTH309", day: 4, start: 11, end: 11.83, room: "L13"},
  {subject: "MTH212M", day: 4, start: 12,end: 12.83, room: "L4", type: "modular", slot: 0, slots: 2},
  {subject: "MTH313M", day: 4, start: 12,end: 12.83, room: "L4", type: "modular", slot: 1, slots: 2},
  {subject: "MTH418", day: 4, start: 14, end: 14.83, room: "L4"},  
];

const SUBJECTS = {
  MTH309: {
    code: "MTH309",
    fullName: "Probability theory",
    prof: "Soumyarup Sadhukhan",
    profile: "https://www.iitk.ac.in/soumyarup-sadhukhan",
  },
  MTH418: {
    code: "MTH418",
    fullName: "Inference - I",
    prof: "Neeraj Misra ",
    profile: "https://www.iitk.ac.in/neeraj-misra",
  },
  MTH210: {
    code: "MTH210",
    fullName: "Statistical Computing",
    prof: "Debasis Kundu",
    profile: "https://www.iitk.ac.in/debasis-kundu",
  },
  MTH212M: {
    code: "MTH212M",
    fullName: "Stochastic Processes - I",
    prof: "Suprio Bhar",
    profile: "https://www.iitk.ac.in/suprio-bhar"
  },
  MTH313M: {
    code: "MTH313M",
    fullName: "Stochastic Processes - II",
    prof: "Suprio Bhar",
    profile: "https://www.iitk.ac.in/suprio-bhar"
  },
  MTH209: {
    code: "MTH209",
    fullName: "Data Science",
    prof: "Dootika Vats",
    profile: "https://www.iitk.ac.in/dootika-vats"
  }
};




/* Render events */
/*events.forEach(e => {
  const div = document.createElement("div");
  div.className = "event";
  div.className = "event" + (e.type === "modular" ? " modular" : "");

  div.style.top =
    (e.start - START_HOUR) * HOUR_HEIGHT + "px";

  div.style.left =
    TIME_COL + e.day * DAY_WIDTH + 10 + "px";

  div.style.height =
    (e.end - e.start) * HOUR_HEIGHT - 10 + "px";

  div.style.width =
    DAY_WIDTH - 20 + "px";

  const baseLeft = TIME_COL + e.day * DAY_WIDTH + 10;
const usableWidth = DAY_WIDTH - 20;

const totalSlots = e.slots || 1;
const slotIndex = e.slot || 0;

const eventWidth = usableWidth / totalSlots;
const eventLeft = baseLeft + slotIndex * eventWidth;

div.style.left = eventLeft + "px";
div.style.width = (eventWidth - 6) + "px";



  div.innerHTML = `
  <div class="event-inner">
    <div>${e.title}</div>

    <div class="tooltip">
      <div class="course-name">${e.fullName}</div>
      <div class="prof">
        <a href="${e.profile}" target="_blank">${e.prof}</a>
      </div>
    </div>

    <div class="room">${e.room}</div>
  </div>
`;

  eventsLayer.appendChild(div);
});*/

/*
Convert time → decimal:
10:00  → 10.00
10:50  → 10 + 50/60 = 10.83

Convert time → decimal:
10:00  → 10.00
10:50  → 10 + 50/60 = 10.83

*/

events.forEach(e => {
  const subject = SUBJECTS[e.subject];

  const div = document.createElement("div");
  div.className = "event";
  div.className = "event" + (e.type === "modular" ? " modular" : "");

  /* color from subject */
  div.style.background = subject.color;

  /* positioning (unchanged logic) */
  div.style.top =
    (e.start - START_HOUR) * HOUR_HEIGHT + "px";

  const baseLeft = TIME_COL + e.day * DAY_WIDTH + 10;
  const usableWidth = DAY_WIDTH - 20;

  const totalSlots = e.slots || 1;
  const slotIndex = e.slot || 0;

  const eventWidth = usableWidth / totalSlots;
  const eventLeft = baseLeft + slotIndex * eventWidth;

  div.style.left = eventLeft + "px";
  div.style.width = (eventWidth - 6) + "px";

  div.style.height =
    (e.end - e.start) * HOUR_HEIGHT - 10 + "px";

  /* content */
  div.innerHTML = `
    <div>${subject.code}</div>

    <div class="tooltip">
      <div class="course-name">${subject.fullName}</div>
      <div class="prof">
        <a href="${subject.profile}" target="_blank">
          ${subject.prof}
        </a>
      </div>
    </div>

    <div class="room">
      ${e.room}
    </div>
  `;

  eventsLayer.appendChild(div);
});

const today = new Date().getDay(); // 0=Sun, 1=Mon...
const todayIndex = today - 1;      // Mon=0

if (todayIndex >= 0 && todayIndex < 5) {
  // Header cells
  const headerCells = document.querySelectorAll(".header div");
  headerCells[todayIndex + 1].classList.add("today");
}

if (todayIndex >= 0 && todayIndex < 5) {
  const gridCells = document.querySelectorAll(".grid > div");

  const columns = 6; // time + 5 days

  gridCells.forEach((cell, index) => {
    const col = index % columns;

    if (col === todayIndex + 1) {
      cell.classList.add("today");
    }
  });
}
