import { Injectable } from '@nestjs/common';
import { UserDto } from './models/user.dto';
import { getManager } from 'typeorm';
import * as R from 'ramda';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  getHashedPassword(password) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
  }

  async findOne(username: string, password: string): Promise<any> {
    const entityManager = getManager();

    const queryResult = await entityManager.query(`select id, username, password from user where username='${username}'`);

    if (queryResult[0]) {
      const receivedUser = R.pick(['id', 'username', 'password'])(queryResult[0]);
      if (bcrypt.compareSync(password, receivedUser.password)) {
        return receivedUser;
      }
    }
    return null;
  }

  async create(user: UserDto): Promise<any> {
    const entityManager = getManager();

    // tslint:disable-next-line:max-line-length
    const userQueryResult = await entityManager.query(`insert into user(username, password) values('${user.username}', '${this.getHashedPassword(user.password)}')`);

    return {
      username: user.username,
      id: userQueryResult.insertId,
    };
  }
}
