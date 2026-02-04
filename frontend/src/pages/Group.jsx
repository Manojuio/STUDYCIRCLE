import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchGroup } from "../api/groupDetail";
import { fetchResources, addResource } from "../api/resources";
import { fetchQuestions, askQuestion } from "../api/questions";

export default function Group() {
  const { groupId } = useParams();

  const [group, setGroup] = useState(null);

  // Resources
  const [resources, setResources] = useState([]);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  // Questions
  const [questions, setQuestions] = useState([]);
  const [qTitle, setQTitle] = useState("");
  const [description, setDescription] = useState("");

  // Load everything
  useEffect(() => {
    const loadData = async () => {
      const g = await fetchGroup(groupId);
      setGroup(g.data);

      const r = await fetchResources(groupId);
      setResources(r.data);

      const q = await fetchQuestions(groupId);
      setQuestions(q.data);
    };

    loadData();
  }, [groupId]);

  // Add Resource
  const handleAddResource = async () => {
    await addResource(groupId, { title, link });
    setTitle("");
    setLink("");

    const r = await fetchResources(groupId);
    setResources(r.data);
  };

  // Ask Question
  const handleAskQuestion = async () => {
    await askQuestion(groupId, {
      title: qTitle,
      description,
    });

    setQTitle("");
    setDescription("");

    const q = await fetchQuestions(groupId);
    setQuestions(q.data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Group Page</h2>

      {group && (
        <>
          <h3>{group.name}</h3>
          <p>{group.description}</p>
        </>
      )}

      <hr />

      {/* Resources */}
      <h3>Resources</h3>

      <input
        placeholder="Resource title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />

      <button onClick={handleAddResource}>Add Resource</button>

      <ul>
        {resources.map((r) => (
          <li key={r._id}>
            <a href={r.link} target="_blank">
              {r.title}
            </a>
          </li>
        ))}
      </ul>

      <hr />

      {/* Questions */}
      <h3>Questions</h3>

      <input
        placeholder="Question title"
        value={qTitle}
        onChange={(e) => setQTitle(e.target.value)}
      />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button onClick={handleAskQuestion}>Ask</button>

      <ul>
        {questions.map((q) => (
          <li key={q._id}>
  <a href={`/question/${q._id}`}>
    <b>{q.title}</b>
  </a>
  <p>{q.description}</p>
</li>

        ))}
      </ul>
    </div>
  );
}
