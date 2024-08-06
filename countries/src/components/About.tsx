import React from "react";
import { Link } from "@mui/material";

function About() {
  return (
    <div>
      <h1>Välkommen till flaggquiz.se</h1>

      <p>
        <b>Tips!</b>
        <br />
        Det går att använda tangentbordet för att svara.
      </p>
      <img
        src="/numpad.png"
        alt="Använd tangenterna 7, 8, 4, 5"
        style={{ maxWidth: "80vw" }}
      />
      <p>Använd tangenterna 7, 8, 4, 5 enligt bilden</p>
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
