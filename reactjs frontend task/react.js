// your-react-app.js
const EditableTable = () => {
  const data = [
    { id: 1, name: "John", age: 25 },
    { id: 2, name: "Jane", age: 30 },
    // Add more data as needed
  ];

  const handleEdit = (id, key, value) => {
    // Update the data when a cell is edited
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, [key]: value } : item
    );
    console.log(updatedData);
    // You can now send updatedData to your API
  };

  return (
    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td
              contentEditable
              onBlur={(e) => handleEdit(item.id, "name", e.target.innerText)}
            >
              {item.name}
            </td>
            <td
              contentEditable
              onBlur={(e) => handleEdit(item.id, "age", e.target.innerText)}
            >
              {item.age}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Render the component to the root element
ReactDOM.render(<EditableTable />, document.getElementById("root"));
