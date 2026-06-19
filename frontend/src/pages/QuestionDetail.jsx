import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchAnswers, postAnswer } from "../api/answers";
import { fetchMe } from "../api/user";

import "../styles/ui.css";


export default function QuestionDetail() {
  const { questionId } = useParams();

  const [answers, setAnswers] = useState([]);
  const [text, setText] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const run = async () => {
      try {
        const me = await fetchMe();
        setUser(me.user);

        const ans = await fetchAnswers(questionId);
        setAnswers(ans.data);
      } catch {
        // keep silent - UI will show empty state
      }
    };

    run();
  }, [questionId]);



  const handleAnswer = async () => {
    try {
      if (!text.trim()) return alert("Answer cannot be empty");

      await postAnswer(questionId, text);
      setText("");
      const ans = await fetchAnswers(questionId);
      setAnswers(ans.data);
    } catch (error) {
      alert(error.response?.data?.message || "Answer failed");
    }
  };

  return (
    <div className="page-shell">
      <div className="container">
        <div className="topbar">
          <div className="brand">
            <div className="brand-mark">Q</div>
            <div>
              <h1>Question Answers</h1>
              <p>{user?.role === "teacher" ? "Post and refine answers" : "Read teacher answers"}</p>
            </div>
          </div>
          <div className="topbar-actions">
            <span className="pill">Answers: {answers.length}</span>
          </div>
        </div>

        <div className="grid two">
          <div className="card" style={{ gridColumn: "1 / -1" }}>
            <div className="card-header">
              <h3 className="card-title">Answer Board</h3>
              <p className="card-subtitle">
                {user?.role === "teacher"
                  ? "Teacher-only composer"
                  : "Students can view answers"}
              </p>
            </div>
            <div className="card-body">
              {user?.role === "teacher" ? (
                <div className="card" style={{ background: "rgba(255,255,255,0.70)", marginBottom: 16 }}>
                  <div className="card-header">
                    <h3 className="card-title">Post an answer</h3>
                    <p className="card-subtitle">Write clearly. Keep it helpful.</p>
                  </div>
                  <div className="card-body">
                    <textarea
                      className="input textarea"
                      rows={5}
                      value={text}
                      placeholder="Write your answer..."
                      onChange={(e) => setText(e.target.value)}
                    />
                    <div className="actions">
                      <button className="btn btn-primary" onClick={handleAnswer}>
                        Submit Answer
                      </button>
                      <span className="notice">Your answer will show up instantly.</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="notice" style={{ marginBottom: 14 }}>
                  Only teachers can answer. Students can view answers below.
                </div>
              )}

              <div className="section-title">Answers</div>

              {answers.length === 0 ? (
                <p className="notice">No answers yet.</p>
              ) : (
                <div className="list">
                  {answers.map((a) => (
                    <div key={a._id} className="item-card">
                      <div className="item-top">
                        <div>
                          <div style={{ fontWeight: 900 }}>Teacher Answer</div>
                          <div className="notice" style={{ marginTop: 6 }}>
                            {a.text}
                          </div>
                        </div>
                        <div>
                          <span className="badge badge-success">✅ Verified</span>
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

