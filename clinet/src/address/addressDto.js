export class AddressDto {
  id;
  country;
  city;
  streetNumber;
  zip;

  constructor(data) {
    this.id = data.id;
    this.country = data.country;
    this.city = data.city;
    this.streetNumber = data.streetNumber;
    this.zip = data.zip;
  }
}
