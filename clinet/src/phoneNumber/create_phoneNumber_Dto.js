export class CreatePhoneNumberDto {
  phoneNumbers;

  constructor(data) {
    this.phoneNumbers = data.phoneNumbers;
  }
}
