import React from "react";

import "./vendor/normalize.css";
import "./vendor/fonts/fonts.css";
import "./App.css";

import flightsMock from "./const/flights.json";

import SearchPanel from "./SearchPanel/SearchPanel";
import SearchResult from "./SearchResult/SearchResult";

function App() {

  const [flights, setFlights] = React.useState([]);
  const [companies, setCompanies] = React.useState([]);
  const [filteredFlights, setFilteredFlights] = React.useState([]);
  const [counter, setCounter] = React.useState(2);
  const maxLength = flights.length;

  const [filter, setFilter] = React.useState({
    priceFrom: "",
    priceTo: "",
    aviaList: [],
    oneTransfer: false,
    withoutTranfer: false,
  });

  React.useEffect(() => {
    document.title = "Tickets Database";
  }, []);

  React.useEffect(() => {
    setFlights(flightsMock.result.flights);
    setFilteredFlights(flightsMock.result.flights);
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

  const handleHighSort = () => {
    const toHighPrice = [...flights].sort((prev, next) => {
      return +prev.flight.price.total.amount - +next.flight.price.total.amount;
    });
    setFilteredFlights(toHighPrice);
  };

  const hadleLowSort = () => {
    const toLowPrice = [...flights].sort((prev, next) => {
      return +next.flight.price.total.amount - +prev.flight.price.total.amount;
    });
    setFilteredFlights(toLowPrice);
  };

  const handleFlyTimeSort = () => {
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
        <SearchPanel 
          companies={companies}
          hadleLowSort={hadleLowSort}
          handleHighSort={handleHighSort}
          handleFlyTimeSort={handleFlyTimeSort}
          handleTransfer={handleTransfer}
          filter={filter}
          filterChange={filterChange}
          handleFilter={handleFilter}
          handleSelectAvia={handleSelectAvia}
        />
        <SearchResult
          filteredFlights={filteredFlights}
          counter={counter}
          maxLength={maxLength}
          plusCounter={plusCounter}
        />
      </main>
    </div>
  );
}

export default App;
