export type RotorName = "I" | "II" | "III" | "IV" | "V";
export type ReflectorName = "A" | "B" | "C" | "D";

export type PathStage =
  | "plug-in"
  | "right-fwd"
  | "mid-fwd"
  | "left-fwd"
  | "reflector"
  | "left-back"
  | "mid-back"
  | "right-back"
  | "plug-out";

export type PathHop = {
  stage: PathStage;
  from: string;
  to: string;
};

export type Trace = {
  input: string;
  output: string;
  positions: [number, number, number];
  stepped: {
    left: boolean;
    middle: boolean;
    right: boolean;
  };
  path: PathHop[];
};
