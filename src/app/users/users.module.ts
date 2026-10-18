import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersController } from './presentation/users.controller';
import { UsersService } from './application/users.service';
import { LoggerMiddleware } from '@/common/middleware/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import {UsersOrmEntity} from './infrastructure/database/typeorm/entitites/user-typeorm.entity';
import { TypeormUserRepository } from './infrastructure/typeorm.repository';
import { UserRepository } from './domain/user.repository';
import { MatriculaService } from './domain/services/matricula-generator.service';


@Module({
  //this way we can export the TypeOrmModule to be used in onther modules that import this module
  imports: [TypeOrmModule.forFeature([UsersOrmEntity])],
  controllers: [UsersController],
  //there is a way to infer scope set up as custom provider
  providers: [
    UsersService,
    MatriculaService,
     {
      provide: UserRepository, 
      useClass: TypeormUserRepository
    }
  ],
  exports: [UsersService]
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      //there's a way to exclude middleware
      //restrict a particular request method
      //Or you can pass a controller class insted object containing path and method
      .forRoutes({ path: 'users', method: RequestMethod.GET });
  }
}
