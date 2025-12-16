import axios from "axios";
import { useEffect, useState } from "react";
import "../App.css"

const ApproveNotice = () => {
  const [notices, setNotices] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:5000/api/notices/pending", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => setNotices(res.data));
  }, []);

  const approveNotice = async (id) => {
    await axios.put(
      `http://localhost:5000/api/notices/approve/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    // Remove approved notice from list
    setNotices(notices.filter(n => n._id !== id));
  };

  return (
    <div>
      <h3>Pending Notices</h3>

      {notices.length === 0 && <p>No pending notices</p>}

      <ul>
        {notices.map(n => (
          <li key={n._id}>
            <b>{n.title}</b>
            <button onClick={() => approveNotice(n._id)}>
              Approve
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApproveNotice;