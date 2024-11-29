import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';

import { OperadoresModule } from 'src/operadores/operadores.module';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [OperadoresModule, PassportModule],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule { }
