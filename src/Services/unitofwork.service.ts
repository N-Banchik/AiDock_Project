/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/Address/address.entity';
import { Contact } from 'src/Contacts/contact.entity';
import { PhoneNumber } from 'src/PhoneNumbers/phonenumber.entity';
import { Photo } from 'src/Photos/photo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UnitOfWorkService {
  constructor(
    @InjectRepository(Contact) private _contactRepo: Repository<Contact>,
    @InjectRepository(Address) private _addressRepo: Repository<Address>,
    @InjectRepository(PhoneNumber) private _numberRepo: Repository<PhoneNumber>,
    @InjectRepository(Photo) private _photoRepo: Repository<Photo>,
  ) {
    this.contactRepo = _contactRepo;
    this.addressRepo = _addressRepo;
    this.photoRepo = _photoRepo;
    this.numberRepo = _numberRepo;
  }

  public contactRepo: Repository<Contact>;
  public addressRepo: Repository<Address>;
  public numberRepo: Repository<PhoneNumber>;
  public photoRepo: Repository<Photo>;
}
