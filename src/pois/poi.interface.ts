
export interface BasePOI {
  type: string;
  name: string;
  notes: string;
  ts: number;
  image: string;
  geomstr: string;
}

export interface UserPOI extends BasePOI {
  id: number;
  uid: string;
}