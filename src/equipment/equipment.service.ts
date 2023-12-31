import { Injectable } from '@nestjs/common';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Equipment } from '../schema/equipment.schema';
import { Model, UpdateWriteOpResult } from 'mongoose';

@Injectable()
export class EquipmentService {
  constructor(@InjectModel(Equipment.name) private eqpModel: Model<Equipment>) { }
  create(createEquipmentDto: CreateEquipmentDto) {
    const eqp = new this.eqpModel(createEquipmentDto);
    return eqp.save();
  }

  findAll(): Promise<Equipment[]> {
    return this.eqpModel.find().exec();
  }

  findOne(id: string): Promise<Equipment | null> {
    return this.eqpModel.findOne({ _id: id }).exec();
  }

  update(id: string, updateEquipmentDto: UpdateEquipmentDto): Promise<UpdateWriteOpResult> {
    return this.eqpModel.updateOne({ _id: id }, updateEquipmentDto).exec();
  }

  remove(id: string) {
    return this.eqpModel.deleteOne({ _id: id }).exec();
  }
}
