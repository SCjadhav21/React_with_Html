import "./App.css";
import { MdDelete } from "react-icons/md";
import { InputGroup, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
function App() {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [noteData, setNoteData] = useState({ title: "", content: "" });
  const handelChange = (e) => {
    setNoteData({ ...noteData, [e.target.name]: e.target.value });
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`https://gray-creepy-fox.cyclic.app/notes/add`, noteData)
      .then((res) => {
        alert(res.data);
        setNoteData({ title: "", content: "" });
        setRefresh(!refresh);
      })
      .catch((err) => console.log(err));
  };
  const handelDelete = (id) => {
    axios
      .delete(`https://gray-creepy-fox.cyclic.app/notes/${id}`)
      .then((res) => {
        alert(res.data);
        setRefresh(!refresh);
      })
      .catch((err) => console.log(err));
  };
  const getData = () => {
    axios
      .get("https://gray-creepy-fox.cyclic.app/notes")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getData();
    const notes = document.querySelectorAll(".note-content");
    notes.forEach((note) => {
      const contentHeight = note.clientHeight;
      const rowSpan = contentHeight > 200 ? Math.ceil(contentHeight / 200) : 1;
      note.style.gridRow = `span ${rowSpan}`;
    });
  }, [refresh]);
  return (
    <div>
      <div className="Main">Notes</div>

      <div className="note-form">
        <div>
          {" "}
          <form action="" onSubmit={handelSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Note Title</Form.Label>
              <Form.Control
                type="text"
                required
                name="title"
                value={noteData.title}
                onChange={handelChange}
                placeholder="Add Title"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Note Content</Form.Label>
              <Form.Control
                type="text"
                required
                value={noteData.content}
                name="content"
                onChange={handelChange}
                placeholder="Note Description..."
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Add Note
            </Button>
          </form>
        </div>
      </div>

      <div className="body">
        {data?.map((item) => {
          return (
            <div key={item.id} className="note-content">
              <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                {item.title}
              </p>
              <p style={{ marginTop: "-20px", fontSize: "18px" }}>
                {item.content}
              </p>
              <p style={{ marginTop: "-20px", fontSize: "12px" }}>
                {item.created_at}
              </p>
              <p
                style={{
                  marginTop: "-20px",
                  fontSize: "16px",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <MdDelete onClick={() => handelDelete(item.id)} />
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
