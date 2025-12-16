import axios from "axios";
import { useState } from "react";

const CreateNotice = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const createNotice = async () => {
    await axios.post("http://localhost:5000/api/notices",
      { title, content },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );
    alert("Notice submitted");
  };

  return (
    <>
      <h3>Create a new notice</h3>
      <input placeholder="Title" onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="Content" onChange={e => setContent(e.target.value)} />
      <button onClick={createNotice}>Create</button>
    </>
  );
};

export default CreateNotice;