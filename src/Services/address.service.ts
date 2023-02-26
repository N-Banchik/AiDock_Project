/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { Address } from 'src/Address/address.entity';
import { CreateAddressDto } from 'src/Address/create-address.input';
import { UpdateAddressDto } from 'src/Address/update-address.input';
import { UnitOfWorkService } from './unitofwork.service';

@Injectable()
export class AddressService {
  constructor(private unitOfWork: UnitOfWorkService) {}

  create(createDto: CreateAddressDto): Address {
    return this.unitOfWork.addressRepo.create(createDto);
  }

  update(updateDto: UpdateAddressDto): Address {
    return this.unitOfWork.addressRepo.create(updateDto);
  }
}
