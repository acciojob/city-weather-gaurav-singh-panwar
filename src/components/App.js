import React, { useState, useEffect } from "react";
import "./../styles/App.css";
 
const API_KEY = "ba2d767c7354ee6337b93936ec909c9a";
 
const App = () => {
  let [search, setSearch] = useState("");
  let [data, setData] = useState("");
 
  useEffect(() => {
    let timer
    if(timer){
      clearTimeout(timer)
    }
    timer =setTimeout(() => {
      console.log(search)
      // Send Axios request here
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}`)
      .then(res => (res.json()))
      .then(res => {
        console.log(res);
        console.log(res.weather[0]);
        setData(res);
        setSearch("")
      })
      .catch((error) => {
        console.log(error.message)
      })
    },1000)
  }, [search])
 
  return (
    <div>
      {/* Do not remove the main div */}
      <div className="input-div">
        <input
          type="search"
          className="search"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        ></input>
      </div>
        {
          data &&
          <div className="weather">
            <div>{data.name}</div>
            <div>{data.main.temp}F</div>
            <div>{data.weather[0].description}</div>
          </div>
        }     
    </div>
  );
};
 
export default App;