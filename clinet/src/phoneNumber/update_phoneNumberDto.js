export class PhoneNumberDto {
  id;
  phoneNumbers;

  constructor(data) {
    this.id = data.id;
    this.phoneNumbers = data.phoneNumbers;
  }
}
