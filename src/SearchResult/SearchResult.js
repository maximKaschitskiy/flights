import shortid from "shortid";
import Moment from "react-moment";
import "moment/locale/ru";
import "./SearchResult.css";

function SearchPanel({filteredFlights, counter, maxLength, plusCounter }) {
  return (
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
                          <span>{allFlights.flight.price.total.currency}</span>
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
                              legs.segments.map((segments, segmentsIndex) => {
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
                                          {segments.departureAirport.caption}
                                          &#160;
                                          <span className="result__reduction">
                                            ({segments.departureAirport.uid})
                                          </span>
                                        </p>
                                        <p className="result__arrow">
                                          &#10145;
                                        </p>
                                        <p className="result__airport">
                                          {segments.arrivalCity.caption}
                                          ,&#160;
                                          {segments.arrivalAirport.caption}
                                          &#160;
                                          <span className="result__reduction">
                                            ({segments.arrivalAirport.uid})
                                          </span>
                                        </p>
                                      </div>
                                    </div>
                                    <div className="result__time-section">
                                      <div className="result__digits-block">
                                        <div className="result__timing result__timing_start">
                                          <p className="result__timing-time">
                                            <Moment
                                              date={segments.departureDate}
                                              locale="ru"
                                              format="H:mm"
                                            />
                                          </p>
                                          <p className="result__timing-date">
                                            <Moment
                                              date={segments.departureDate}
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
                                        Рейс выполняет:&#160;
                                        {segments.airline.caption}
                                      </p>
                                      {devide}
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        );
                      })}
                    <button className="result__select-button">Выбрать</button>
                  </li>
                );
              })}
          {maxLength <= counter ? null : (
            <button className="result__loadmore-button" onClick={plusCounter}>
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
  );
}

export default SearchPanel;
