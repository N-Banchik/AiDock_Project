import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContactsController } from '../Controllers/contacts.controller';
import { Address } from '../Address/address.entity';
import { Contact } from './contact.entity';
import { PhoneNumber } from '../PhoneNumbers/phonenumber.entity';
import { Photo } from '../Photos/photo.entity';
import { ContactsResolver } from './contacts.resolver';
import { AddressService } from '../Services/address.service';
import { ContactsService } from './contacts.service';
import { PhonenumbersService } from '../Services/phonenumbers.service';
import { UnitOfWorkService } from '../Services/unitofwork.service';

@Module({
  imports: [TypeOrmModule.forFeature([Contact, Address, PhoneNumber, Photo])],
  controllers: [ContactsController],
  providers: [
    ContactsService,
    ContactsResolver,
    UnitOfWorkService,
    PhonenumbersService,
    AddressService,
  ],
  exports: [],
})
export class ContactsModule {}
