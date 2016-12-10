import React, { PropTypes, Component } from 'react';
import styles from './index.module.scss';
import cssModules from 'react-css-modules';
import Checkbox from 'react-toolbox/lib/checkbox';
import { IconButton } from 'react-toolbox/lib/button';

class UserList extends Component {

  renderRow = (user) =>
    <tr key={user.id}>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.login}</td>
      <td>{user.phone}</td>
      <td>
        <Checkbox
          checked={user.roles ? user.roles.indexOf('ADMIN') > -1 : false}
          onChange={() => this.props.updateRole(user, 'ADMIN')}
        />
      </td>
      <td>
        <Checkbox
          checked={user.roles ? user.roles.indexOf('EMPLOYEE') > -1 : false}
          onChange={() => this.props.updateRole(user, 'EMPLOYEE')}
        />
      </td>
      <td>
        <IconButton
          onClick = {() => this.props.handleDialog(true, user.id, user.firstName, user.lastName)}
          icon="delete"
        />
      </td>
    </tr>;

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
            <th>Majitel</th>
            <th>Zaměstnanec</th>
            <th>Smazat</th>
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
  updateRole: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  dialog: PropTypes.bool.isRequired,
  handleDialog: PropTypes.func.isRequired,
};

export default cssModules(UserList, styles);
