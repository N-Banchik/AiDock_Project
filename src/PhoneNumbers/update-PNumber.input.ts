import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class UpdatePhoneNumberDto {
  @Field((type) => Int, { nullable: false })
  @IsNumber()
  id: number;

  @Field((type) => String)
  PhoneNumber: string;
}
