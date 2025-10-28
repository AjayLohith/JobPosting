export default function JobCard({ job }) {
    return (
        <div className="job-card">
            <h2>{job.profile}</h2>
            <p><strong>Experience:</strong> {job.exp} years</p>
            <p>{job.desc}</p>
            {job.techs && job.techs.length > 0 && (
                <div className="tech-list">
                    {job.techs.map((tech, idx) => (
                        <span key={idx} className="tech-badge">{tech}</span>
                    ))}
                </div>
            )}
        </div>
    );
}
