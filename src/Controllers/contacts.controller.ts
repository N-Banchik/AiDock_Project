import { BadRequestException, Controller, Get } from '@nestjs/common';
import { Body, Delete, Param, Post, Query } from '@nestjs/common/decorators';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { Contact } from 'src/Contacts/contact.entity';
import { CreateContactDto } from 'src/Contacts/create-contact.input';
import { CreatePhoneNumberDto } from 'src/PhoneNumbers/create-PNumber.input';
import { UpdateContactDto } from 'src/Contacts/update-contact.input';
import { PhoneNumber } from 'src/PhoneNumbers/phonenumber.entity';
import { ContactsResolver } from 'src/Contacts/contacts.resolver';

@Controller('contacts')
export class ContactsController {
  constructor(private contactResolver: ContactsResolver) {}

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<Contact> {
    try {
      return await this.contactResolver.getContactById(id);
    } catch (error) {
      throw new BadRequestException('No Contact found!');
    }
  }

  @Post()
  async createContact(
    @Body() createContactDto: CreateContactDto,
  ): Promise<Contact> {
    try {
      return await this.contactResolver.createContact(createContactDto);
    } catch (error) {}
  }

  @Post('update')
  async updateContact(
    @Body() updateContactDto: UpdateContactDto,
  ): Promise<Contact> {
    try {
      return await this.contactResolver.updateContact(updateContactDto);
    } catch (error) {}
  }

  @Post('addNumbers/:id')
  async addPhoneNumbers(
    @Param('id', ParseIntPipe) id: number,
    @Body() phoneNumbers: CreatePhoneNumberDto[],
  ): Promise<PhoneNumber[]> {
    return await this.contactResolver.addPhoneNumbers(id, phoneNumbers);
  }

  @Delete('PhoneNumber')
  async deletePhoneNumber(
    @Query('contactId') contactId: number,
    @Query('numberId') numberId: number,
  ) {
    try {
      const deletedNumber = await this.contactResolver.deletePhoneNumber(
        contactId,
        numberId,
      );
      if (deletedNumber < 1) {
        throw new BadRequestException();
      }
    } catch (error) {
      if (typeof error == typeof BadRequestException) {
        throw new BadRequestException('There was a problem with Deleting!');
      }
    }
  }

  @Delete(':id')
  async deleteContact(@Param('id', ParseIntPipe) id: number) {
    try {
      const deletedNumber = await this.contactResolver.deleteContact(id);
      if (deletedNumber < 1) {
        throw new BadRequestException();
      }
    } catch (error) {
      if (typeof error == typeof BadRequestException) {
        throw new BadRequestException('There was a problem with Deleting!', {
          description: 'Contact was not deleted',
        });
      }
    }
  }
}
