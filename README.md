json2tbl.js
===========

Small JS-script for turning a JSON object into a HTML table.

Very limited in functionality, yet some ancient JavaScript theorists find it useful.

Example:

```
var obj = {
   name: 'JavaScript',
   purpose: 'glorious'
};

$('body').append(json2tbl.build(obj));
```
Result:

```
<table>
  <tbody>
    <tr>
      <td>name</td>
      <td>JavaScript</td>
    </tr>
    <tr>
      <td>purpose</td>
      <td>glorious</td>
    </tr>
  </tbody>
</table>
