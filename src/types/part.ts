export type PartResult = "OK" | "NG";

export type AreaSetting = "RAK JIS" | "DOORSUB" | "J12";

export type ShiftType = "SHIFT 1" | "SHIFT 2";

export type RackJisType =
  | "No 1"
  | "No 2"
  | "No 3"
  | "No 4"
  | "No 5"
  | "No 6"
  | "No 7"
  | "No 8";

export type PartData = {
  id: number;

  // Model
  area: string;

  prefix: string;
  partCode: string;
  fullCode: string;
  result: PartResult;
  stampDate: string;
  detailProblem: string;

  // Setting area kerja
  workArea: AreaSetting;
  rackJis: RackJisType | "";
  pic: string;
  shift: ShiftType;

  workDate: string;
  createdAt: string;
};

export type PartFormData = {
  // Model
  area: string;

  partCode: string;
  result: PartResult;

  stampDate: string;
  detailProblem: string;

  // Setting area kerja
  workArea: AreaSetting;
  rackJis: RackJisType | "";
  pic: string;
  shift: ShiftType;
};