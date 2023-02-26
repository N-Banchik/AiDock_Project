/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { CreatePhoneNumberDto } from 'src/PhoneNumbers/create-PNumber.input';
import { UpdatePhoneNumberDto } from 'src/PhoneNumbers/update-PNumber.input';
import { PhoneNumber } from 'src/PhoneNumbers/phonenumber.entity';
import { DeleteResult } from 'typeorm';
import { UnitOfWorkService } from './unitofwork.service';

@Injectable()
export class PhonenumbersService {
  constructor(private unitOfWork: UnitOfWorkService) {}

  updateContact(updateDto: UpdatePhoneNumberDto[]): PhoneNumber[] {
    return this.unitOfWork.numberRepo.create(updateDto);
  }

  create(phoneNumbers: CreatePhoneNumberDto[]): PhoneNumber[] {
    return this.unitOfWork.numberRepo.create(phoneNumbers);
  }

  async remove(contactId: number, id: number): Promise<DeleteResult> {
    const numberOfPhoneNumbers = await this.unitOfWork.numberRepo
      .createQueryBuilder('number')
      .leftJoinAndSelect('number.contact', 'contact')
      .where('contact.id = :contactId', { contactId })
      .getCount();

    console.log(numberOfPhoneNumbers);

    if (numberOfPhoneNumbers > 1) {
      return await this.unitOfWork.numberRepo.delete(id);
    }
  }
}
