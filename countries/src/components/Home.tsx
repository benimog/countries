import { Link } from "@mui/material";
import React from "react";

function Home() {
  return (
    <div>
      <h1>Välkommen till flaggquiz.se</h1>
      <p>
        Här går det att se en{" "}
        <Link href="/countries" color="inherit">
          lista över länder och regioner
        </Link>{" "}
        och spela ett{" "}
        <Link href="/flags" color="inherit">
          flaggquiz
        </Link>
        .
      </p>
    </div>
  );
}

export default Home;
