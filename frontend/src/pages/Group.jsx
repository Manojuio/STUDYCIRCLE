import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchGroup } from "../api/groupDetail";
import { fetchResources, addResource, deleteResource } from "../api/resources";
import { fetchQuestions, askQuestion } from "../api/questions";

import "../styles/ui.css";

export default function Group() {
  const { groupId } = useParams();

  const [group, setGroup] = useState(null);

  const [resources, setResources] = useState([]);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  const [questions, setQuestions] = useState([]);
  const [qTitle, setQTitle] = useState("");
  const [description, setDescription] = useState("");

  const loadData = async () => {
    const g = await fetchGroup(groupId);
    setGroup(g.data);

    const r = await fetchResources(groupId);
    setResources(r.data);

    const q = await fetchQuestions(groupId);
    setQuestions(q.data);
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupId]);

  const handleAddResource = async () => {
    try {
      await addResource(groupId, { title, link });
      setTitle("");
      setLink("");
      await loadData();
    } catch (err) {
      alert(err.response?.data?.message || "Add resource failed");
    }
  };

  const handleAskQuestion = async () => {
    try {
      if (!qTitle.trim()) return alert("Title is required");
      await askQuestion(groupId, {
        title: qTitle,
        description,
      });
      setQTitle("");
      setDescription("");
      await loadData();
    } catch (err) {
      alert(err.response?.data?.message || "Ask question failed");
    }
  };

  const handleDeleteResource = async (resourceId) => {
    try {
      await deleteResource(resourceId);
      await loadData();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="page-shell">
      <div className="container">
        <div className="topbar">
          <div className="brand">
            <div className="brand-mark">G</div>
            <div>
              <h1>{group?.name || "Group"}</h1>
              <p>{group?.description || "Manage resources and questions."}</p>
            </div>
          </div>
          <div className="topbar-actions">
            <span className="pill">
              Join Code: <span className="mono">{group?.joinCode || "—"}</span>
            </span>
          </div>
        </div>

        <div className="grid two">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Resources</h3>
              <p className="card-subtitle">Links that help the team learn.</p>
            </div>
            <div className="card-body">
              <div className="form-row">
                <input
                  className="input"
                  placeholder="Resource title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <input
                  className="input"
                  placeholder="Link (https://...)"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </div>
              <div className="actions">
                <button className="btn btn-primary" onClick={handleAddResource}>
                  Add Resource
                </button>
              </div>

              <div style={{ marginTop: 16 }}>
                {resources.length === 0 ? (
                  <div className="notice">No resources yet.</div>
                ) : (
                  <div className="list">
                    {resources.map((r) => (
                      <div key={r._id} className="item-card">
                        <div className="item-top">
                          <div>
                            <div style={{ fontWeight: 900 }}>{r.title}</div>
                            <div className="notice" style={{ marginTop: 6 }}>
                              <a href={r.link} target="_blank" rel="noreferrer">
                                {r.link}
                              </a>
                            </div>
                          </div>
                          <div>
                            <button
                              className="btn btn-ghost"
                              onClick={() => handleDeleteResource(r._id)}
                              style={{ padding: "8px 10px" }}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Questions</h3>
              <p className="card-subtitle">Ask and track what your group needs.</p>
            </div>
            <div className="card-body">
              <div className="form-row">
                <input
                  className="input"
                  placeholder="Question title"
                  value={qTitle}
                  onChange={(e) => setQTitle(e.target.value)}
                />
                <input
                  className="input"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="actions">
                <button className="btn btn-success" onClick={handleAskQuestion}>
                  Ask
                </button>
              </div>

              <div style={{ marginTop: 16 }}>
                {questions.length === 0 ? (
                  <div className="notice">No questions yet.</div>
                ) : (
                  <div className="list">
                    {questions.map((q) => (
                      <div key={q._id} className="item-card">
                        <div className="item-top">
                          <div>
                            <div style={{ fontWeight: 900, letterSpacing: "-0.02em" }}>
                              <a href={`/question/${q._id}`}>
                                {q.title}
                              </a>
                            </div>
                            <div className="notice" style={{ marginTop: 6 }}>
                              {q.description}
                            </div>
                          </div>
                          <div>
                            <a className="small-link" href={`/question/${q._id}`}>
                              View
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
    </div>
  );
}

