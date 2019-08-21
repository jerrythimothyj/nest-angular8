import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';
import * as expressSession from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
  );
  app.use(expressSession({ secret: 'keyboard cat', resave: true, saveUninitialized: false }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.setGlobalPrefix('/api');
  await app.listen(3000);
}
bootstrap();
