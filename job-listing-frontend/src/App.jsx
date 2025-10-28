import { useEffect, useState } from "react";
import Navbar from "./component/Navbar.jsx";
import JobCard from "./component/JobCard.jsx";
import JobForm from "./component/JobForm.jsx";

import { fetchJobs, postJob } from "./api";
import "./App.css";

export default function App() {
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState("");

    const loadJobs = async (query = "") => {
        try {
            const data = await fetchJobs(query);
            setJobs(data);
        } catch {
            setError("Failed to load jobs");
        }
    };

    useEffect(() => {
        loadJobs();
    }, []);

    const handlePost = async (job) => {
        try {
            await postJob(job);
            loadJobs();
        } catch {
            setError("Failed to post job");
        }
    };

    return (
        <div className="app">
            <Navbar onSearch={loadJobs} />
            <div className="content">
                <JobForm onPost={handlePost} />
                {error && <p className="error">{error}</p>}
                <div className="jobs-grid">
                    {jobs.map((job) => (
                        <JobCard key={job.id} job={job} />
                    ))}
                </div>
            </div>
        </div>
    );
}
