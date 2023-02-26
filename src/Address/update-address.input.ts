import { Field, InputType, Int } from '@nestjs/graphql';
import { IsAlpha, IsAlphanumeric, IsNumber, Length } from 'class-validator';

@InputType()
export class UpdateAddressDto {
  @Field((type) => Int, { nullable: false })
  @IsNumber()
  id: number;

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
