import { AuthService } from "./auth.service";

// Types from express you do need to use the rigth type to overload function params work
import { Request, Response } from 'express';
import { SingInDto } from "./dtos/singIn.dto";
import { HmacBodyReq } from "./types/hmac.admin.type";

export class  AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  handleSignIn = async (req: Request, res: Response) =>{
    const signInDto:SingInDto = req.body
    const getTokens  = await this.authService.SignIn(signInDto)

    res.json({
      tokens:getTokens
    }).status(200)
  }


  handleGenerateHmacSignature = async (req: Request, res: Response) =>{ 
      const HmacSignature  = await this.authService.CreateHmacSignature()
      res.send(HmacSignature).status(200)
  }

  handleCheckIntegrity = async (req: Request, res: Response) =>{
     const hmacSignature = req.header('hmac-signature')
     const { message } = req.body
      const isAdmin  = await this.authService.checkHmacAutentication(message,hmacSignature!)
      if(isAdmin){
        res.send({
          message:'usuario admin autenticado'
        })
      }
    else{
      res.json({
        message:"autenticaçao falhou!!!"
      }).status(200)
    }

  }

}
