import React, { FormEvent, useEffect, useState } from "react";
import logo from "../logo.svg";
// import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { BarChart, LineChart } from "@mui/x-charts";
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Pokemon() {
  const [id, setId] = useState(0);
  const [name, setName] = useState("unknown");
  const [exp, setExp] = useState(0);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [ability, setAbility] = useState([]);
  const [types, setTypes] = useState([]);
  const [stats, setStats] = useState([0, 0, 0, 0, 0, 0]);
  const [sprites, setSprites] = useState({
    back_default: "",
    back_female: "",
    back_shiny: "",
    back_shiny_female: "",
    front_default: "",
    front_female: "",
    front_shiny: "",
    front_shiny_female: "",
  });

  console.log(sprites);

  useEffect(() => {
    const url = window.location.href;
    const target = url.split("/")[4];

    fetch(`https://pokeapi.co/api/v2/pokemon/${target}`)
      .then(async (res) => {
        const answer = await res.json();
        console.log(answer);

        let statTemp : any = [];
        answer.stats.forEach((stat: any) => {
          statTemp.push(stat.base_stat);
        })

        setId(answer.id);
        setName(answer.name);
        setExp(answer.base_experience);
        setWeight(answer.weight);
        setHeight(answer.height);
        setAbility(answer.abilities);
        setTypes(answer.types);
        setSprites(answer.sprites);
        setStats(statTemp);
      })
      .catch((err: Error) => console.log("Error", err));
  }, []);

  return (
    <div className="Pokemon">
      <div className="name">
        <div className="back-btn" onClick={() => (window.location.href = "/")}>
          <svg
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            height={50}
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M20.0195 21.3199C22.5695 20.4399 23.0195 15.7199 23.0195 12.4099C23.0195 9.09992 22.5895 4.41001 20.0195 3.51001C17.3095 2.58001 9.01953 8.65991 9.01953 12.4099C9.01953 16.1599 17.3095 22.2499 20.0195 21.3199Z"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M1 18.92C1 20.3008 2.11929 21.42 3.5 21.42C4.88071 21.42 6 20.3008 6 18.92L6 5.92004C6 4.53933 4.88071 3.42004 3.5 3.42004C2.11929 3.42004 1 4.53933 1 5.92004L1 18.92Z"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
          </svg>
        </div>
      </div>
      <div className="container">
        <div className="col-lg-4">
          <Carousel width={500}>
            <div>
              <img src={sprites.back_default} />
              <p className="legend">Back Default</p>
            </div>
            <div>
              <img src={sprites.back_female} />
              <p className="legend">Back Default</p>
            </div>
            <div>
              <img src={sprites.back_shiny} />
              <p className="legend">Back Shiny</p>
            </div>
            <div>
              <img src={sprites.back_shiny_female} />
              <p className="legend">Back Default</p>
            </div>
            <div>
              <img src={sprites.front_default} />
              <p className="legend">Front Default</p>
            </div>
            <div>
              <img src={sprites.front_female} />
              <p className="legend">Back Default</p>
            </div>
            <div>
              <img src={sprites.front_shiny} />
              <p className="legend">Front Shiny</p>
            </div>
            <div>
              <img src={sprites.front_shiny_female} />
              <p className="legend">Back Default</p>
            </div>
          </Carousel>
        </div>
        <div className="col" style={{ marginLeft: "200px", fontSize: "25px" }}>
          <p><b>ID</b> : <i>{id}</i></p>
          <p><b>Name</b> : <i>{name}</i></p>
          <p><b>Experience</b> : <i>{exp}</i></p>
          <p>
            <b>Weight</b> : <i>{weight}</i> &nbsp;&nbsp;&nbsp;&nbsp; <b>Height</b> : <i>{height}</i>{" "}
          </p>
          <p>
            <b>Abilities</b> :
            {ability.map((ele: any, idx: number) => (
              <i key={idx}> {ele.ability.name}, </i>
            ))}
          </p>
          <p>
            <b>Types</b> :
            {types.map((ele: any, idx: number) => (
              <i key={idx}> {ele.type.name}, </i>
            ))}
          </p>

          <div
            style={{
              border: "20px solid rgb(15, 25, 36)",
              height: 400,
              borderRadius: 20,
            }}
          >
            <ThemeProvider theme={createTheme({ palette: { mode: 'dark' } })}>
              <LineChart
                xAxis={[{scaleType: 'point', data: ['HP', 'Attack', 'Defense', 'Special\nAttack', 'Special\nDefense', 'Speed'] }]}
                series={[
                  {
                    data: stats,
                  },
                ]}
              />
            </ThemeProvider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pokemon;
