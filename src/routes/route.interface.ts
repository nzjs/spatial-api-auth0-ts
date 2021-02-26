
export interface BaseRoute {
  name: string;
  notes: string;
  tsstart: number;
  tsend: number;
  length: number;
  geomstr: string;
}

export interface UserRoute extends BaseRoute {
  id: number;
  uid: string;
}