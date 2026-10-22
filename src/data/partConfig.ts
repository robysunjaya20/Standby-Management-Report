export const AREA_OPTIONS = [
  {
    label: "SU2ID LH",
    prefix: "87610-I7",
  },
  {
    label: "SU2ID RH",
    prefix: "87620-I7",
  },
  {
    label: "KS LH",
    prefix: "87610-I6",
  },
  {
    label: "KS RH",
    prefix: "87620-I6",
  },
];

export const WORK_AREA_OPTIONS = [
  "RAK JIS",
  "DOORSUB",
  "J12",
] as const;

export const RACK_JIS_OPTIONS = [
  "No 1",
  "No 2",
  "No 3",
  "No 4",
  "No 5",
  "No 6",
  "No 7",
  "No 8",
] as const;

export type RackJisType =
  (typeof RACK_JIS_OPTIONS)[number];

export const SHIFT_OPTIONS = [
  "SHIFT 1",
  "SHIFT 2",
] as const;

export type WorkAreaType =
  (typeof WORK_AREA_OPTIONS)[number];

export type ShiftType =
  (typeof SHIFT_OPTIONS)[number];