export class PhoneNumberDto {
  id;
  PhoneNumber;

  constructor(data) {
    this.id = data.id;
    this.PhoneNumber = data.PhoneNumber;
  }
}
