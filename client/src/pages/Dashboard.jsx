import { useEffect, useState } from 'react';
import axios from "axios";

const client = axios.create({
    baseURL: "http://localhost:8080",
});

export default function Dashboard() {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        client.get('/tasks')
            .then(res => {
                setTasks(res.data.tasks);
            })
            .catch(error => {
                console.error('Error fetching tasks:', error);
            });
    }, []);


    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

    return (
        <div>

            <aside className="aside left"></aside>

            <aside className="aside right"></aside>

            <div className="appcontent dashboard">
                <p>{formattedDate}</p>
                <h1>Welcome back, Sarah</h1>
                <p>Let’s take a look at some upcoming steps:</p>

                <div className="task-cards">
                    {tasks.map((task, index) => (
                        <div className="task-card" key={index}>
                            <h2>{task.title}</h2>
                            <p>{task.description}</p>
                        </div>
                    ))}
                </div>

            </div>


        </div>
    );
}
