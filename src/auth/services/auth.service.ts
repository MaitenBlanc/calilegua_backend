import { Injectable } from '@nestjs/common';
import { OperadoresService } from 'src/operadores/services/operadores.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private operadoresService: OperadoresService) { }

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
}
