const API_BASE = "http://localhost:8080"; // Spring Boot runs on port 8080 by default

// Fetch all posts or search posts by keyword
export async function fetchJobs(query = "") {
    let url = `${API_BASE}/posts`;
    if (query && query.trim() !== "") {
        // your backend uses path variable, not ?search=
        url = `${API_BASE}/posts/${encodeURIComponent(query)}`;
    }

    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch posts");
    return res.json();
}

// Post a new job (Post object)
export async function postJob(jobData) {
    const res = await fetch(`${API_BASE}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData),
    });
    if (!res.ok) throw new Error("Failed to post job");
    return res.json();
}
