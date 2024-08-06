import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TextField,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Countries: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [copyList, setCopyList] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://restcountries.com/v3.1/all?fields=name,flags,translations"
        );

        setData(
          response.data.sort(
            (
              a: { translations: { swe: { common: string } } },
              b: { translations: { swe: { common: string } } }
            ) =>
              a.translations.swe.common.localeCompare(
                b.translations.swe.common,
                "sv",
                { sensitivity: "case" }
              )
          )
        );
        setCopyList(
          response.data.sort(
            (
              a: { translations: { swe: { common: string } } },
              b: { translations: { swe: { common: string } } }
            ) =>
              a.translations.swe.common.localeCompare(
                b.translations.swe.common,
                "sv",
                { sensitivity: "case" }
              )
          )
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

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

  const requestSearch = (searched: any) => {
    setCopyList(
      data.filter((item: { translations: { swe: { common: string } } }) =>
        item.translations.swe.common
          .toLowerCase()
          .includes(searched.toLowerCase())
      )
    );
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <TextField
        variant="outlined"
        placeholder="Sök..."
        type="search"
        onChange={(e) => requestSearch(e.target.value)}
        sx={{ paddingTop: "2rem" }}
        fullWidth
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" variant="head">
                <h2>Land/ region</h2>
              </TableCell>
              <TableCell align="center" variant="head">
                <h2>Flagga</h2>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {copyList ? (
              copyList.map((item: Country) => (
                <TableRow key={item.translations.swe.common}>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ maxWidth: "20vw" }}
                    align="right"
                  >
                    {item.translations.swe.common}
                  </TableCell>
                  <TableCell align="left">
                    <img
                      src={item.flags.png}
                      alt={item.translations.swe.common}
                      style={{ minWidth: "50%", maxWidth: "100%" }}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>Hämtar data...</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
};

export default Countries;
