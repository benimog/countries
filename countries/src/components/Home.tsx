import { Link } from "@mui/material";
import React from "react";

function Home() {
  return (
    <div>
      <h1>Welcome to the Homepage</h1>
      <p>
        Here you can see a{" "}
        <Link href="/countries" color="inherit">
          list of countries
        </Link>{" "}
        and play a{" "}
        <Link href="/GuessTheFlag" color="inherit">
          flag game
        </Link>
        .
      </p>
    </div>
  );
}

export default Home;
