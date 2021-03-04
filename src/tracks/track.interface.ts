
export interface BaseTrack {
  name: string;
  notes: string;
  tsstart: number;
  tsend: number;
  length: number;
  geomstr: string;
}

export interface UserTrack extends BaseTrack {
  id: number;
  uid: string;
}