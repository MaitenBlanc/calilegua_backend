import { Injectable } from '@nestjs/common';
import { OperadoresService } from '../../operadores/services/operadores.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Operador } from 'src/operadores/entities/operador.entity';
import { PayloadToken } from '../models/token.model';

@Injectable()
export class AuthService {
    constructor(
        private operadoresService: OperadoresService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string) {
        const operador = await this.operadoresService.findByEmail(email);

        if (operador) {
            const isMatch = await bcrypt.compare(password, operador.password);

            if (isMatch) {
                const { password, ...rta } = operador.toJSON();
                return rta;
            }
        }
        return null;
    }

    generateJWT(operador: Operador) {
        const paylad: PayloadToken = { sub: operador.id, role: operador.role };
        return {
            access_token: this.jwtService.sign(paylad),
            operador,
        };
    }
}
