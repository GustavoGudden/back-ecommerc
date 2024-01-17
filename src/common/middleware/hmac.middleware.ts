import { HmacStrategy } from '../strategies/hmac.strategy';
import { NextFunction, Request, Response } from 'express';

export class HmacMiddleware {
  constructor(private readonly hmacStrategy: HmacStrategy) {}

  validate = (req: Request, res: Response, next: NextFunction) => {
    const expectHmacSignature = this.hmacStrategy.sign({
      method: req.method,
      content: JSON.stringify(req.body ?? req.query),
      requestUri: req.url,
      contentType: req.headers['content-type'],
    });
    console.log(expectHmacSignature);

    const isAuthenticated = this.hmacStrategy.verify(expectHmacSignature, req.headers.hmac as string);

    if (!isAuthenticated) {
      return res.status(401).json({
        status: 401,
        message: 'Hmac invalido',
      });
    }
    next();
  };
}
