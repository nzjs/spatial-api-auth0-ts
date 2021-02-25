
export interface BasePOI {
  uid: string;
  type: string;
  name: string;
  notes: string;
  ts: number;
  image: string;
  geom: string;
}

export interface UserPOI extends BasePOI {
  id: number;
}