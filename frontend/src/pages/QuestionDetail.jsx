import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchAnswers, postAnswer } from "../api/answers";
import { fetchMe } from "../api/user";

export default function QuestionDetail() {
  const { questionId } = useParams();

  const [answers, setAnswers] = useState([]);
  const [text, setText] = useState("");
  const [user, setUser] = useState(null);

  // Load current user + answers
  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch logged-in user
        const me = await fetchMe();
        setUser(me.user);

        // Fetch answers
        const ans = await fetchAnswers(questionId);
        setAnswers(ans.data);
      } catch (error) {
        console.log("Load error:", error);
      }
    };

    loadData();
  }, [questionId]);

  // Teacher posts answer
  const handleAnswer = async () => {
    try {
      if (!text.trim()) return alert("Answer cannot be empty");

      await postAnswer(questionId, text);

      setText("");

      // Reload answers after posting
      const ans = await fetchAnswers(questionId);
      setAnswers(ans.data);
    } catch (error) {
      alert(error.response?.data?.message || "Answer failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Question Answers</h2>

      {/* Teacher Only Answer Form */}
      {user?.role === "teacher" && (
        <div style={{ marginBottom: "20px" }}>
          <h3>Post Answer (Teacher Only)</h3>

          <textarea
            rows="4"
            value={text}
            placeholder="Write your answer..."
            onChange={(e) => setText(e.target.value)}
            style={{ width: "100%", padding: "10px" }}
          />

          <br />

          <button onClick={handleAnswer} style={{ marginTop: "10px" }}>
            Submit Answer
          </button>

          <hr />
        </div>
      )}

      {/* Student View */}
      {user?.role !== "teacher" && (
        <p style={{ color: "gray" }}>
          Only teachers can answer. Students can view answers below.
        </p>
      )}

      {/* Answer List */}
      <h3>Answers</h3>

      {answers.length === 0 ? (
        <p>No answers yet.</p>
      ) : (
        answers.map((a) => (
          <div
            key={a._id}
            style={{
              border: "1px solid gray",
              padding: "12px",
              marginTop: "10px",
              borderRadius: "6px",
            }}
          >
            <p>{a.text}</p>

            {/* Verified Badge */}
            <b style={{ color: "green" }}>✅ Verified Teacher Answer</b>
          </div>
        ))
      )}
    </div>
  );
}
