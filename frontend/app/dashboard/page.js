"use client";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [profile, setProfile] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:3000/profile", {
      headers: { Authorization: "Bearer " + token }
    })
      .then(res => res.json())
      .then(setProfile);

    fetch("http://localhost:5000/")
      .then(res => res.json())
      .then(setPosts);
  }, []);

  return (
    <div>
      <h1>Welcome {profile?.name}</h1>
      <h2>Posts:</h2>
      {posts.map(p => (
        <div key={p._id}>
          <h3>{p.title}</h3>
          <p>{p.body}</p>
        </div>
      ))}
    </div>
  );
}
