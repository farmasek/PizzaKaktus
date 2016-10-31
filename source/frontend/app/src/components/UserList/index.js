import React, { PropTypes, Component } from 'react';
import { Dropdown } from 'react-toolbox/lib/dropdown';
import styles from './index.module.scss';
import cssModules from 'react-css-modules';
// import Table from 'react-toolbox/lib/table';


const roles = [
  { value: 'admin', label: 'Majitel' },
  { value: 'employee', label: 'Zaměstnanec' },
];


class UserList extends Component { // eslint-disable-line react/prefer-stateless-function

  renderRow = (user) =>
    <tr
      key={user.id}
    >
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.login}</td>
      <td>{user.phone}</td>
      <td><Dropdown
        className={styles.dropdown}
        auto
        onChange={ (value) => this.props.updateUser(user, 'role', value)}
        source={ roles }
        value={user.role}
      /></td>
    </tr>

  render() {
    return (
      <div className={styles.userList}>
        <h1>Seznam uživatelů</h1>
        <table className={styles.userlistTable}>
          <thead>
          <tr>
            <th>Jméno</th>
            <th>Příjmení</th>
            <th>Login</th>
            <th>Telefon</th>
            <th>Role</th>
          </tr>
          </thead>
          <tbody>
          {
            this.props.users.map((user) => this.renderRow(user))
          }
          </tbody>
        </table>
      </div>);
  }
}


UserList.propTypes = {
  users: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default cssModules(UserList, styles);
