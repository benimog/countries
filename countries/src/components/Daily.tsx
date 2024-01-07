import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { Autocomplete, createFilterOptions } from "@mui/material";
import { Paper } from "@mui/material";
import seedrandom from "seedrandom";
import { setCommentRange } from "typescript";

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

function Daily() {
  const [data, setData] = useState<Country[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [randomCountry, setRandomCountry] = useState<Country | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country | string>("");
  const [correctPicks, setCorrectPicks] = useState<number>(0);
  const [incorrectPicks, setIncorrectPicks] = useState<number>(0);
  const autocompleteRef = useRef<typeof Autocomplete | null>(null);
  const [dailyCountries, setDailyCountries] = useState<any[]>([]);
  const [countryIndex, setCountryIndex] = useState<number>(0);
  const numberOfCountries = 10;

  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (option: Country) => option.translations.swe.common,
  });

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
        setCountryIndex(0);
        setCountries(countries);
        setData(countries);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (countries.length > 0) {
      getDailyCountries();
    }
  }, [countries]);

  useEffect(() => {
    if (dailyCountries.length > 0) {
      getRandomCountry();
    }
  }, [dailyCountries]);

  const getRandomCountry = () => {
    if (dailyCountries.length > 0) {
      const randomCountry = dailyCountries[countryIndex];
      setRandomCountry(randomCountry);
    }
  };

  const handleChoice = () => {
    if (
      typeof selectedCountry !== "string" &&
      selectedCountry.name.common === randomCountry?.name.common
    ) {
      setCorrectPicks((prev) => prev + 1);
    } else {
      setIncorrectPicks((prev) => prev + 1);
      alert(`Fel! Rätt svar är ${randomCountry?.translations.swe.common}`);
    }

    setSelectedCountry("");
    setCountryIndex((prevIndex) => prevIndex + 1);
    if (countryIndex === numberOfCountries - 1) {
      console.log(correctPicks, incorrectPicks);
      setCountryIndex(0);
      resetPicks();
      getDailyCountries();
      alert("Väl spelat! \n\n Öppna konsolen för att se ditt resultat.");
    }
  };

  useEffect(() => {
    getRandomCountry();
  }, [countryIndex]);

  useEffect(() => {
    if (autocompleteRef.current) {
      (autocompleteRef.current as any).getElementsByTagName("input")[0].focus();
    }
  }, [randomCountry]);

  const resetPicks = () => {
    setCorrectPicks(0);
    setIncorrectPicks(0);
  };

  const getDailyCountries = () => {
    const date = new Date(
      new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Stockholm" })
    );

    const seed = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    const rng = seedrandom(seed);

    const getRandomObjects = (
      seed: string,
      array: Country[],
      count: number
    ) => {
      const shuffledArray = [...array];

      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [
          shuffledArray[j],
          shuffledArray[i],
        ];
      }

      return shuffledArray.slice(0, count);
    };
    const selectedCounitrues = getRandomObjects(
      seed,
      countries,
      numberOfCountries
    );

    setDailyCountries(selectedCounitrues);
  };

  const getCurrentDate = () => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    let dayString = date
      .toLocaleDateString("sv-SE", options)
      .charAt(0)
      .toUpperCase();
    dayString += date.toLocaleDateString("sv-SE", options).slice(1);
    return `${dayString}`;
  };

  return (
    <div>
      <h1>Flaggquiz</h1>
      <h2>{getCurrentDate()}</h2>
      <p>Välj rätt land för flaggan</p>
      <p>
        Land {countryIndex + 1} av {numberOfCountries}
      </p>
      <div>
        <img src={randomCountry?.flags.png} alt={randomCountry?.flags.alt} />
        <Autocomplete
          style={{ marginTop: "1rem" }}
          ref={autocompleteRef}
          disablePortal={true}
          id="country-combo-box"
          options={countries}
          filterOptions={filterOptions}
          getOptionLabel={(option) => option.translations.swe.common}
          renderOption={(props, option) => (
            <li {...props}>{option.translations.swe.common}</li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Land"
              InputLabelProps={{
                style: { color: "#fff" },
              }}
            />
          )}
          PaperComponent={({ children }) => (
            <Paper
              style={{
                maxHeight: 200,
                overflow: "hidden",
                backgroundColor: "#282c34",
                color: "white",
              }}
            >
              {children}
            </Paper>
          )}
          onChange={(event, value) =>
            value ? setSelectedCountry(value) : setSelectedCountry("")
          }
        />
        <div>
          <Button variant="contained" onClick={() => handleChoice()}>
            Svara
          </Button>
          <p>Rätta svar: {correctPicks}</p>
          <p>Felaktga svar: {incorrectPicks}</p>
        </div>
      </div>
    </div>
  );
}

export default Daily;
