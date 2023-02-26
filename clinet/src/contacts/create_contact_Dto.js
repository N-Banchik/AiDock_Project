export class CreateContactDto {
  firstName;
  lastName;
  nickName;
  address;
  phoneNumbers;
  photo;
  constructor(data, address, phonNumbers) {
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.nickName = data.nickName;
    this.photo = photo;
    this.address = address;
    this.phoneNumbers = phonNumbers;
  }
}
