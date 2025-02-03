import React, { useState, useEffect } from "react";

// The main component for displaying and interacting with the bots
function App() {
  const [bots, setBots] = useState([]);
  const [army, setArmy] = useState([]);

  // Fetch bots from the backend
  useEffect(() => {
    fetch("https://bots-si0g.onrender.com/bots")
      .then((response) => response.json())
      .then((data) => setBots(data))
      .catch((error) => console.error("Error fetching bots:", error));
  }, []);

  // Add bot to army
  const addBotToArmy = (bot) => {
    console.log("Adding bot to army:", bot); // Debug log
    if (!army.some((b) => b.id === bot.id)) {
      setArmy((prevArmy) => [...prevArmy, bot]);
    }
  };

  // Release bot from army
  const releaseBotFromArmy = (bot) => {
    console.log("Releasing bot from army:", bot); // Debug log
    setArmy((prevArmy) => prevArmy.filter((b) => b.id !== bot.id));
  };

  // Discharge bot (delete bot from backend and army)
  const dischargeBot = async (botId) => {
    console.log("Discharging bot with ID:", botId); // Debug log
    try {
      await fetch(`https://bots-si0g.onrender.com/bots/${botId}`, { method: "DELETE" });

      // Remove the discharged bot from the army and bot collection
      setArmy((prevArmy) => prevArmy.filter((b) => b.id !== botId));
      setBots((prevBots) => prevBots.filter((b) => b.id !== botId));
    } catch (error) {
      console.error("Error discharging bot:", error);
    }
  };

  return (
    <div className="App">
      <h1>Bot Battlr</h1>

      <div>
        {/* Bot Collection */}
        <h2>Bot Collection</h2>
        <div className="bot-collection">
          {bots.map((bot) => (
            <div key={bot.id} className="bot">
              <img src={bot.avatar_url} alt={bot.name} />
              <h3>{bot.name}</h3>
              <p>Health: {bot.health}</p>
              <p>Damage: {bot.damage}</p>
              <p>Armor: {bot.armor}</p>
              <p>Class: {bot.bot_class}</p>
              <p>Catchphrase: {bot.catchphrase}</p>

              {/* Add to Army button */}
              <button onClick={() => addBotToArmy(bot)}>Add to Army</button>
            </div>
          ))}
        </div>
      </div>

      <div>
        {/* Your Bot Army */}
        <h2>Your Bot Army</h2>
        <div className="bot-army">
          {army.map((bot) => (
            <div key={bot.id} className="bot">
              <img src={bot.avatar_url} alt={bot.name} />
              <h3>{bot.name}</h3>
              <p>Health: {bot.health}</p>
              <p>Damage: {bot.damage}</p>
              <p>Armor: {bot.armor}</p>
              <p>Class: {bot.bot_class}</p>
              <p>Catchphrase: {bot.catchphrase}</p>

              {/* Release button */}
              <button onClick={() => releaseBotFromArmy(bot)}>Release</button>

              {/* Discharge button */}
              <button onClick={() => dischargeBot(bot.id)}>Discharge</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
