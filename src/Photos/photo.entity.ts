import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Contact } from '../Contacts/contact.entity';

@ObjectType()
@Entity('Photo')
export class Photo {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => Contact)
  @OneToOne(() => Contact, (contact) => contact.photo, { nullable: false })
  contact: Contact;

  @Field({ nullable: false })
  @Column({ nullable: false })
  publicId: string;

  @Field({ nullable: false })
  @Column({ nullable: false })
  url: string;
}
