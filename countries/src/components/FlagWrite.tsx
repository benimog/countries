import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { Autocomplete, createFilterOptions } from "@mui/material";
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
  const [selectedCountry, setSelectedCountry] = useState<Country | String>("");
  const [correctPicks, setCorrectPicks] = useState<number>(0);
  const [incorrectPicks, setIncorrectPicks] = useState<number>(0);
  const autocompleteRef = useRef<typeof Autocomplete | null>(null);

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

    setSelectedCountry("");
    getRandomCountry();
    if (autocompleteRef.current) {
      (autocompleteRef.current as any).getElementsByTagName("input")[0].focus();
    } 
  };

  const resetPicks = () => {
    setCorrectPicks(0);
    setIncorrectPicks(0);
  };

  return (
    <div>
      <h1>Flaggquiz</h1>
      <p>Välj rätt land för flaggan</p>
      {randomCountry && (
        <div>
          <img src={randomCountry.flags.png} alt={randomCountry.flags.alt} />
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
                  style: { color: "#fff"}
                }} 
              />
            )} 
            PaperComponent={({ children }) => (
              <Paper style={{ maxHeight: 200, overflow: "hidden", backgroundColor: "#282c34", color: "white" }}>
                {children}
              </Paper>
            )}
            onChange={(event, value) => value ? setSelectedCountry(value) : setSelectedCountry("")} 
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
