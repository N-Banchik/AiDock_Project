import { Field, InputType } from '@nestjs/graphql';
import { Min } from 'class-validator';
import { Address } from '../Address/address.entity';
import { Photo } from '../Photos/photo.entity';
import { CreateAddressDto } from '../Address/create-address.input';
import { CreatePhotoDto } from '../Photos/create-photo.input';
import { CreatePhoneNumberDto } from '../PhoneNumbers/create-PNumber.input';

@InputType()
export class CreateContactDto {
  @Field({ nullable: false })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  nickName: string;

  @Field((type) => CreateAddressDto, { nullable: true })
  address?: CreateAddressDto;

  @Field((type) => CreatePhotoDto, { nullable: true })
  photo?: CreatePhotoDto;

  @Field((type) => [CreatePhoneNumberDto])
  pNumber: CreatePhoneNumberDto[];
}
