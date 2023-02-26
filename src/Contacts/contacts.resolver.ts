import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Contact } from 'src/Contacts/contact.entity';
import { CreateContactDto } from 'src/Contacts/create-contact.input';
import { CreatePhoneNumberDto } from 'src/PhoneNumbers/create-PNumber.input';
import { UpdateContactDto } from 'src/Contacts/update-contact.input';
import { PhoneNumber } from 'src/PhoneNumbers/phonenumber.entity';
import { ContactsService } from 'src/Contacts/contacts.service';

@Resolver((of) => Contact)
export class ContactsResolver {
  constructor(private contactService: ContactsService) {}

  @Query((returns) => Contact)
  async getContactById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Contact> {
    const contactToReturn = await this.contactService.findOne(id);
    if (contactToReturn == null) {
      throw new BadRequestException('No contact found');
    }
    return contactToReturn;
  }
  @Query((returns) => [Contact])
  async getAll() {
    return this.contactService.findAll();
  }

  @Query((returns) => [Contact])
  async search(@Args('searchTerm') searchTerm: string) {
    return await this.contactService.search(searchTerm);
  }

  @Mutation((returns) => Contact)
  async createContact(
    @Args('createDto', { type: () => CreateContactDto })
    createDto: CreateContactDto,
  ): Promise<Contact> {
    try {
      return await this.contactService.createContact(createDto);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Mutation((returns) => Contact)
  async updateContact(
    @Args('updateDto') updateDto: UpdateContactDto,
  ): Promise<Contact> {
    try {
      return await this.contactService.editContact(updateDto);
    } catch (error) {
      throw new HttpException(
        'Unable to update Contact',
        HttpStatus.NOT_MODIFIED,
      );
    }
  }

  @Mutation((returns) => Number)
  async deletePhoneNumber(
    @Args('contactId', { type: () => Int }) contactId: number,
    @Args('numberId', { type: () => Int }) numberId: number,
  ): Promise<Number> {
    try {
      const deletedNumber = (
        await this.contactService.deletePhoneNumber(contactId, numberId)
      ).affected;

      if (deletedNumber < 1) {
        throw new BadRequestException();
      }
      return deletedNumber;
    } catch (error) {
      if (typeof error == typeof BadRequestException) {
        throw new BadRequestException('There was a problem with Deleting!');
      }
    }
  }

  @Mutation((returns) => Number)
  async deleteContact(
    @Args('contactId', { type: () => Int }) contactId: number,
  ): Promise<Number> {
    try {
      const deletedNumber = (await this.contactService.deleteContact(contactId))
        .affected;

      if (deletedNumber < 1) {
        throw new BadRequestException();
      }
      return deletedNumber;
    } catch (error) {
      if (typeof error == typeof BadRequestException) {
        throw new BadRequestException('There was a problem with Deleting!');
      }
    }
  }

  @Mutation((returns) => [PhoneNumber])
  async addPhoneNumbers(
    @Args('contactId', { type: () => Int }) contactId: number,
    @Args('phoneNumbers', { type: () => [CreatePhoneNumberDto] })
    phoneNumbers: CreatePhoneNumberDto[],
  ): Promise<PhoneNumber[]> {
    try {
      const phoneNumbersToReturn = await this.contactService.addPhoneNumbers(
        contactId,
        phoneNumbers,
      );

      return phoneNumbersToReturn;
    } catch (error) {
      if (error.message === '400')
        throw new BadRequestException('No Contact have been found');
    }
  }
}
