export type RefereeRole = 
  | 'PRINCIPAL'
  | 'ASSISTANT_1'
  | 'ASSISTANT_2'
  | 'ASSISTANT_3'
  | 'COMMISSIONER';

export interface User {
  id: string;
  email: string;
  name: string;
  role?: RefereeRole;
}

export interface Game {
  id: string;
  homeTeam: string;
  awayTeam: string;
  principalReferee: User;
  assistantReferees: User[];
  commissioner?: User;
  date: Date;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  recordingPath?: string;
}