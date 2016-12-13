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

export const mapCustomer = (id, name, surname, email, city, street, zip) => new Customer({
  id,
  name,
  surname,
  email,
  city,
  street,
  zip,
});
