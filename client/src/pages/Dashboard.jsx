export default function Dashboard() {

    const tasks = [
        {
            title: 'Upload Bank Statement',
            description: 'Submit your most recent PDF statement.',
        },
        {
            title: 'Review Pending Cancellations',
            description: 'Check for any accounts awaiting review.',
        },
        {
            title: 'Confirm Completed Actions',
            description: 'Verify that all tasks have been completed.',
        },
    ];

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
