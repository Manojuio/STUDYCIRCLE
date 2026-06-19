import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchUserGroups,
  createGroup,
  joinGroup,
  fetchPendingTeacherRequests,
  approveTeacherJoin,
} from "../api/groups";

import "../styles/ui.css";

import { fetchMe } from "../api/user";

export default function Dashboard() {
  const navigate = useNavigate();

  const [groups, setGroups] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [joinCode, setJoinCode] = useState("");

  const [pending, setPending] = useState([]);
  const [pendingLoading, setPendingLoading] = useState(false);

  const loadGroups = async () => {
    try {
      const data = await fetchUserGroups();
      setGroups(data.data);
    } catch (err) {
      console.log(err.messege);
      alert("Failed to fetch groups");
    }
  };

  const loadPending = async () => {
    try {
      setPendingLoading(true);
      const res = await fetchPendingTeacherRequests();
      setPending(res?.data || []);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to load teacher requests");
    } finally {
      setPendingLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const r = await fetchMe();
        if (r.user?.role === "admin") window.location.href = "/admin";
        if (r.user?.role === "teacher") window.location.href = "/teacher";
      } catch {
        // ignore
      }

      await loadGroups();
      await loadPending();
    };

    init();
  }, []);

  const handleCreate = async () => {
    try {
      await createGroup({ name, description });
      alert("Group created");

      setName("");
      setDescription("");

      loadGroups();
    } catch (err) {
      alert(err.response?.data?.message || "Create failed");
    }
  };

  const handleJoin = async () => {
    try {
      await joinGroup({ joinCode });
      alert("Joined group");

      setJoinCode("");
      loadGroups();
    } catch (err) {
      alert(err.response?.data?.message || "Join failed");
    }
  };

  const handleDecision = async (groupId, teacherId, approve) => {
    try {
      await approveTeacherJoin({ groupId, teacherId, approve });
      await loadPending();

      if (approve && groupId) {
        navigate(`/group/${groupId}`);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="page-shell">
      <div className="container">
        <div className="topbar">
          <div className="brand">
            <div className="brand-mark">S</div>
            <div>
              <h1>StudyCircle</h1>
              <p>Student Dashboard</p>
            </div>
          </div>
          <div className="topbar-actions">
            <span className="pill">Groups: {groups.length}</span>
          </div>
        </div>

        <div className="grid two">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Create Group</h3>
              <p className="card-subtitle">Start a new class space.</p>
            </div>
            <div className="card-body">
              <div className="form-row">
                <input
                  className="input"
                  placeholder="Group Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className="input"
                  placeholder="Group Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="actions">
                <button className="btn btn-primary" onClick={handleCreate}>
                  Create
                </button>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Join Group</h3>
              <p className="card-subtitle">Use a join code from your teacher.</p>
            </div>
            <div className="card-body">
              <div className="form-row">
                <input
                  className="input"
                  placeholder="Enter Join Code"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value)}
                />
              </div>

              <div className="actions">
                <button className="btn btn-success" onClick={handleJoin}>
                  Join as Student
                </button>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Teacher Join Requests</h3>
              <p className="card-subtitle">Approve requests for your group.</p>
            </div>
            <div className="card-body">
              {pendingLoading ? (
                <p className="notice">Loading...</p>
              ) : pending.length === 0 ? (
                <p className="notice">No pending requests.</p>
              ) : (
                <div className="list">
                  {pending.map((r) => (
                    <div key={r.memberId} className="item-card">
                      <div className="item-top">
                        <div>
                          <div className="kv">
                            <div className="k">Group</div>
                            <div className="v">{r.group?.name}</div>

                            <div className="k">Teacher</div>
                            <div className="v">
                              {r.teacher?.username} {" "}
                              <span className="mono">({r.teacherId})</span>
                            </div>

                            <div className="k">Status</div>
                            <div className="v">{r.joinStatus}</div>
                          </div>
                        </div>

                        <div>
                          <span className="badge badge-warning">Pending</span>
                        </div>
                      </div>

                      <div className="actions" style={{ marginTop: 12 }}>
                        <button
                          onClick={() =>
                            handleDecision(r.group._id, r.teacherId, true)
                          }
                          className="btn btn-success"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            handleDecision(r.group._id, r.teacherId, false)
                          }
                          className="btn btn-danger"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="card" style={{ gridColumn: "1 / -1" }}>
            <div className="card-header">
              <h3 className="card-title">My Groups</h3>
              <p className="card-subtitle">Jump into your learning spaces.</p>
            </div>
            <div className="card-body">
              {groups.length === 0 ? (
                <p className="notice">No groups yet.</p>
              ) : (
                <div className="grid three">
                  {groups.map((g) => (
                    <div key={g._id} className="item-card">
                      <div className="item-top">
                        <div>
                          <div style={{ fontWeight: 900, letterSpacing: "-0.02em" }}>
                            {g.name}
                          </div>
                          <div className="notice" style={{ marginTop: 6 }}>
                            {g.description}
                          </div>

                          <div className="notice" style={{ marginTop: 10 }}>
                            <span className="join-code">Join Code: </span>
                            <span className="mono">{g.joinCode || "—"}</span>
                          </div>
                        </div>
                        <div>
                          <a className="small-link" href={`/group/${g._id}`}>
                            Enter
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

