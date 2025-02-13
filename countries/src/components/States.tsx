import React, { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import usMap from "../us-states.json"; // Ensure you have a GeoJSON file
import { Feature } from "geojson";

interface CustomFeature extends Feature {
  rsmKey: string;
}

const statesList = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
  "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
  "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana",
  "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota",
  "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee",
  "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

const States: React.FC = () => {
  const [shuffledStates, setShuffledStates] = useState<string[]>([]);
  const [currentState, setCurrentState] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    const shuffled = [...statesList].sort(() => Math.random() - 0.5);
    setShuffledStates(shuffled);
    setCurrentState(shuffled[0]);
  }, []);

  const handleStateClick = (stateName: string) => {
    if (stateName === currentState) {
      setScore(score + 1);
      const nextIndex = shuffledStates.indexOf(currentState!) + 1;
      if (nextIndex < shuffledStates.length) {
        setCurrentState(shuffledStates[nextIndex]);
      } else {
        alert(`Quiz complete! Your score: ${score + 1}/${statesList.length}`);
      }
    } else {
      alert("Try again!");
    }
  };

  return (
    <div>
      <h1>Select: {currentState}</h1>
      <h2>Score: {score}</h2>
      <ComposableMap projection="geoAlbersUsa">
        <Geographies geography={usMap}>
          {({ geographies }: { geographies: CustomFeature[] }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onClick={() => handleStateClick(geo?.properties?.name)}
                style={{
                  default: { fill: "#D6D6DA", stroke: "#FFF" },
                  hover: { fill: "#F53", cursor: "pointer" },
                  pressed: { fill: "#E42" },
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default States;
