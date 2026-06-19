import { useEffect, useState } from "react";
import { fetchMe } from "../api/user";
import { requestTeacherJoin } from "../api/groups";

import "../styles/ui.css";

export default function TeacherDashboard() {
  const [me, setMe] = useState(null);
  const [joinCode, setJoinCode] = useState("");

  useEffect(() => {
    const init = async () => {
      try {
        const r = await fetchMe();
        setMe(r.user);
      } catch {
        alert("Failed to load profile");
      }
    };
    init();
  }, []);

  const handleRequest = async () => {
    try {
      if (!joinCode.trim()) return alert("Enter join code");

      await requestTeacherJoin({ joinCode });
      alert("Teacher join request sent");
      setJoinCode("");
    } catch (err) {
      alert(err.response?.data?.message || "Request failed");
    }
  };

  return (
    <div className="page-shell">
      <div className="container">
        <div className="topbar">
          <div className="brand">
            <div className="brand-mark">T</div>
            <div>
              <h1>StudyCircle</h1>
              <p>Teacher Dashboard</p>
            </div>
          </div>
          <div className="topbar-actions">
            {me?.username ? <span className="pill">@{me.username}</span> : null}
          </div>
        </div>

        <div className="grid two">
          <div className="card" style={{ gridColumn: "1 / -1" }}>
            <div className="card-header">
              <h3 className="card-title">Request Access via Join Code</h3>
              <p className="card-subtitle">Admin approval required before you can enter group content.</p>
            </div>
            <div className="card-body">
              <div className="form-row" style={{ gridTemplateColumns: "1fr" }}>
                <input
                  className="input"
                  placeholder="Enter Join Code"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value)}
                />
              </div>

              <div className="actions">
                <button className="btn btn-primary" onClick={handleRequest}>
                  Request Access
                </button>
              </div>

              <div className="notice" style={{ marginTop: 12 }}>
                Tip: Keep your code handy—your request will be visible to the group’s admin.
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">What happens next?</h3>
              <p className="card-subtitle">Simple and transparent workflow.</p>
            </div>
            <div className="card-body">
              <div className="list" style={{ marginTop: 0 }}>
                <div className="item-card">1) You submit a join request using the code.</div>
                <div className="item-card">2) Admin reviews and approves or rejects.</div>
                <div className="item-card">3) Approved teachers can view and answer questions.</div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Role</h3>
              <p className="card-subtitle">Teacher-only actions</p>
            </div>
            <div className="card-body">
              <div className="notice">
                You can post answers on question pages and request access to groups using join codes.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

