// src/pages/Dashboard.jsx
import React from 'react';

const tasks = [
  { id: 1, title: "Finish report", description: "Complete the quarterly report by Friday" },
  { id: 2, title: "Team meeting", description: "Discuss project status with the team" },
  { id: 3, title: "Code review", description: "Review PR #234 in GitHub" },
];

export default function Dashboard({ userName }) {
  return (
    <div>
      <h1>Welcome to the Dashboard, {userName}!</h1>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {tasks.map(task => (
          <div 
            key={task.id} 
            style={{ 
              border: '1px solid #ccc', 
              borderRadius: '8px', 
              padding: '1rem', 
              width: '250px',
              boxShadow: '2px 2px 6px rgba(0,0,0,0.1)'
            }}
          >
            <h3>{task.title}</h3>
            <p>{task.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
