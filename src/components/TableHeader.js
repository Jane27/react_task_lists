const TableHeader = ({ keys }) =>
  keys.map((i, index) => <th key={index}>{i.toUpperCase()}</th>);

export default TableHeader;
