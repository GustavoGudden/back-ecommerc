// Respositories
import { AuthRepository } from "./repository/auth.repository";
import crypto from 'crypto';
// Types
import { UserTokens } from "./types/token.type";
import { User } from "@prisma/client";
import { SingInDto } from "./dtos/singIn.dto";
import { HmacBodyReq } from "./types/hmac.admin.type";

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


  async checkHmacAutentication(hmacSignature:string){
    const expectedHmacSignature = crypto.createHmac('SHA256', 'Gudden_Secret').digest('base64')
    const isAutenticated = crypto.timingSafeEqual(
        Buffer.from(hmacSignature, 'base64'),
        Buffer.from(expectedHmacSignature, 'base64')
    );
    return isAutenticated;  
  }



  async CreateHmacSignature() {
    return crypto.createHmac('SHA256', 'Gudden_Secret').digest('base64')
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
 