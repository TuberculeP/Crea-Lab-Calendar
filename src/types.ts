export type EventType = {
  id: number;
  title: string;
  description?: string;
  start: string;
  end: string;
};
export type EventsType = EventType[];

export type UserType = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  status: string;
};
