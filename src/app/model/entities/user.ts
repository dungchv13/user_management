export interface User {
  id?:number;
  username?: string;
  email?: string;
  password?: string;

  account_number?:number;
  balance?:number;

  firstname?: string;
  lastname?: string;

  age?: number;
  gender?: string;

  city?: string;
  state?: string;


  address?: string;

  roles?: any[];
}


