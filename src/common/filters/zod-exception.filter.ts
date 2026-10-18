import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Response } from "express";
import { ZodError } from "zod";

@Catch(ZodError)
export class ZodExceptionFilter implements ExceptionFilter{
    catch(exception: ZodError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const errors = exception.issues.map((issue)=>({
            path: issue.path.join(''),
            message: issue.message,
            code: issue.code
        }))

        response.status(HttpStatus.BAD_REQUEST).json({
            timestamp: new Date(),
            error: 'Bad Request',
            message: 'Validation falied',
            details: errors
        })
    }
}