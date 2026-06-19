import { useEffect, useState } from "react";
import { fetchPendingTeacherRequests, approveTeacherJoin } from "../api/groups";
import { fetchMe } from "../api/user";

import "../styles/ui.css";

export default function AdminDashboard() {
  const [pending, setPending] = useState([]);
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadPending = async () => {
    try {
      setLoading(true);
      const res = await fetchPendingTeacherRequests();
      setPending(res?.data || []);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to load pending requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const r = await fetchMe();
        setMe(r.user);
      } catch {
        // ignore
      }
      await loadPending();
    };

    init();
  }, []);

  const handleDecision = async (groupId, teacherId, approve) => {
    try {
      await approveTeacherJoin({ groupId, teacherId, approve });
      await loadPending();
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="page-shell">
      <div className="container">
        <div className="topbar">
          <div className="brand">
            <div className="brand-mark">A</div>
            <div>
              <h1>StudyCircle</h1>
              <p>Admin Dashboard</p>
            </div>
          </div>
          <div className="topbar-actions">
            {me?.username ? <span className="pill">@{me.username}</span> : null}
          </div>
        </div>

        <div className="grid two">
          <div className="card" style={{ gridColumn: "1 / -1" }}>
            <div className="card-header">
              <h3 className="card-title">Teacher Join Requests</h3>
              <p className="card-subtitle">Approve teachers to unlock group content.</p>
            </div>
            <div className="card-body">
              {loading ? (
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
                              {r.teacher?.username} <span className="mono">({r.teacherId})</span>
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
                          onClick={() => handleDecision(r.group._id, r.teacherId, true)}
                          className="btn btn-success"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleDecision(r.group._id, r.teacherId, false)}
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
        </div>
      </div>
    </div>
  );
}

