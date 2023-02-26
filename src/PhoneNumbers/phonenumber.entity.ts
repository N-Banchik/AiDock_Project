import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Contact } from '../Contacts/contact.entity';

@ObjectType()
@Entity('PhoneNumber')
export class PhoneNumber {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => Contact)
  @ManyToOne(() => Contact, (contact) => contact.phoneNumbers, {
    cascade: true,
  })
  contact: Contact;

  @Field({ nullable: false })
  @Column({ nullable: false })
  PhoneNumber: string;
}
