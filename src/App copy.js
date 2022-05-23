import React from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import "./vendor/normalize.css";
import "./vendor/fonts/fonts.css";
import "./App.css";

import flightsMock from "./const/flights.json";

function App() {
  const [flights, setFlights] = React.useState([]);

  React.useEffect(() => {
    setFlights(flightsMock.result.flights);
  }, []);

  React.useEffect(() => {
    console.log(flights);
  }, [flights]);

  <>
  {flights.map((allFlights, allFlightsIndex) => {
    allFlights.flight.legs.map((legs, legsIndex) => {
      legs.segments.map((segments, segmentsIndex) => {
        console.log();
      });
    });
  })}
</>

  return (
    <div className="App">
      <header className="App-header"></header>
      <main className="main-content">
        <form className="search-panel">
          <div className="search-panel__sort">
            <span className="search-panel__title title">Сортировать</span>
            <div>
              <input
                type="radio"
                id="low-price"
                name="low-price"
                value="low-price"
                checked
              ></input>
              <label for="low-price"> - по возрастанию цены</label>
            </div>
            <div>
              <input
                type="radio"
                id="hight-price"
                name="hight-price"
                value="hight-price"
              ></input>
              <label for="hight-price"> - по убыванию цены</label>
            </div>
            <div>
              <input
                type="radio"
                id="by-time"
                name="by-time"
                value="by-time"
              ></input>
              <label for="by-time"> - по времени в пути</label>
            </div>
          </div>
          <div className="search-panel__filter">
            <span className="search-panel__title title">Фильтровать</span>
            <div>
              <input
                type="checkbox"
                id="transfer"
                name="transfer"
                value="transfer"
              ></input>
              <label for="transfer"> - с пересадкой</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="no-transfer"
                name="no-transfer"
                value="no-transfer"
              ></input>
              <label for="no-transfer"> - без пересадок</label>
            </div>
          </div>
          <div className="search-panel__price">
            <span className="search-panel__title title">Цена</span>
            <div>
              <label for="huey">От</label>
              <input
                type="number"
                id="price-form"
                name="price-form"
                value="price-form"
              ></input>
            </div>
            <div>
              <label for="dewey">До</label>
              <input
                type="number"
                id="price-to"
                name="price-to"
                value="price-to"
              ></input>
            </div>
          </div>
          <div className="search-panel__company">
            <span className="search-panel__title title">Авиакомпании</span>
            <div>
              <input
                type="checkbox"
                id="huey"
                name="drone"
                value="huey"
              ></input>
              <label for="huey"> - LOT Polish</label>
              <span> от 50000р</span>
            </div>
          </div>
        </form>
        <section className="search-result">
          {flights && flights.map((tickets) => {
              return (
                <div className="result">
                  <div className="result__label">
                    <h3 className="result__brandname">
                      {tickets.flight.carrier.caption}
                    </h3>
                    <div className="result__price-section">
                      <h4 className="result__price">
                        {tickets.flight.price.total.amount}
                        <span>{tickets.flight.price.total.currency}</span>
                      </h4>
                      <p className="result__price-caption">
                        Стоимость для одного взрослого пассажира
                      </p>
                    </div>
                  </div>
                  {tickets && tickets.legs.map((item) => {
                    console.log(item);
                      return (
                        <>
                          <div className="result__places">
                            <div className="result__places-content">
                              <p className="result__airport">
                                { item.flight.legs[0].segments[0].departureCity.caption }, {" "}
                                { item.flight.legs[0].segments[0].departureAirport.caption }
                                <span className="result__reduction">
                                  ({ item.flight.legs[0].segments[0].departureAirport.uid })
                                </span>
                              </p>
                              <p className="result__arrow">&#10145;</p>
                              <p className="result__airport">
                                ЛОНДОН, Лондон, Хитроу
                                <span className="result__reduction">(LHR)</span>
                              </p>
                            </div>
                          </div>
                          <div className="result__time-section">
                            <div className="result__digits-block">
                              <div className="result__timing result__timing_start">
                                <p className="result__timing-time">20:40</p>
                                <p className="result__timing-date">
                                  18 авг. вт
                                </p>
                              </div>
                              <div className="result__timing-total">
                                <p className="result__timing-total-value">
                                  <span className="result__timing-total-timer">
                                    &#128337;
                                  </span>
                                  14 ч 45 мин
                                </p>
                              </div>
                              <div className="result__timing result__timing_end">
                                <p className="result__timing-time">20:40</p>
                                <p className="result__timing-date">
                                  18 авг. вт
                                </p>
                              </div>
                            </div>
                            <div className="result__transfer">
                              <p className="result__transfer-count">
                                1 пересадка
                              </p>
                            </div>
                            <p className="result__doer">
                              Рейс выполняет: LOT POLISH AIRLINES
                            </p>
                            <div className="result__digits-block-divide"></div>
                          </div>
                        </>
                      );
                    })}
                  <button className="result__select-button">Выбрать</button>
                </div>
              );
            })}
        </section>
      </main>
    </div>
  );
}

export default App;
