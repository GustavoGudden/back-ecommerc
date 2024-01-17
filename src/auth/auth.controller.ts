import { AuthService } from './auth.service';

// Types from express you do need to use the rigth type to overload function params work
import { Request, Response } from 'express';
import { SingInDto } from './dtos/singIn.dto';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  handleSignIn = async (req: Request, res: Response) => {
    const signInDto: SingInDto = req.body;
    const getTokens = await this.authService.SignIn(signInDto);

    res
      .json({
        tokens: getTokens,
      })
      .status(200);
  };
}
