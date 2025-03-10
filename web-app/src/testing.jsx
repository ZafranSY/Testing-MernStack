import React, { useState } from "react";
import axios from "axios";

function Testing() {
  const [formData, setFormData] = useState({
    emotion: "",
    mood: "",
    mood_intensity: 5,
    stress_level: "Medium",
    genres: [],
  });

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log("Sending data:", formData);
      const response = await axios.post("http://localhost:5000/api/recommend", formData);
      console.log("Received response:", response.data);
      setRecommendations(response.data.recommendations || []);


    } catch (error) {
      console.error("Error fetching recommendations", error);
      setError(error.response?.data?.message || error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Movie Mood Matcher</h1>
      <div className="card p-4 mb-4">
        <div className="mb-3">
          <label className="form-label">
            Emotion:
            <input
              type="text"
              className="form-control"
              name="emotion"
              value={formData.emotion}
              onChange={handleChange}
              placeholder="e.g., happy, sad, excited"
            />
          </label>
        </div>
        
        <div className="mb-3">
          <label className="form-label">
            Mood:
            <input
              type="text"
              className="form-control"
              name="mood"
              value={formData.mood}
              onChange={handleChange}
              placeholder="e.g., relaxed, energetic"
            />
          </label>
        </div>
        
        <div className="mb-3">
          <label className="form-label">
            Mood Intensity (1-10):
            <input
              type="range"
              className="form-range"
              min="1"
              max="10"
              name="mood_intensity"
              value={formData.mood_intensity}
              onChange={handleChange}
            />
            <span>{formData.mood_intensity}</span>
          </label>
        </div>
        
        <div className="mb-3">
          <label className="form-label">
            Stress Level:
            <select
              className="form-select"
              name="stress_level"
              value={formData.stress_level}
              onChange={handleChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </label>
        </div>
        
        <div className="mb-3">
          <label className="form-label">
            Genres (comma-separated):
            <input
              type="text"
              className="form-control"
              name="genres"
              value={formData.genres.join(",")}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  genres: e.target.value.split(",").map(g => g.trim()).filter(g => g),
                }))
              }
              placeholder="e.g., action, comedy, drama"
            />
          </label>
        </div>
        
        <button 
          className="btn btn-primary" 
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Loading..." : "Get Recommendations"}
        </button>
      </div>

      {error && (
        <div className="alert alert-danger">
          Error: {error}
        </div>
      )}

      <h2>Recommendations</h2>
      {recommendations.length > 0 ? (
        <div className="row">
          {recommendations.map((rec, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">{rec.Title}</h3>
                  <p className="card-text">Match Score: {(rec.Score * 100).toFixed(2)}%</p>
                  {rec.Genre && (
                    <p>Genre: {Array.isArray(rec.Genre) ? rec.Genre.join(", ") : rec.Genre}</p>
                  )}
                  {rec.Emotion && (
                    <p>Emotion: {rec.Emotion}</p>
                  )}
                  {rec.Mood && (
                    <p>Mood: {rec.Mood}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No recommendations yet. Fill out the form and click "Get Recommendations".</p>
      )}
    </div>
  );
}

export default Testing;