export class CreateAddressDto {
  country;
  city;
  streetNumber;
  zip;

  constructor(data) {
    this.country = data.country;
    this.city = data.city;
    this.streetNumber = data.streetNumber;
    this.zip = this.zip;
  }
}
