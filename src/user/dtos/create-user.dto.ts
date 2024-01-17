type  CreateUserPayload = {
  name :    string
  email:    string
  password:  string
  };
  
  export class CreateUserDto {
     name :    string
     email:    string
     password:  string
  
    constructor({ name,email,password }: CreateUserPayload) {
      this.name = name;
      this.email = email
      this.password = password
    }
  }
  