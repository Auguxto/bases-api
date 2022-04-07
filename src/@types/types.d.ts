export type User = {
  name: string;
  username: string;
  password: string;
};

export type Session = {
  username: string;
  password: string;
};

export type Permission = {
  permission: string;
  description: string;
};

export type Tower = {
  ip: string;
  name: string;
  username: string;
  password: string;
  vpn: boolean;
  mikrotik: boolean;
  city: string;
};
