/**
 * Created by baranvoj on 13.12.2016.
 */
import { Record } from 'immutable';

export const Customer = new Record({
  id: null,
  name: '',
  surname: '',
  email: '',
  city: '',
  street: '',
  zip: '',
});

export const mapCustomer = (src) => new Customer({
  id: src.id,
  name: src.name,
  surname: src.surname,
  email: src.email,
  city: src.city,
  street: src.street,
  zip: src.zip,
});

export const mapCustomerData = (id, name, surname, email, city, street, zip) => new Customer({
  id,
  name,
  surname,
  email,
  city,
  street,
  zip,
});
