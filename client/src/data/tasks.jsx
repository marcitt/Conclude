// src/data/tasks.js

const tasks = [
  {
    id: 1,
    title: "Manage bank statements",
    description: "Upload your bank statements and manage subscriptions",
    steps: [
      { id: 1, title: "Upload statement", path: "/upload", status: "completed" },
      { id: 2, title: "Identify hidden accounts", path: "/dashboard", status: "current" },
      { id: 3, title: "Select accounts to cancel", path: "/cancel", status: "pending" },
    ],
  },
  {
    id: 2,
    title: "Profile setup",
    description: "Complete your profile information",
    steps: [
      { id: 1, title: "Enter personal info", path: "/profile/info", status: "completed" },
      { id: 2, title: "Set preferences", path: "/profile/preferences", status: "pending" },
    ],
  },
];

export default tasks;
