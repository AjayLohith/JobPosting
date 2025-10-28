import { useState } from "react";

export default function Navbar({ onSearch }) {
    const [query, setQuery] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <nav className="navbar">
            <h1 className="logo">Job<span>List</span></h1>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search jobs..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
        </nav>
    );
}
