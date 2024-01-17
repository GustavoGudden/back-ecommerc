import crypto from 'crypto';

interface HmacSignProps {
  method: string;
  content: string;
  requestUri: string;
  contentType?: string;
}

export class HmacStrategy {
  sign({ method, content, requestUri, contentType }: HmacSignProps) {
    const stringToSign = method + content + contentType + requestUri;

    return crypto.createHmac('SHA256', process.env.HMAC_SECRET!).update(Buffer.from(stringToSign)).digest('base64');
  }

  verify(expectHmac: string, incomingHmac?: string) {
    try {
      if (!incomingHmac) return false;

      return crypto.timingSafeEqual(Buffer.from(expectHmac), Buffer.from(incomingHmac));
    } catch {
      return false;
    }
  }
}
