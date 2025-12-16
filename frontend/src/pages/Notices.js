import axios from "axios";
import { useContext, useEffect, useState, Fragment } from "react";
import { AuthContext } from "../auth/AuthContext";
import CreateNotice from "../components/CreateNotice";
import { Link } from "react-router-dom";

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios.get("http://localhost:5000/api/notices", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }).then(res => setNotices(res.data));
  }, []);

  return (
    <div className="container">
      <h2>Notices</h2>
      <h3 className={user.role}>
        Logged in as: {user.role.toUpperCase()}

        {/* Admin only */}
      </h3>
      {user.role === "admin" && (
        <Link to="/admin">
          <button>Go to Admin Panel</button>
        </Link>
      )}


      {/* Faculty & Admin only */}
      {(user.role === "admin" || user.role === "faculty") && <CreateNotice />}

      {/* <ol>
        {notices.map(n => (
          <li key={n._id}> <h3>{n.title}</h3>{n.content}</li>
        ))}
      </ol> */}
      <dl>
        {notices.map(n => (
          <Fragment key={n._id}>
            <dt><h3>{n.title}</h3></dt>
            <dd>{n.content}</dd>
          </Fragment>
        ))}
      </dl>

    </div>
  );
};

export default Notices;