type SingInPayload = {
    name: string;
    password: string;
  };
  
  export class SingInDto {
    name: string;
    password:string;

  
    constructor({ name,password }: SingInPayload) {
      this.name = name;
      this.password = password
    }
  }
  