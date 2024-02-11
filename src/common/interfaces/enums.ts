export type UserRole = 'DEVELOPER' | 'USER';
export type UserInstitutionRole = 'ADMIN' | 'USER';
export type BoxState = 'DEFAULT' | 'EMPTY' | 'OPEN' | 'DISABLED';
export type LogAction =
  | 'RESERVATIONCREATE'
  | 'RESERVATIONCANCEL'
  | 'BORROW'
  | 'RETURN'
  | 'PHOTO'
  | 'ADD'
  | 'REMOVE'
  | 'DISABLECODE'
  | 'ACTIVATE';
