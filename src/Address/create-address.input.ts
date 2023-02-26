import { Field, InputType } from '@nestjs/graphql';
import { IsAlpha } from 'class-validator';
import { IsAlphanumeric, Length, Min } from 'class-validator';

@InputType()
export class CreateAddressDto {
  @Field()
  @IsAlpha()
  @Length(2)
  country: string;

  @Field()
  @IsAlpha()
  @Length(2)
  city: string;

  @Field()
  @Length(2)
  streetNumber: string;

  @Field()
  @IsAlphanumeric()
  @Length(2)
  zip: string;
}
