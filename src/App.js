import "./styles/style.css";
import axios from "axios";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
export default function App() {
  const apiKey = "a0d62e5ee4a19500da0adf6ddb99026f";
  const [data, setData] = useState({});
  const [inputCity, setInputCity] = useState("");
  const getWeatherDetails = (cityName) => {
    const apiURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=" +
      apiKey;
    axios
      .get(apiURL)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSearch = () => {
    getWeatherDetails(inputCity);
  };

  return (
    <div className="col-md-12 App">
      <div className="weatherbg">
        <h1 className="heading">Weather App</h1>
        <input
          type="text"
          className="input-control"
          onChange={(ev) => {
            setInputCity(ev.target.value);
          }}
        />
        <button
          className="btn btn-primary"
          type="button"
          onClick={handleSearch}
        >
          {" "}
          Search
        </button>
      </div>
      {Object.keys(data).length > 0 &&(
        <div className="col-md-12 text-center mt-5">
          <div className="shadow rounded weatherResult">
            <img
              className="weatherIcon"
              src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png"
            />
            <h3 className="weatherCity">{data?.name}</h3>
          {data?.weather.map((item)=>(<h4>{item.description}</h4>))}
          
          <h3>Clouds {data?.clouds?.all}%</h3>
            <h3 className="weatherTemp" >
              {(data?.main?.temp - 273.5).toFixed(1)} °C
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}
