import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { UpdateAddressDto } from '../Address/update-address.input';
import { UpdatePhoneNumberDto } from '../PhoneNumbers/update-PNumber.input';

@InputType()
export class UpdateContactDto {
  @Field((type) => Int, { nullable: false })
  @IsNumber()
  id: number;

  @Field({ nullable: false })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  nickName: string;

  @Field((type) => UpdateAddressDto, { nullable: true })
  address?: UpdateAddressDto;

  @Field((type) => [UpdatePhoneNumberDto], { nullable: true })
  PhoneNumber?: UpdatePhoneNumberDto[];
}
