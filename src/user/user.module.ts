import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserService } from './user.service';
import { userProviders } from './user.providers';

@Module({
  providers: [...userProviders, UserService],
  imports: [
    DatabaseModule,
  ],
  controllers: [],
  exports: [UserService],
})
export class UserModule { }
