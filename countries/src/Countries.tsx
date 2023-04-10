import React, { useEffect, useState } from "react";
import axios from "axios";

const Countries: React.FC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://restcountries.com/v3.1/all?fields=name,flags"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  //console.log(data);
  interface Country {
    flags: {
      alt: string;
      png: string;
      svg: string;
    };
    name: {
      common: string;
      nativeName: {
        eng: {
          common: string;
          official: string;
        };
      };
      official: string;
    };
  }
  if (data !== null) {
    let myArray: Country[] = data;
    myArray.sort((a, b) => a.name.common.localeCompare(b.name.common));
    console.log(myArray);
  }
  return (
    <div>
      {data ? (
        <ul>
          {data.map((item: any) => (
            <li key={item.name.common}>{item.name.common}</li>
          ))}
        </ul>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default Countries;
