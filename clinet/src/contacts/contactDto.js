import { PhoneNumberDto } from "../phoneNumber/phoneNumberDto";
import { AddressDto } from "../address/addressDto";
export class ContactDto {
  id;
  firstName;
  lastName;
  nickName;
  address;
  phoneNumbers;

  constructor(data) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.nickName = data.nickName;
    this.address = new AddressDto(data.address);
    const numbers = [];

    data.phoneNumbers.forEach((element) => {
      numbers.push(new PhoneNumberDto(element));
    });

    this.phoneNumbers = numbers;
  }
}
