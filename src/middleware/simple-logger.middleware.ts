import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class SimpleLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('SimpleLoggerMiddleware');

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, baseUrl, body } = req;
    const userAgent = req.get('user-agent') || '';

    const resBody = JSON.stringify(body);

    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('Content-Length');

      this.logger.log(
        `${method} ${baseUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip} ${resBody}`,
      );
    });
    next();
  }
}
