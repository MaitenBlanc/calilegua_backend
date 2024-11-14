import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DetallePedidoService } from '../services/detalle-pedido.service';
import { CreateDetallePedidoDTO } from '../dtos/detallePedido.dto';

@ApiTags('Detalle Pedido')
@Controller('detalle-pedido')
export class DetallepedidoController {
    constructor(private detalleService: DetallePedidoService) { }

    //POST
    @Post()
    create(@Body() payload: CreateDetallePedidoDTO) {
        return this.detalleService.create(payload);
    }
}
