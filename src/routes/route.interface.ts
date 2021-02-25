
export interface BaseRoute {
  uid: string;
  name: string;
  notes: string;
  tsstart: number;
  tsend: number;
  length: number;
  geom: string;
}

export interface UserRoute extends BaseRoute {
  id: number;
}