## How to use notification in application

In action dispatch after fetch or whenever you can call action of type :

```
{
  type: `NOTIF_ADD`,
  notification: {
    message: 'Přidána kategorie',
    dismissAfter: 3000,
    barStyle:{color:'red'} // optional parameter for displaying errors
  },
}
```