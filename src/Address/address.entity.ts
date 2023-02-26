import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Contact } from '../Contacts/contact.entity';

@ObjectType()
@Entity('Address')
export class Address {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => Contact)
  @OneToOne(() => Contact, (contact) => contact.address, { nullable: false })
  contact: Contact;

  @Field({ nullable: false })
  @Column({ nullable: false })
  country: string;

  @Field({ nullable: false })
  @Column({ nullable: false })
  city: string;

  @Field({ nullable: false })
  @Column({ nullable: false })
  zip: string;

  @Field({ nullable: false })
  @Column({ nullable: false })
  streetNumber: string;
}
