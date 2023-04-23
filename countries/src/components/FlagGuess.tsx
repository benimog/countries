import React, { useEffect, useState } from "react";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

type Country = {
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  name: {
    common: string;
    official: string;
    nativeName: Record<string, any>;
  };
};

function FlagGuess() {
  const [data, setData] = useState<Country[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [randomCountry, setRandomCountry] = useState<Country | null>(null);
  const [choices, setChoices] = useState<Country[]>([]);
  const [correctPicks, setCorrectPicks] = useState<number>(0);
  const [incorrectPicks, setIncorrectPicks] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://restcountries.com/v3.1/all?fields=name,flags"
        );
        const countries = response.data;
        countries.sort((a: Country, b: Country) =>
          a.name.common.localeCompare(b.name.common)
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
      alert(`Incorrect! The correct answer is ${randomCountry?.name.common}`);
    }
    getRandomCountry();
  };

  const resetPicks = () => {
    setCorrectPicks(0);
    setIncorrectPicks(0);
  };

  return (
    <div>
      <h1>Guess the Flag</h1>
      <p>Pick the correct country/ region for each flag.</p>
      {randomCountry && (
        <div>
          <img src={randomCountry.flags.png} alt={randomCountry.flags.alt} />
          <div>
            <Stack spacing={2} sx={{ marginTop: "1rem" }}>
              <Stack spacing={2} direction="row" justifyContent="center">
                <Stack spacing={2} direction="column">
                  {choices.slice(0, 2).map((choice) => (
                    <Button
                      variant="contained"
                      key={choice.name.common}
                      onClick={() => handleChoice(choice)}
                    >
                      {choice.name.common}
                    </Button>
                  ))}
                </Stack>
                <Stack spacing={2} direction="column">
                  {choices.slice(2).map((choice) => (
                    <Button
                      variant="contained"
                      key={choice.name.common}
                      onClick={() => handleChoice(choice)}
                    >
                      {choice.name.common}
                    </Button>
                  ))}
                </Stack>
              </Stack>
            </Stack>
            {/* <Alert severity="error">Incorrect! {}</Alert> */}
          </div>
          <div>
            <p>Correct Picks: {correctPicks}</p>
            <p>Incorrect Picks: {incorrectPicks}</p>
          </div>
          <Button variant="contained" onClick={() => resetPicks()}>
            Reset
          </Button>
        </div>
      )}
    </div>
  );
}

export default FlagGuess;
