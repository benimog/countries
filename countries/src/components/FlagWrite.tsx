import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { Autocomplete } from "@mui/material";
import { Paper } from "@mui/material";

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

function FlagWrite() {
  const [data, setData] = useState<Country[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [randomCountry, setRandomCountry] = useState<Country | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [correctPicks, setCorrectPicks] = useState<number>(0);
  const [incorrectPicks, setIncorrectPicks] = useState<number>(0);
  const autocompleteRef = useRef<typeof Autocomplete | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://restcountries.com/v3.1/all?fields=name,flags,translations"
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

  const getRandomCountry = () => {
    if (countries.length > 0) {
      const randomIndex = Math.floor(Math.random() * countries.length);
      const randomCountry = countries[randomIndex];
      setRandomCountry(randomCountry);
    }
  };

  const handleChoice = () => {
    if (selectedCountry === randomCountry) {
      setCorrectPicks((prev) => prev + 1);
    } else {
      setIncorrectPicks((prev) => prev + 1);
      alert(`Fel! Rätt svar är ${randomCountry?.translations.swe.common}`);
    }

    setSelectedCountry(null);
    getRandomCountry();
  };

  const resetPicks = () => {
    console.log(countries);
    setCorrectPicks(0);
    setIncorrectPicks(0);
  };

  return (
    <div>
      <h1>Flaggquiz</h1>
      <p>Välj rätt land/ region för flaggan</p>
      {randomCountry && (
        <div>
          <img src={randomCountry.flags.png} alt={randomCountry.flags.alt} />
          <Autocomplete
            ref={autocompleteRef}
            disablePortal
            id="country-combo-box"
            options={countries}
            getOptionLabel={(option) => option.translations.swe.common}
            renderOption={(props, option) => (
              <li {...props}>{option.translations.swe.common}</li>
            )}
            renderInput={(params) => (
              <TextField {...params} label="Land/region" />
            )}
            PaperComponent={({ children }) => (
              <Paper style={{ maxHeight: 200, overflow: "hidden" }}>
                {children}
              </Paper>
            )}
            onChange={(event, value) => value ? setSelectedCountry(value) : setSelectedCountry(null) } 
          />
          <div>
            <Button variant="contained" onClick={() => handleChoice()}>
              Svara
            </Button>
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

export default FlagWrite;
