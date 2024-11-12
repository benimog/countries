import React, { useEffect, useState } from "react";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

interface Country {
  flags: {
    alt: string;
    png: string;
    svg: string;
  };
  name: {
    common: string;
    official: string;
  };
  translations: {
    swe: {
      official: string;
      common: string;
    };
  };
}

function Home() {
  const [data, setData] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const [randomCountry, setRandomCountry] = useState<any | null>(null);
  const [choices, setChoices] = useState<any[]>([]);
  const [correctPicks, setCorrectPicks] = useState<number>(0);
  const [incorrectPicks, setIncorrectPicks] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://restcountries.com/v3.1/independent?status=true&fields=name,flags,translations"
        );
        const countries = response.data;
        countries.sort(
          (
            a: { translations: { swe: { common: string } } },
            b: { translations: { swe: { common: string } } }
          ) =>
            a.translations.swe.common.localeCompare(
              b.translations.swe.common,
              "sv",
              { sensitivity: "case" }
            )
        );
        setCountries(countries);
        setData(countries);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      getRandomCountry();
    }
  }, [data]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      let keyIndex = parseInt(event.key);
      if (keyIndex === 7) {
        keyIndex = 0;
      } else if (keyIndex === 4) {
        keyIndex = 1;
      } else if (keyIndex === 8) {
        keyIndex = 2;
      } else if (keyIndex === 5) {
        keyIndex = 3;
      }
      if (keyIndex >= 0 && keyIndex < choices.length) {
        handleChoice(choices[keyIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [choices]);

  const getRandomCountry = () => {
    if (countries.length > 0) {
      const randomIndex = Math.floor(Math.random() * countries.length);
      const randomCountry = countries[randomIndex];
      setRandomCountry(randomCountry);
      const choices = getChoices(randomIndex);
      setChoices(choices);
    }
  };

  const getChoices = (randomIndex: number) => {
    const choices: { flags: any; name: any }[] = [];
    while (choices.length < 3) {
      const randomChoiceIndex = Math.floor(Math.random() * data.length);
      if (randomChoiceIndex !== randomIndex) {
        const randomChoice = data[randomChoiceIndex];
        if (!choices.includes(randomChoice)) {
          choices.push(randomChoice);
        }
      }
    }
    choices.push(data[randomIndex]);
    choices.sort(() => Math.random() - 0.5);
    return choices;
  };

  const handleChoice = (choice: Country) => {
    if (choice === randomCountry) {
      setCorrectPicks((prev) => prev + 1);
    } else {
      setIncorrectPicks((prev) => prev + 1);
      alert(`Fel! Rätt svar är ${randomCountry?.translations.swe.common}`);
    }
    getRandomCountry();
  };

  const resetPicks = () => {
    setCorrectPicks(0);
    setIncorrectPicks(0);
  };

  return (
    <div>
      <p>Välj rätt land för flaggan</p>
      {randomCountry && (
        <div>
          <img src={randomCountry.flags.png} alt={randomCountry.flags.alt} />
          <div>
            <Stack spacing={2} sx={{ marginTop: "1rem" }}>
              <Stack
                spacing={2}
                direction="row"
                justifyContent="center"
                id="choiceStack"
              >
                <Stack spacing={2} direction="column">
                  {choices.slice(0, 2).map((choice) => (
                    <Button
                      variant="contained"
                      key={choice.translations.swe.common}
                      onClick={() => handleChoice(choice)}
                    >
                      {choice.translations.swe.common}
                    </Button>
                  ))}
                </Stack>
                <Stack spacing={2} direction="column">
                  {choices.slice(2).map((choice) => (
                    <Button
                      variant="contained"
                      key={choice.translations.swe.common}
                      onClick={() => handleChoice(choice)}
                    >
                      {choice.translations.swe.common}
                    </Button>
                  ))}
                </Stack>
              </Stack>
            </Stack>
          </div>
          <div>
            <p>Rätta svar: {correctPicks}</p>
            <p>Felaktga svar: {incorrectPicks}</p>
          </div>
          <Button variant="contained" onClick={() => resetPicks()}>
            Återställ
          </Button>
        </div>
      )}
    </div>
  );
}
export default Home;
