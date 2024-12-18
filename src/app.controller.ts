import { Controller, Get } from "@nestjs/common"

@Controller('hello')
export class AppController { 

  @Get('')
  helloWorld() {
    return { message: "Hello World" }
  }
}

