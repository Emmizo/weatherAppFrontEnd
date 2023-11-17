import React, { useState, useEffect } from "react";
import axios from "axios";
import BaseURL from "../BaseURL";

export default function Home() {
  const [cities, setCity] = useState("");
  const [countries, setCountry] = useState("");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [rw, setRw] = useState("");
  const [se, setSE] = useState("");
  const [rwCity, setRwCity] = useState("");
  const [seCity, setSECity] = useState("");
  const [weatherDescriptionRw, setWeatherDescriptionRw] = useState("");
  const [weatherDescriptionSe, setWeatherDescriptionSe] = useState("");
  const [windDegRw, setWindDegRw] = useState("");
  const [windDegSe, setWindDegSe] = useState("");
  const [humidityRw, setHumidityRw] = useState("");
  const [humiditySe, setHumiditySe] = useState("");
  const [tempRw, setTempRw] = useState("");
  const [tempSe, setTempSe] = useState("");
  const [tempMinRw, setTempMinRw] = useState("");
  const [tempMinSe, setTempMinSe] = useState("");
  const [tempMaxRw, setTempMaxRw] = useState("");
  const [tempMaxSe, setTempMaxSe] = useState("");

  function CheckWeather(selectedCity) {
    if (selectedCity.target.name === "city1") {
      setCountry("RW");
      setCity(selectedCity.target.value);
    }
    if (selectedCity.target.name === "city2") {
      setCountry("SE");
      setCity(selectedCity.target.value);
    }
  }
  function Fetching() {
    if (countries === "RW") {
      setIsLoading(true);
    }
    if (countries === "SE") {
      setIsLoading2(true);
    }
    axios
      .post(BaseURL + "weather", {
        country: countries,
        city: cities,
      })
      .then((res) => {
        if (countries === "RW") {
          setIsLoading(false);
        }
        if (countries === "SE") {
          setIsLoading2(false);
        }
        setData(res);
      });
  }

  useEffect(() => {
    Fetching();
  }, [countries, cities]);

  useEffect(() => {
    if (data?.data?.sys?.country === "RW") {
      setRw(data?.data?.weather?.length && data?.data?.weather[0].icon);
      setRwCity(data?.data?.name);
      setWeatherDescriptionRw(
        data?.data?.weather?.length && data?.data?.weather[0].description
      );
      setWindDegRw(data?.data?.wind?.speed);
      setHumidityRw(data?.data?.main?.humidity);
      setTempRw(Math.round(data?.data?.main?.temp - 273.15));
      setTempMinRw(Math.round(data?.data?.main?.temp_min - 273.15));
      setTempMaxRw(Math.round(data?.data?.main?.temp_max - 273.15));
    }
    if (data?.data?.sys?.country === "SE") {
      setSE(data?.data?.weather?.length && data?.data?.weather[0].icon);
      setSECity(data?.data?.name);
      setWeatherDescriptionSe(
        data?.data?.weather?.length && data?.data?.weather[0].description
      );
      setWindDegSe(data?.data?.wind?.speed);
      setHumiditySe(data?.data?.main?.humidity);
      setTempSe(Math.round(data?.data?.main?.temp - 273.15));
      setTempMinSe(Math.round(data?.data?.main?.temp_min - 273.15));
      setTempMaxSe(Math.round(data?.data?.main?.temp_max - 273.15));
    }
  }, [data]);

  return (
    <div className="home">
      <div className="weather mb-8">
        <div className="region-fields md-6 container">
          <div className="places-input md-3">
            <select
              name="city1"
              className="form-select "
              onChange={(e) => CheckWeather(e)}
            >
              <option>Select City</option>
              <option>Kigali</option>
              <option>Rwamagana</option>
              <option>Musanze</option>
            </select>
          </div>
          <div className="places-input md-3">
            <select
              name="city2"
              className="form-select"
              onChange={(e) => CheckWeather(e)}
            >
              <option>Select City</option>
              <option>Stockholm</option>
              <option>Helsingborg</option>
              <option>Gothenburg</option>
            </select>
          </div>
        </div>
        <div className="weather-container b-dark text-white">
          <div className="weather-header">
            <div className="first-country">
              Rwanda {rw && <span> , {rwCity} </span>}
            </div>
            <div className="line"></div>
            <div className="second-country">
              Sweden{se && <span> , {seCity} </span>}
            </div>
          </div>
          <div className="weather-header ">
            <div className="result-first-country ">
              <div className="h-[100%]">
                {isLoading ? (
                  <div>Loading...</div>
                ) : (
                  <div className="h-[100%]">
                    {rw && (
                      <div className=" flex  justify-between w-full  h-full">
                        <div className="w-[70%] p-2 text-left">
                          <div className="">{rwCity}</div>
                          <hr />
                          <div>{tempRw}&deg; C</div>
                          <div>
                            {tempMinRw}/{tempMaxRw}&deg; C
                          </div>
                          <div className="flex flex-row items-center space-x-7 mt-3">
                            <div>
                              <img
                                src={`https://openweathermap.org/img/wn/${rw}@2x.png`}
                                alt={se}
                                width="50"
                                className=""
                              />
                            </div>
                            <div>{weatherDescriptionRw}</div>
                          </div>
                          <hr />
                          <div className="flex flex-row items-center space-x-2">
                            <div>Wind</div>
                            <div> : {windDegRw} km/h </div>
                          </div>
                          <div className="flex flex-row items-center space-x-2 mt-1">
                            <div>Humidity</div>
                            <div> : {humidityRw} %</div>
                          </div>
                        </div>
                        <div className="w-[30%] bg-[#bef0ff] flex items-center justify-center">
                          <div className="">
                            <img
                              src={`https://openweathermap.org/img/wn/${rw}@2x.png`}
                              alt={se}
                              className="w-[100%]"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="line"></div>
            <div className="result-second-country">
              {isLoading2 ? (
                <div className="">
                  <div className="text-lg font-bold">Loading...</div>
                </div>
              ) : (
                <div className="h-[100%]">
                  {se && (
                    <div className=" flex  justify-between w-full  h-full">
                      <div className="w-[70%] p-2 text-left">
                        <div className="">{seCity}</div>
                        <hr />
                        <div>{tempSe}&deg; C</div>
                        <div>
                          <div>
                            {tempMinSe}/{tempMaxSe}&deg; C
                          </div>{" "}
                        </div>
                        <div className="flex flex-row items-center space-x-7 mt-3">
                          <div>
                            <img
                              src={`https://openweathermap.org/img/wn/${se}@2x.png`}
                              alt={se}
                              width="50"
                              className=""
                            />
                          </div>
                          <div>{weatherDescriptionSe}</div>
                        </div>
                        <hr />
                        <div className="flex flex-row items-center space-x-2">
                          <div>Wind</div>
                          <div> : {windDegSe} km/h </div>
                        </div>
                        <div className="flex flex-row items-center space-x-2 mt-1">
                          <div>Humidity</div>
                          <div> : {humiditySe} %</div>
                        </div>
                      </div>
                      <div className="w-[30%] bg-[#bef0ff] flex items-center justify-center">
                        <div className="">
                          <img
                            src={`https://openweathermap.org/img/wn/${se}@2x.png`}
                            alt={se}
                            className="w-[100%]"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
