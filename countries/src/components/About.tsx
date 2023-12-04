import React from "react";
import { Link } from "@mui/material";

function About() {
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
        .<br /> Det går även att spela ett lite svårare{" "}
        <Link href="/write" color="inherit">
          flaggquiz
        </Link>
        .
      </p>
      <div className="footer">
        <p>
          <a
            href="https://erikmartinandersson.se/"
            target="_blank"
            rel="noreferrer"
          >
            👨‍💻
          </a>
        </p>
      </div>
    </div>
  );
}

export default About;
