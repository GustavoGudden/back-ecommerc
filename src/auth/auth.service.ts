// Respositories
import { AuthRepository } from "./repository/auth.repository";

// Types
import { UserTokens } from "./types/token.type";
import { User } from "@prisma/client";
import { SingInDto } from "./dtos/singIn.dto";

// Ultil
import { HashUtil } from "../common/utils/hash.util";

// Strategies
import { JwtStrategy } from "./strategies/jwt.strategy";




export class AuthService {
  constructor( private readonly authRepository:AuthRepository,private readonly hashUtil:HashUtil,private readonly jwtStrategy:JwtStrategy) {}

  async SignIn(signInDto:SingInDto):Promise<UserTokens> {
    const user  = await this.validadeCredentials(signInDto)
    return await this.jwtStrategy.generateUserTokens(user.id);
  }







private async validadeCredentials({name,password}:SingInDto): Promise<User> {
  try{
    const user =  await this.authRepository.getIdByUserName(name)
    if(user) {
       await this.verifyHashedPassword(password,user.password)
      return user
    }else {
      throw Error
    }
     }catch(error){
          throw error
    }
}

private async verifyHashedPassword(password:string,userPasword:string):Promise<void> {
const  isPasswordMatch = await this.hashUtil.compereHashedValues(password,userPasword)
 if (!isPasswordMatch) throw new Error;
}
}
 