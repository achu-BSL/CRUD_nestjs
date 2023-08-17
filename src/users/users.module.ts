import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  Scope,
} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './schemas/user.shema';
import { AuthenticationMiddleware } from 'src/middlewares/authentication.middleware';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuard } from 'src/guards/auth.guard';
import { LogginInterceptor } from 'src/interceptors/logging.interceptor';
import { HttpExceptionFilter } from 'src/filters/http-exception';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'users', schema: userSchema }])],
  controllers: [UsersController],
  providers: [
    UsersService,
    //* START
    // { //? Set gurad as global.
    //   provide: APP_GUARD, 
    //   useClass: AuthGuard,
    // },
    { //? Set interceptor as a global.
        provide: APP_INTERCEPTOR,
        scope: Scope.REQUEST,
        useClass: LogginInterceptor
    },
    {
        provide: APP_FILTER,
        useClass: HttpExceptionFilter
    }
    //* END

  ],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes('*');
    //* OR we can give the path and request method
    // .forRoutes({path: "/users", method: RequestMethod.GET });
  }
}
