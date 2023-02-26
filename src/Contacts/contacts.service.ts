import { Injectable } from '@nestjs/common';
import { Address } from 'src/Address/address.entity';
import { Contact } from 'src/Contacts/contact.entity';
import { CreateContactDto } from 'src/Contacts/create-contact.input';
import { CreatePhoneNumberDto } from 'src/PhoneNumbers/create-PNumber.input';
import { UpdateContactDto } from 'src/Contacts/update-contact.input';
import { PhoneNumber } from 'src/PhoneNumbers/phonenumber.entity';
import { DeleteResult } from 'typeorm';
import { AddressService } from '../Services/address.service';
import { PhonenumbersService } from '../Services/phonenumbers.service';
import { UnitOfWorkService } from '../Services/unitofwork.service';

@Injectable()
export class ContactsService {
  constructor(
    private unitOfWork: UnitOfWorkService,
    private phoneService: PhonenumbersService,
    private addressService: AddressService,
  ) {}

  async findOne(id: number): Promise<Contact> {
    return await this.unitOfWork.contactRepo.findOne({
      where: { id: id },
      relations: { phoneNumbers: true, address: true },
    });
  }
  async findAll(): Promise<Contact[]> {
    return await this.unitOfWork.contactRepo.find({
      relations: { phoneNumbers: true, address: true },
    });
  }

  async addPhoneNumbers(
    contactId: number,
    createDto: CreatePhoneNumberDto[],
  ): Promise<PhoneNumber[]> {
    const contactToUpdate = await this.unitOfWork.contactRepo.findOne({
      where: { id: contactId },
    });
    if (contactToUpdate == null) {
      throw new Error('400');
    }
    const addNumbers: PhoneNumber[] = await this.unitOfWork.numberRepo.create(
      createDto,
    );
    addNumbers.forEach((e) => (e.contact = contactToUpdate));

    return await this.unitOfWork.numberRepo.save(addNumbers);
  }

  async createContact(createDto: CreateContactDto): Promise<Contact> {
    const newContact: Contact = await this.unitOfWork.contactRepo.create(
      createDto,
    );
    newContact.address = this.addressService.create(createDto.address);
    newContact.phoneNumbers = this.phoneService.create(createDto.pNumber);
    return await this.unitOfWork.contactRepo.save(newContact);
  }

  async search(searchTerm: string): Promise<Contact[]> {
    return await this.unitOfWork.contactRepo
      .createQueryBuilder('contact')
      .orderBy('contact.firstName')
      .addOrderBy('contact.lastName')
      .leftJoinAndSelect('contact.phoneNumbers', 'numbers')
      .where(
        'contact.firstName like :term OR contact.lastName like :term OR contact.nickName like :term',
        { term: `%${searchTerm}%` },
      )
      .orWhere('numbers.PhoneNumber like :term', { term: `%${searchTerm}%` })
      .getMany();
  }

  async editContact(updateContactDto: UpdateContactDto): Promise<Contact> {
    const updateContact = this.unitOfWork.contactRepo.create(updateContactDto);

    if (updateContact.address) {
      updateContact.address = this.addressService.update(updateContact.address);
    }

    if (updateContactDto.PhoneNumber) {
      updateContact.phoneNumbers = this.phoneService.updateContact(
        updateContactDto.PhoneNumber,
      );
    }
    await this.unitOfWork.contactRepo.save(updateContact);
    return this.unitOfWork.contactRepo.findOne({
      relations: { phoneNumbers: true, address: true },
      where: { id: updateContact.id },
    });
  }

  async deletePhoneNumber(
    contactId: number,
    numberId: number,
  ): Promise<DeleteResult> {
    return await this.phoneService.remove(contactId, numberId);
  }

  async deleteContact(id: number): Promise<DeleteResult> {
    return await this.unitOfWork.contactRepo.delete(id);
  }
}
