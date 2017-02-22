/**
 * Created by baranvoj on 13.12.2016.
 */
import { Record } from 'immutable';

export const Customer = new Record({
  id: null,
  name: '',
  surname: '',
  email: '',
  phone: '',
  city: '',
  street: '',
  zip: '',
});

export const mapCustomer = (src) => new Customer({
  id: src.id,
  name: src.name,
  surname: src.surname,
  email: src.email,
  phone: src.phone,
  city: src.city,
  street: src.street,
  zip: src.zip,
});

export const mapCustomerData = (id, name, surname, email, phone, city, street, zip) =>
  new Customer({
    id,
    name,
    surname,
    email,
    phone,
    city,
    street,
    zip,
  });
