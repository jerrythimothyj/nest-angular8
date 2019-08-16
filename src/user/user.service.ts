import { Injectable } from '@nestjs/common';
import { UserDto } from './models/user.dto';
import { getManager } from 'typeorm';
import * as R from 'ramda';

export type User = any;

@Injectable()
export class UserService {

  async findOne(username: string, password: string): Promise<any> {
    const entityManager = getManager();
    const queryResult = await entityManager.query(`select id, username, password from user where username='${username}' and password='${password}'`);

    if (queryResult[0]) {
      const receivedUser = R.pick(['id', 'username', 'password'])(queryResult[0]);
      return receivedUser;
    }
    return null;
  }

  async create(user: UserDto): Promise<any> {
    const entityManager = getManager();
    const userQueryResult = await entityManager.query(`insert into user(username, password) values('${user.username}', '${user.password}')`);

    return {
      username: user.username,
      id: userQueryResult.insertId,
    };
  }
}
