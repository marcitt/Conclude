// src/pages/Dashboard.jsx

import React from "react";
import { Link } from "react-router-dom";
import tasks from "../data/tasks";
import ArticlesSidebar from "../components/ArticlesSidebar"; // adjust path as needed

const today = new Date();
const formattedDate = today.toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

const articles = [
  {
    id: 1,
    title: "How to Save More Money",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    link: "#",
  },
  {
    id: 2,
    title: "Understanding Your Bank Statement",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    link: "#",
  },
];

function TaskSteps({ steps }) {
  return (
    <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      {steps.map(step => (
        <Link
          key={step.id}
          to={step.path}
        >
          <span>
            {step.title}
          </span>
        </Link>
      ))}
    </div>
  );
}

export default function Dashboard({ userName }) {
  return (
     <div
  style={{
    marginTop: "100px",
    marginRight: "300px",  // space for sidebar on right
    marginLeft: "auto",   // push content from left side
    paddingLeft: "2rem",  // add some space from left edge
    maxWidth: "1200px",   // wider max width to give more horizontal room
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  }}>
      <div>
      <p style={{ textAlign: "left" }}>{formattedDate}</p>
      <h1 style={{ textAlign: "left" }}>Welcome back {userName}</h1>
      <p style={{ textAlign: "left" }}>Let's take a look at some upcoming steps</p>

      {/* NEW: flex container to hold tasks and sidebar side by side */}
      <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
        {/* Tasks container: flex-grow so it takes available space */}
        <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: "2rem" }}>
          {tasks.map((task) => (
            <div
              key={task.id}
              style={{
                border: "1px solid #E9E9E9",
                borderRadius: "12px",
                padding: "1.5rem",
                backgroundColor: "#F3F3FF",
              }}
            >
              <h3 style={{ marginBottom: "0.5rem", color: "#2F2E30" }}>{task.title}</h3>
              <p style={{ margin: 0, color: "#5a5a5a" }}>{task.description}</p>
              <TaskSteps steps={task.steps} />
            </div>
          ))}
        </div>
      </div>

        {/* Sidebar */}
        <aside
        style={{
          position: "fixed",
          top: "0",
          right: "0",
          width: "300px",
          height: "100vh",
          borderLeft: "1px solid #e9e9e9",
          padding: "1rem",
          backgroundColor: "#fafaff",
          overflowY: "auto",
          boxSizing: "border-box",
        }}
        >
          <ArticlesSidebar />
        </aside>
      </div>
    </div>
  );
}

