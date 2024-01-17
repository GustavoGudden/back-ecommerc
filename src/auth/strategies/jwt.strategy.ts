import { UserTokens } from "../types/token.type";
import jwt from 'jsonwebtoken';


export class JwtStrategy {

    async generateUserTokens(id:number): Promise<UserTokens> {
              
        const access_token =  jwt.sign({userid:id},'abcde',{expiresIn:3000})
        const refresh_token = jwt.sign({userId:id},'abcde',{expiresIn:86400});
    
        return {
          access_token,
          refresh_token,
        };
      }

   async verifyJwt(token:UserTokens):Promise<boolean>{
    const isVerify  = jwt.verify(token.access_token,'abcde')
    return isVerify ? true : false 
   }
 

} 