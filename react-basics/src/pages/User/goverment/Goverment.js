// Government Schemes Component
import React, { useState, useEffect } from "react";

const FarmerSchemes = () => {
  const [schemes, setSchemes] = useState([]); // List of schemes
  const [filteredSchemes, setFilteredSchemes] = useState([]); // Filtered schemes for display
  const [query, setQuery] = useState(""); // Search query
  const [selectedCategory, setSelectedCategory] = useState("All"); // Selected category filter
  const [sortOrder, setSortOrder] = useState("asc"); // Sorting order

  // Mock data for schemes (replace with API response if available)
  const schemeData = [
    {
      id: 1,
      name: "Pradhan Mantri Fasal Bima Yojana",
      description: "Provides crop insurance to farmers to protect against crop loss due to natural calamities.",
      category: "Insurance",
      link: "https://pmfby.gov.in",
    },
    {
      id: 2,
      name: "Kisan Credit Card (KCC)",
      description: "Offers short-term loans to farmers at subsidized interest rates.",
      category: "Loan",
      link: "https://kcc.gov.in",
    },
    {
      id: 3,
      name: "PM-Kisan Samman Nidhi",
      description: "Provides direct financial assistance of ₹6,000/year to small and marginal farmers.",
      category: "Subsidy",
      link: "https://pmkisan.gov.in",
    },
    {
      id: 4,
      name: "Paramparagat Krishi Vikas Yojana",
      description: "Promotes organic farming practices.",
      category: "Organic Farming",
      link: "https://pkvy.gov.in",
    },
    {
      id: 5,
      name: "Pradhan Mantri Krishi Sinchai Yojana",
      description: "Supports micro-irrigation and water conservation.",
      category: "Irrigation",
      link: "https://pmksy.gov.in",
    },
    {
      id: 6,
      name: "Soil Health Card Scheme",
      description: "Provides soil health cards to farmers for better soil management.",
      category: "Soil Management",
      link: "https://soilhealth.dac.gov.in",
    },
    {
      id: 7,
      name: "Rashtriya Krishi Vikas Yojana",
      description: "Supports holistic development of agriculture and allied sectors.",
      category: "Development",
      link: "https://rkvy.nic.in",
    },
    {
      id: 8,
      name: "National Mission on Sustainable Agriculture",
      description: "Focuses on sustainable agriculture and climate resilience.",
      category: "Sustainability",
      link: "https://nmsa.gov.in",
    },
  ];

  useEffect(() => {
    // Fetch schemes (replace with API fetch logic if available)
    setSchemes(schemeData);
    setFilteredSchemes(schemeData);
  }, []);

  // Handle search functionality
  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    filterSchemes(value, selectedCategory);
  };

  // Handle filtering by category
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    filterSchemes(query, category);
  };

  // Filter schemes based on search query and selected category
  const filterSchemes = (searchQuery, category) => {
    let filtered = schemes;

    if (searchQuery) {
      filtered = filtered.filter(
        (scheme) =>
          scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          scheme.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (category !== "All") {
      filtered = filtered.filter((scheme) => scheme.category === category);
    }

    setFilteredSchemes(filtered);
  };

  // Handle sorting
  const handleSort = () => {
    const sorted = [...filteredSchemes].sort((a, b) => {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });
    setFilteredSchemes(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2>Government Schemes for Farmers</h2>

      {/* Search bar */}
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for schemes..."
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          marginBottom: "10px",
          borderRadius: "5px",
          border: "1px solid #ddd",
        }}
      />

      {/* Category filter */}
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          marginBottom: "10px",
          borderRadius: "5px",
          border: "1px solid #ddd",
        }}
      >
        <option value="All">All Categories</option>
        <option value="Insurance">Insurance</option>
        <option value="Loan">Loan</option>
        <option value="Subsidy">Subsidy</option>
        <option value="Organic Farming">Organic Farming</option>
        <option value="Irrigation">Irrigation</option>
        <option value="Soil Management">Soil Management</option>
        <option value="Development">Development</option>
        <option value="Sustainability">Sustainability</option>
      </select>

      {/* Sort button */}
      <button
        onClick={handleSort}
        style={{
          padding: "10px",
          fontSize: "16px",
          marginBottom: "20px",
          borderRadius: "5px",
          border: "1px solid #ddd",
          cursor: "pointer",
          backgroundColor: "#007bff",
          color: "white",
        }}
      >
        Sort by Name ({sortOrder === "asc" ? "Ascending" : "Descending"})
      </button>

      {/* Embedded YouTube video */}
      <div style={{ marginBottom: "20px" }}>
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/example_video_id"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Display filtered schemes */}
      {filteredSchemes.length > 0 ? (
        <ul
          style={{
            listStyleType: "none",
            padding: 0,
          }}
        >
          {filteredSchemes.map((scheme) => (
            <li
              key={scheme.id}
              style={{
                marginBottom: "20px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                padding: "15px",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h3>{scheme.name}</h3>
              <p>{scheme.description}</p>
              <p>
                <strong>Category:</strong> {scheme.category}
              </p>
              <a
                href={scheme.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#007bff", textDecoration: "none" }}
              >
                Learn More
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No schemes found matching your search criteria.</p>
      )}
    </div>
  );
};

export default FarmerSchemes;
