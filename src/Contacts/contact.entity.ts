import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Address } from '../Address/address.entity';
import { PhoneNumber } from '../PhoneNumbers/phonenumber.entity';
import { Photo } from '../Photos/photo.entity';

@ObjectType()
@Entity('Contact')
export class Contact {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: false })
  @Column({ nullable: false })
  firstName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  nickName: string;

  @Field((type) => [PhoneNumber], { nullable: false })
  @OneToMany(() => PhoneNumber, (number) => number.contact)
  phoneNumbers: PhoneNumber[];

  @Field((type) => Address, { nullable: true })
  @OneToOne(() => Address, (address) => address.contact, { cascade: true })
  @JoinColumn()
  address?: Address;

  @Field((type) => Photo, { nullable: true })
  @OneToOne(() => Photo, (photo) => photo.contact, { cascade: true })
  @JoinColumn()
  photo?: Photo;
}
