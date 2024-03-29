import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CandidatModule } from './candidat/candidat.module';
import { TaskModule } from './task/task.module';
import { TokenMiddleware } from './token/token.middleware';

dotenv.config();

@Module({
  imports: [
    TaskModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: Number(process.env.PORT),
      database: process.env.DATABASE,
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      synchronize: true,
      autoLoadEntities: true,
    }),
    CandidatModule,
    AuthModule,
    JwtModule.register({
      secret: 'supersecretcode',
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenMiddleware).forRoutes('candidat*');
  }
}
