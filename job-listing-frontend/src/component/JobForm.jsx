import { useState } from "react";

export default function JobForm({ onPost }) {
    const [form, setForm] = useState({
        profile: "",
        desc: "",
        exp: "",
        techs: "",
    });

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // Handle submit
    const handleSubmit = (e) => {
        e.preventDefault();

        // ✅ Convert form to backend-compatible object
        const jobData = {
            profile: form.profile.trim(),
            desc: form.desc.trim(),
            exp: parseInt(form.exp, 10) || 0,
            techs: form.techs
                .split(",")
                .map((t) => t.trim())
                .filter((t) => t.length > 0),
        };

        onPost(jobData); // Send to backend
        setForm({ profile: "", desc: "", exp: "", techs: "" }); // Reset form
    };

    return (
        <form className="job-form" onSubmit={handleSubmit}>
            <h3>Add New Job</h3>

            <label>Profile</label>
            <input
                name="profile"
                placeholder="e.g. Java Developer"
                value={form.profile}
                onChange={handleChange}
                required
            />

            <label>Description</label>
            <textarea
                name="desc"
                placeholder="Brief job description..."
                value={form.desc}
                onChange={handleChange}
                required
            />

            <label>Experience (Years)</label>
            <input
                type="number"
                name="exp"
                placeholder="e.g. 2"
                value={form.exp}
                onChange={handleChange}
                required
                min="0"
            />

            <label>Technologies (comma-separated)</label>
            <input
                name="techs"
                placeholder="e.g. Java, Spring Boot, MongoDB"
                value={form.techs}
                onChange={handleChange}
            />

            <button type="submit">Post Job</button>
        </form>
    );
}
