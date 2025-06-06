import React, { useState } from "react";

/**
 * WeatherMoodSync
 * Main container for syncing weather and mood to provide uplifting suggestions.
 * Allows users to input a city, select a mood, fetch current weather, and displays a mood booster message.
 */
 // PUBLIC_INTERFACE
function WeatherMoodSync() {
  // State management
  const [city, setCity] = useState("");
  const [mood, setMood] = useState("Happy");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Mood options for dropdown
  const moodOptions = ["Happy", "Sad", "Tired", "Anxious", "Excited"];

  // Mood and weather-based suggestions
  // More moods or weather types can be added in the future
  const moodBoosters = {
    Happy: {
      clear: "It's a clear, beautiful day! Enjoy the outdoors and savor your happy vibes!",
      rain: "Even happy days can have rain—have a cozy treat indoors and keep shining!",
      clouds: "Clouds can't hide your smile! Find a new playlist and dance indoors.",
      default: "Keep spreading your happiness, come rain or shine!"
    },
    Sad: {
      clear: "The sun is out—great time for a short walk or a chat with a friend.",
      rain: "Rainy days are perfect for warm drinks and a favorite movie. You got this.",
      clouds: "Cloudy mood, cloudy weather? Try journaling or indoor crafts!",
      default: "Every mood passes. Be kind to yourself—a small treat goes a long way."
    },
    Tired: {
      clear: "Soak in some sunlight and stretch out. Fresh air helps recharge!",
      rain: "Perfect day for a nap or reading a good book with a cup of tea.",
      clouds: "Take it easy—listen to your body and maybe do a gentle yoga session.",
      default: "Rest is productive, too. Listen to slow music and relax a bit."
    },
    Anxious: {
      clear: "Try mindful breathing outdoors or a gentle walk under the open sky.",
      rain: "Focus on the sound of rain—it can be calming. Maybe make a gratitude list.",
      clouds: "Cloudy sky—cloudy thoughts. Light a candle, breathe deep, and let it pass.",
      default: "Pause, take 5 deep breaths, and remember—you're doing your best."
    },
    Excited: {
      clear: "Let your excitement run wild! Go outside, take photos, and make memories!",
      rain: "Turn the rain into your concert—dance indoors or start a fun indoor project.",
      clouds: "Clouds can't stop you! Invite friends over or play a favorite upbeat game.",
      default: "Channel your energy into something creative and fun!"
    }
  };

  /**
   * Gets a mood-boosting message based on mood and weather.
   */
  function getMoodBooster(mood, weatherMain) {
    if (!moodBoosters[mood]) return "";
    let key = "default";
    if (!weatherMain) return moodBoosters[mood][key];
    const main = weatherMain.toLowerCase();
    if (main.includes("clear")) key = "clear";
    else if (main.includes("rain")) key = "rain";
    else if (main.includes("cloud")) key = "clouds";
    return moodBoosters[mood][key] || moodBoosters[mood]["default"];
  }

  /**
   * Handles weather and suggestion fetching after submitting the form.
   */
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setWeather(null);

    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    try {
      // IMPORTANT: Replace with a real API key before production
      const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY";
      const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
      const response = await fetch(endpoint);
      if (!response.ok) {
        if (response.status === 404) {
          setError("City not found. Please check the spelling.");
        } else {
          setError("Error fetching weather. Please try again.");
        }
        setLoading(false);
        return;
      }
      const data = await response.json();
      setWeather({
        description: data.weather[0].description,
        main: data.weather[0].main,
        temp: data.main.temp,
        icon: data.weather[0].icon,
        city: data.name
      });
    } catch (err) {
      setError("Oops, something went wrong!");
    }
    setLoading(false);
  }

  return (
    <div className="container" style={{ maxWidth: 400, marginTop: 120, marginBottom: 32 }}>
      <div
        style={{
          background: "var(--base-light, #53d5fd)",
          borderRadius: 18,
          padding: 24,
          boxShadow: "0 2px 12px rgba(66,66,100,0.08)",
          textAlign: "center"
        }}
      >
        <h2 style={{ marginTop: 0, marginBottom: 12, color: "#fff", letterSpacing: 1, fontWeight: 700 }}>
          Weather & Mood Booster
        </h2>
        <form onSubmit={handleSubmit} style={{ marginBottom: 14 }}>
          <input
            type="text"
            aria-label="City"
            placeholder="Enter your city"
            value={city}
            onChange={e => setCity(e.target.value)}
            style={{
              width: "100%",
              padding: 10,
              fontSize: "1rem",
              border: "none",
              borderRadius: 6,
              marginBottom: 10,
              outline: "none"
            }}
            autoComplete="off"
          />
          <select
            aria-label="Mood"
            value={mood}
            onChange={e => setMood(e.target.value)}
            style={{
              width: "100%",
              padding: 9,
              fontSize: "1rem",
              border: "none",
              borderRadius: 6,
              marginBottom: 14,
              outline: "none",
              background: "#f0fbff"
            }}
          >
            {moodOptions.map(opt =>
              <option key={opt} value={opt}>{opt}</option>
            )}
          </select>
          <button
            className="btn btn-large"
            type="submit"
            style={{ width: "100%", borderRadius: 8, fontWeight: 600, marginBottom: 6 }}
            disabled={loading}
          >
            {loading ? "Loading..." : "Get Mood Booster"}
          </button>
        </form>
        {error &&
          <div style={{
            background: "#fbeee0",
            color: "#e87a41",
            borderRadius: 6,
            padding: "6px 12px",
            fontWeight: 500,
            marginBottom: 10
          }}>
            {error}
          </div>
        }
        {weather &&
          <div
            style={{
              marginTop: 10,
              background: "#fff",
              borderRadius: 12,
              color: "#1A1A1A",
              padding: 18,
              boxShadow: "0 1px 6px rgba(66,66,100,0.08)",
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 2 }}>
              {weather.city}
            </div>
            <div style={{ margin: "8px 0" }}>
              <img
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt={weather.description}
                width={48}
                height={48}
                style={{ verticalAlign: "middle" }}
              />
              <span style={{ fontSize: 20, fontWeight: 400 }}>
                {Math.round(weather.temp)}°C - {weather.description}
              </span>
            </div>
            <div style={{
              marginTop: 10, fontWeight: 500, color: "var(--base-light)",
            }}>
              {getMoodBooster(mood, weather.main)}
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default WeatherMoodSync;
