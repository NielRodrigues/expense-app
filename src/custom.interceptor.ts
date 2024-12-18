import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common"
import { map } from "rxjs"

export class CustomInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler) {
    return handler.handle().pipe(
      map((data) => {
        const response = {
          ...data,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
        }

        delete data.created_at
        delete data.updated_at

        return response
      })
    )
  }
}