import React, { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import usMap from "../us-states.json"; // Ensure you have a GeoJSON file
import { Feature } from "geojson";
import states from  "../states.json";

interface CustomFeature extends Feature {
  rsmKey: string;
  properties: {
    NAME: string;
  };
}
const statesList = states;

const States: React.FC = () => {
  const [shuffledStates, setShuffledStates] = useState<string[]>([]);
  const [currentState, setCurrentState] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [guessedStates, setGuessedStates] = useState<Set<string>>(new Set());
  const [attempts, setAttempts] = useState<{ [key: string]: number }>({});
  const [currentAttempts, setCurrentAttempts] = useState<number>(0);
  const [tempStateName, setTempStateName] = useState<string | null>(null);

  useEffect(() => {
    const shuffled = [...statesList].sort(() => Math.random() - 0.5);
    setShuffledStates(shuffled);
    setCurrentState(shuffled[0]);
  }, []);

  const handleStateClick = (stateName: string) => {
    if (stateName === currentState) {
      setScore(score + 1);
      setGuessedStates(new Set(guessedStates).add(stateName));
      setAttempts((prevAttempts) => ({
        ...prevAttempts,
        [stateName]: currentAttempts + 1,
      }));
      const nextIndex = shuffledStates.indexOf(currentState!) + 1;
      if (nextIndex < shuffledStates.length) {
        setCurrentState(shuffledStates[nextIndex]);
        setCurrentAttempts(0);
      } else {
        alert(`Väl spelat! Du klarade ${score + 1}/${statesList.length} stater!`);
      }
    } else {
      setCurrentAttempts(currentAttempts + 1);
      setTempStateName(stateName);
      setTimeout(() => {
        setTempStateName(null);
      }, 3000);
    }
  };

  const getFillColor = (stateName: string) => {
    const attemptCount = attempts[stateName] || 0;
    if (guessedStates.has(stateName)) {
      if (attemptCount === 1) return "#00FF00"; // Green
      if (attemptCount === 2) return "#8ec961"; // Light green
      if (attemptCount === 3) return "#fff200"; // Yellow
      return "#FF0000"; // Red for 4 or more attempts
    }
    return "#D6D6DA"; // Default color
  };

  return (
    <div className="states-container">
      <h1>{currentState}</h1>
      {tempStateName && (
        <div
          style={{
            position: "absolute",
            top: "20 %",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            zIndex: 1000,
          }}
        >
          {tempStateName}
        </div>
      )}
      <ComposableMap projection="geoAlbersUsa">
        <Geographies geography={usMap}>
          {({ geographies }: { geographies: CustomFeature[] }) =>
            geographies.map((geo) => {
              const fillColor = getFillColor(geo.properties.NAME);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => handleStateClick(geo.properties?.NAME || "Unknown")}
                  style={{
                    default: { fill: fillColor, stroke: "#FFF", outline: "none" },
                    hover: { fill: "#F53", cursor: "pointer", outline: "none" },
                    pressed: { fill: "#E42", outline: "none" },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default States;
