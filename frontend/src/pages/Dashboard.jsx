import { useEffect, useState } from "react";
import {
  fetchUserGroups,
  createGroup,
  joinGroup,
} from "../api/groups";

import "../styles/dashboard.css";

export default function Dashboard() {
  const [groups, setGroups] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [joinCode, setJoinCode] = useState("");

  // Load groups
  const loadGroups = async () => {
    try {
      const data = await fetchUserGroups();
      setGroups(data.data);
    } catch (err) {
      console.log(err.messege)
      alert("Failed to fetch groups");
    }
  };

useEffect(() => {
  const fetchGroups = async () => {
    try {
      const data = await fetchUserGroups();
      setGroups(data.data);
    } catch (error) {
      console.log("Fetch error:", error);
      alert("Failed to fetch groups");
    }
  };

  fetchGroups();
}, []);

  // Create group handler
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

  // Join group handler
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

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>

      {/* Create Group */}
      <div className="card">
        <h3>Create Group</h3>

        <input
          placeholder="Group Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Group Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button onClick={handleCreate}>Create</button>
      </div>

      {/* Join Group */}
      <div className="card">
        <h3>Join Group</h3>

        <input
          placeholder="Enter Join Code"
          value={joinCode}
          onChange={(e) => setJoinCode(e.target.value)}
        />

        <button onClick={handleJoin}>Join</button>
      </div>

      {/* Groups List */}
      <div className="card">
        <h3>My Groups</h3>

        {groups.length === 0 ? (
          <p>No groups yet.</p>
        ) : (
          groups.map((g) => (
            <div key={g._id} className="group-box">
              <h4>{g.name}</h4>
              <p>{g.description}</p>

              <a href={`/group/${g._id}`}>Enter Group</a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
