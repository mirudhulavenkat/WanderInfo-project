import React, { useEffect, useState } from "react";
import "./App.css";

const backendURL = "http://localhost:4000";

function App() {
  const [countries, setCountries] = useState([]);
  const [places, setPlaces] = useState([]);
  const [country, setCountry] = useState(null);
  const [totalCost, setTotalCost] = useState(0);

  // Load countries on first render
  useEffect(() => {
    loadCountries();
  }, []);

  async function loadCountries() {
    try {
      const res = await fetch(`${backendURL}/countries`);
      if (!res.ok) throw new Error("Backend not reachable");
      const data = await res.json();
      setCountries(data);
      setPlaces([]);
      setCountry(null);
      setTotalCost(0);
    } catch (err) {
      console.error(err);
      alert("⚠️ Backend not running on port 4000!");
    }
  }

  async function loadPlaces(countryId) {
    try {
      const res = await fetch(`${backendURL}/places/${countryId}`);
      const data = await res.json();
      setCountry(data.country);
      setPlaces(data.places);
      setTotalCost(0);
    } catch (err) {
      console.error(err);
      alert("⚠️ Error loading places!");
    }
  }

  function addCost(fee) {
    setTotalCost(totalCost + fee);
  }

  return (
    <div className="App">
      <h1>🌍 WanderInfo – Explore the World</h1>

      {/* Scrolling Flags */}
      <marquee behavior="scroll" direction="left" scrollamount="8">
        <span><img src="https://flagcdn.com/w20/in.png" alt="India" /> India</span>
        <span><img src="https://flagcdn.com/w20/fr.png" alt="France" /> France</span>
        <span><img src="https://flagcdn.com/w20/jp.png" alt="Japan" /> Japan</span>
        <span><img src="https://flagcdn.com/w20/us.png" alt="USA" /> USA</span>
        <span><img src="https://flagcdn.com/w20/it.png" alt="Italy" /> Italy</span>
        <span><img src="https://flagcdn.com/w20/au.png" alt="Australia" /> Australia</span>
        <span><img src="https://flagcdn.com/w20/ca.png" alt="Canada" /> Canada</span>
        <span><img src="https://flagcdn.com/w20/br.png" alt="Brazil" /> Brazil</span>
        <span><img src="https://flagcdn.com/w20/eg.png" alt="Egypt" /> Egypt</span>
        <span><img src="https://flagcdn.com/w20/es.png" alt="Spain" /> Spain</span>
      </marquee>

      {/* Country Buttons */}
      <section id="button-container" className="buttons">
        {countries.map((c) => (
          <button key={c.id} onClick={() => loadPlaces(c.id)}>
            {c.name}
          </button>
        ))}
      </section>

      
      <section id="places-container" className="places">
        {country && <h2>{country.name} ({country.currency})</h2>}
        {places.map((p) => (
          <div key={p.id} className="place">
            <img src={p.image_url} alt={p.name} />
            <h3>{p.name}</h3>
            <p>Entry Fee: {p.entry_fee} {country?.currency}</p>
            <button onClick={() => addCost(p.entry_fee)}>Add</button>
          </div>
        ))}
      </section>

      {/* Total */}
      <div id="total-container" className="total">
        {totalCost > 0 && (
          <>Total Cost: {totalCost.toFixed(2)} {country?.currency}</>
        )}
      </div>

      {/* Refresh Button */}
      <div className="refresh-container">
        <button id="refresh-btn" onClick={loadCountries}>🔄 Refresh</button>
      </div>
    </div>
  );
}

export default App;
