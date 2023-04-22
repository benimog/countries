import React, { useEffect, useState } from "react";
import axios from "axios";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Countries: React.FC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://restcountries.com/v3.1/all?fields=name,flags"
        );
        setData(response.data.sort((a: { name: { common: string; }; }, b: { name: { common: any; }; }) => a.name.common.localeCompare(b.name.common)));
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
  }

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" variant="head">Country/ region</TableCell>
              <TableCell align="center" variant="head">Flag</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data ? (
              data.map((item: Country) => (
                <TableRow key={item.name.common}>
                  <TableCell component="th" scope="row">
                    {item.name.common}
                  </TableCell>
                  <TableCell>
                    <img src={item.flags.png} alt={item.name.common} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>Loading data...</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
};

export default Countries;