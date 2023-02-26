import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePhoneNumberDto {
  @Field((type) => String)
  PhoneNumber: string;
}
