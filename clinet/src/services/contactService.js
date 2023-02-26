import { ContactDto } from "../contacts/contactDto";

const API_URL = "http://localhost:3000/graphql";
export const GetContactById = async (id) => {
  var RequestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: `{"query":"query{ getContactById(id:${id}){id nickName firstName lastName phoneNumbers{ id PhoneNumber } address{ city streetNumber country zip id } }}"}`,
  };

  const response = await fetch(`${API_URL}`, RequestOptions);
  const data = await response.json();
  const contact = new ContactDto(data.data.getContactById);
  return contact;
};

export const DeletePhoneNumber = async (deleteParams) => {
  var RequestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: `{
      "query": "mutation{ deletePhoneNumber(contactId:${deleteParams.contactId},numberId:${deleteParams.PhoneId})}"
    }`,
  };

  const response = await fetch(`${API_URL}`, RequestOptions);
  const data = await response.json();
  const affected = data.data.deletePhoneNumber;
  return affected;
};

export const AddNewPhoneNumber = async (addParams) => {
  var RequestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: `{
      "query":"mutation{ addPhoneNumbers(contactId:${addParams.contactId}phoneNumbers:[{PhoneNumber:${addParams.number}}]){PhoneNumber}}"
    }`,
  };

  await fetch(`${API_URL}`, RequestOptions);
};
