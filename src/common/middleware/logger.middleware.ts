import { Injectable, NestMiddleware } from '@nestjs/common';

//middleware could be declared as a class or function, class when you need any dependencies and function when not

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    console.log('Middleware');
    next();
  }
}
