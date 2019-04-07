import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mensaje } from './entities/mensaje.entity';
import { Repository } from 'typeorm';
import { CreateMensajeDto } from './dto/create-mensaje-dto';

@Injectable()
export class MensajesService {
  constructor(@InjectRepository(Mensaje) private readonly mensajeRepositorio: Repository<Mensaje>) {

  }

  async getAll(): Promise<Mensaje[]> {
    return await this.mensajeRepositorio.find();
  }

  async createMensaje(mensajeNuevo: CreateMensajeDto): Promise<Mensaje> {
    const nuevo = new Mensaje();

    nuevo.mensajes = mensajeNuevo.mensaje;
    nuevo.nick = mensajeNuevo.nick;

    return this.mensajeRepositorio.save(nuevo);
  }

  async updateMensaje(idMensaje: number, mensajeActualizar: CreateMensajeDto): Promise<Mensaje> {
    const mensajeUpdate = await this.mensajeRepositorio.findOne(idMensaje);

    mensajeUpdate.nick = mensajeActualizar.nick;
    mensajeUpdate.mensajes = mensajeActualizar.mensaje;

    return await this.mensajeRepositorio.save(mensajeUpdate);
  }

  async deleteMensaje(idMensaje: number): Promise<any> {
    return await this.mensajeRepositorio.delete(idMensaje);
  }
}
