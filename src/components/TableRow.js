const TableRow = ({ item, keys }) =>
  keys.map((i, index) => <td key={index}>{item[i].toString()}</td>);

export default TableRow;
