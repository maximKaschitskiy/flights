import React from "react";
import Moment from "react-moment";
import "moment/locale/ru";
import shortid from "shortid";

import "./vendor/normalize.css";
import "./vendor/fonts/fonts.css";
import "./App.css";

import flightsMock from "./const/flights.json";

function App() {
  const [flights, setFlights] = React.useState([]);

  const [companies, setCompanies] = React.useState([]);

  const [filteredFlights, setFilteredFlights] = React.useState([]);

  const [counter, setCounter] = React.useState(2);

  const maxLength = flights.length;

  const [radioValues, setRadioValies] = React.useState("");

  const [filter, setFilter] = React.useState({
    priceFrom: "",
    priceTo: "",
    aviaList: [],
    oneTransfer: false,
    withoutTranfer: false,
  });

  React.useEffect(() => {
    setFlights(flightsMock.result.flights);
    setFilteredFlights(flightsMock.result.flights);
  }, []);

  React.useEffect(() => {
    document.title = "Tickets Database";
  }, []);

  React.useEffect(() => {
    const aviaCompanyList = [];
    flights.forEach((allFlights) => {
      if (
        !aviaCompanyList.find(
          (item) => item === allFlights.flight.carrier.caption
        )
      ) {
        aviaCompanyList.push(allFlights.flight.carrier.caption);
      }
    });
    setCompanies(aviaCompanyList);
  }, [flights]);

  const plusCounter = () => {
    const newCounter = Math.min(maxLength, counter + 2);
    setCounter(newCounter);
  };

  const handleChange = (event) => {
    setRadioValies(event.target.value);
  };

  const handleFilter = (key, value) => {
    const filterObj = { ...filter, [key]: value };
    setFilter(filterObj);
  };

  const handleTransfer = (key, value) => {
    const filterObj = { ...filter, [key]: value };
    setFilter(filterObj);
    filterChange(filterObj);
  };

  const handleSelectAvia = (name) => {
    let filterAviaList = filter.aviaList;
    if (filterAviaList.includes(name)) {
      filterAviaList = filterAviaList.filter((item) => item !== name);
    } else {
      filterAviaList.push(name);
    }
    const filterObj = { ...filter, aviaList: filterAviaList };
    setFilter(filterObj);
    filterChange(filterObj);
  };

  const filterChange = (filter) => {
    console.log(filter);
    let newArr = flights;
    if (filter.priceFrom !== "") {
      newArr = newArr.filter(
        (item) => +item.flight.price.total.amount > +filter.priceFrom
      );
    }
    if (filter.priceTo !== "") {
      newArr = newArr.filter(
        (item) => +item.flight.price.total.amount < +filter.priceTo
      );
    }
    if (filter.aviaList.length !== 0) {
      newArr = newArr.filter((item) =>
        filter.aviaList.includes(item.flight.carrier.caption)
      );
    }
    if (filter.oneTransfer) {
      newArr = newArr.filter((item) =>
        item.flight.legs.some((item) =>
          item.segments.some((segment) => segment.starting)
        )
      );
    }
    if (filter.withoutTransfer) {
      newArr = newArr.filter((item) =>
        item.flight.legs.every((item) =>
          item.segments.every((segment) => segment.starting === false)
        )
      );
    }
    setFilteredFlights(newArr);
  };

  const high = () => {
    const toHighPrice = [...flights].sort((prev, next) => {
      return +prev.flight.price.total.amount - +next.flight.price.total.amount;
    });
    setFilteredFlights(toHighPrice);
  };

  const low = () => {
    const toLowPrice = [...flights].sort((prev, next) => {
      return +next.flight.price.total.amount - +prev.flight.price.total.amount;
    });
    setFilteredFlights(toLowPrice);
  };

  const flyTime = () => {
    const timeInFly = [...flights].sort((prev, next) => {
      return (
        prev.flight.legs.reduce((a, b) => a + b.duration, 0) -
        next.flight.legs.reduce((a, b) => a + b.duration, 0)
      );
    });
    setFilteredFlights(timeInFly);
  };

  return (
    <div className="App">
      <header className="App-header"></header>
      <main className="main-content">
        <section className="search">
          <form className="search-panel">
            <div className="search-panel__sort">
              <p className="search-panel__title title">Сортировать</p>
              <div>
                <label>
                  <input
                    type="radio"
                    name="radio"
                    id="low-price"
                    onClick={low}
                    value={"low-price"}
                  />
                  - по возрастанию цены
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="radio"
                    name="radio"
                    id="hight-price"
                    onClick={high}
                    value={"low-price"}
                  />
                  - по убыванию цены
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="radio"
                    name="radio"
                    id="by-time"
                    onClick={flyTime}
                    value={"low-price"}
                  />
                  - по времени в пути
                </label>
              </div>
            </div>
            <div className="search-panel__filter">
              <p className="search-panel__title title">Фильтровать</p>
              <div>
                <label>
                  <input
                    type="checkbox"
                    id="transfer"
                    name="transfer"
                    value="transfer"
                    checked={filter.oneTransfer}
                    onChange={(event) =>
                      handleTransfer("oneTransfer", event.target.checked)
                    }
                  ></input>
                  - с пересадкой
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    id="no-transfer"
                    name="no-transfer"
                    value="no-transfer"
                    checked={filter.withoutTransfer}
                    onChange={(event) =>
                      handleTransfer("withoutTransfer", event.target.checked)
                    }
                  ></input>
                  - без пересадок
                </label>
              </div>
            </div>
            <div className="search-panel__price">
              <p className="search-panel__title title">Цена</p>
              <div>
                <label>
                  От
                  <input
                    type="number"
                    id="price-form"
                    name="price-form"
                    onChange={(event) => {
                      handleFilter("priceFrom", event.target.value);
                      filterChange(filter);
                    }}
                    value={filter.priceFrom}
                  ></input>
                </label>
              </div>
              <div>
                <label>
                  До
                  <input
                    type="number"
                    id="price-to"
                    name="price-to"
                    onChange={(event) => {
                      handleFilter("priceTo", event.target.value);
                      filterChange(filter);
                    }}
                    value={filter.priceTo}
                  ></input>
                </label>
              </div>
            </div>
            <ul className="search-panel__company">
              <p className="search-panel__title">Авиакомпании</p>
              {companies.length !== 0 &&
                companies.map((item, index) => {
                  return (
                    <li className="" key={shortid.generate()}>
                      <label className="search-panel__comp-name">
                        <input
                          type="checkbox"
                          id={index}
                          name={item}
                          checked={filter.aviaList.includes(item)}
                          onChange={() => handleSelectAvia(item)}
                        ></input>
                        {item}
                      </label>
                    </li>
                  );
                })}
            </ul>
          </form>
        </section>
        <section className="search-result">
          {filteredFlights.length ? (
            <ul className="search-result__list">
              {filteredFlights &&
                filteredFlights
                  .slice(0, counter)
                  .map((allFlights, allFlightsIndex) => {
                    return (
                      <li className="result" key={shortid.generate()}>
                        <div className="result__label">
                          <h3 className="result__brandname">
                            {allFlights.flight.carrier.caption}
                          </h3>
                          <div className="result__price-section">
                            <h4 className="result__price">
                              {allFlights.flight.price.total.amount}
                              <span>
                                {allFlights.flight.price.total.currency}
                              </span>
                            </h4>
                            <p className="result__price-caption">
                              Стоимость для одного взрослого пассажира
                            </p>
                          </div>
                        </div>
                        {allFlights &&
                          allFlights.flight.legs.map((legs, legsIndex) => {
                            return (
                              <div key={shortid.generate()}>
                                {legs &&
                                  legs.segments.map(
                                    (segments, segmentsIndex) => {
                                      const travelDurationHours = (
                                        segments.travelDuration / 60
                                      ).toFixed(0);

                                      const travelDurationMinutes =
                                        segments.travelDuration % 60;

                                      const showTravelDurationHours =
                                        travelDurationHours === 0
                                          ? null
                                          : travelDurationHours + " " + "ч";

                                      const showTravelDurationMinutes =
                                        travelDurationMinutes === 0
                                          ? null
                                          : travelDurationMinutes + " " + "мин";

                                      const transfer = segments.starting ? (
                                        <div className="result__transfer">
                                          <p className="result__transfer-count">
                                            1 пересадка
                                          </p>
                                        </div>
                                      ) : null;

                                      const devide =
                                        allFlights.flight.legs.length - 1 ===
                                          legsIndex &&
                                        legs.segments.length - 1 ===
                                          segmentsIndex ? null : (
                                          <div className="result__digits-block-divide"></div>
                                        );
                                      return (
                                        <div key={shortid.generate()}>
                                          <div className="result__places">
                                            <div className="result__places-content">
                                              <p className="result__airport">
                                                {segments.departureCity.caption}
                                                ,&#160;
                                                {
                                                  segments.departureAirport
                                                    .caption
                                                }
                                                &#160;
                                                <span className="result__reduction">
                                                  (
                                                  {
                                                    segments.departureAirport
                                                      .uid
                                                  }
                                                  )
                                                </span>
                                              </p>
                                              <p className="result__arrow">
                                                &#10145;
                                              </p>
                                              <p className="result__airport">
                                                {segments.arrivalCity.caption}
                                                ,&#160;
                                                {
                                                  segments.arrivalAirport
                                                    .caption
                                                }
                                                &#160;
                                                <span className="result__reduction">
                                                  ({segments.arrivalAirport.uid}
                                                  )
                                                </span>
                                              </p>
                                            </div>
                                          </div>
                                          <div className="result__time-section">
                                            <div className="result__digits-block">
                                              <div className="result__timing result__timing_start">
                                                <p className="result__timing-time">
                                                  <Moment
                                                    date={
                                                      segments.departureDate
                                                    }
                                                    locale="ru"
                                                    format="H:mm"
                                                  />
                                                </p>
                                                <p className="result__timing-date">
                                                  <Moment
                                                    date={
                                                      segments.departureDate
                                                    }
                                                    locale="ru"
                                                    format="DD MMM ddd"
                                                  />
                                                </p>
                                              </div>
                                              <div className="result__timing-total">
                                                <p className="result__timing-total-value">
                                                  <span className="result__timing-total-timer">
                                                    &#128337;
                                                  </span>
                                                  {showTravelDurationHours}
                                                  &#160;
                                                  {showTravelDurationMinutes}
                                                </p>
                                              </div>
                                              <div className="result__timing result__timing_end">
                                                <p className="result__timing-time">
                                                  <Moment
                                                    date={segments.arrivalDate}
                                                    locale="ru"
                                                    format="H:mm"
                                                  />
                                                </p>
                                                <p className="result__timing-date">
                                                  <Moment
                                                    date={segments.arrivalDate}
                                                    locale="ru"
                                                    format="DD MMM ddd"
                                                  />
                                                </p>
                                              </div>
                                            </div>
                                            {transfer}
                                            <p className="result__doer">
                                              Рейс выполняет:{" "}
                                              {segments.airline.caption}
                                            </p>
                                            {devide}
                                          </div>
                                        </div>
                                      );
                                    }
                                  )}
                              </div>
                            );
                          })}
                        <button className="result__select-button">
                          Выбрать
                        </button>
                      </li>
                    );
                  })}
              {maxLength <= counter ? null : (
                <button
                  className="result__loadmore-button"
                  onClick={plusCounter}
                >
                  Показать ещё
                </button>
              )}
            </ul>
          ) : (
            <div className="search-result__no-tickets">
              <p className="search-result__no-tickets-sign">Нет результатов</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
