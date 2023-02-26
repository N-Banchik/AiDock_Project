import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePhotoDto {
  @Field()
  publicId: string;

  @Field()
  url: string;
}
