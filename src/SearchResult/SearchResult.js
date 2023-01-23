import shortid from "shortid";
import Moment from "react-moment";
import moment from "moment";
import "moment/locale/ru";
import "./SearchResult.css";

function SearchPanel({ filteredFlights, counter, maxLength, plusCounter }) {

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
                          <span>&#160;{allFlights.flight.price.total.currency}</span>
                        </h4>
                        <p className="result__price-caption">
                          Price for one adult passenger
                        </p>
                      </div>
                    </div>
                    {allFlights &&
                      allFlights.flight.legs.map((legs, legsIndex) => {
                        return (
                          <div key={shortid.generate()}>
                            {legs &&
                              legs.segments.map((segments, segmentsIndex) => {
                                const segDuration = moment.duration(segments.travelDuration, "minutes").format("h:mm");
                                
                                const transfer =
                                  legs.segments.length > 1
                                  && legs.segments.length - 1 > segmentsIndex
                                  ? (
                                    <div className="result__transfer">
                                      <p className="result__transfer-count">
                                        transfer
                                      </p>
                                    </div>
                                  ) : null;

                                const devide =
                                  0 < segmentsIndex &&
                                  legs.segments.length - 1 === segmentsIndex &&
                                  allFlights.flight.legs.length - 1 !==
                                    legsIndex ? (
                                    <div className="result__digits-block-divide"></div>
                                  ) : null;

                                return (
                                  <div key={shortid.generate()}>
                                    <div className="result__places">
                                      <div className="result__places-content">
                                        <p className="result__airport">
                                          {segments.departureCity
                                            ? segments.departureCity.caption
                                            : ""}
                                          ,&#160;
                                          {segments.departureAirport
                                            ? segments.departureAirport.caption
                                            : ""}
                                          &#160;
                                          <span className="result__reduction">
                                            (
                                            {segments.departureAirport
                                              ? segments.departureAirport.uid
                                              : ""}
                                            )
                                          </span>
                                        </p>
                                        <p className="result__arrow">
                                          &#10145;
                                        </p>
                                        <p className="result__airport">
                                          {segments.arrivalCity
                                            ? segments.arrivalCity.caption
                                            : ""}
                                          ,&#160;
                                          {segments.arrivalAirport
                                            ? segments.arrivalAirport.caption
                                            : ""}
                                          &#160;
                                          <span className="result__reduction">
                                            (
                                            {segments.arrivalAirport
                                              ? segments.arrivalAirport.uid
                                              : ""}
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
                                              date={segments.departureDate}
                                              locale="en"
                                              format="H:mm"
                                            />
                                          </p>
                                          <p className="result__timing-date">
                                            <Moment
                                              date={segments.departureDate}
                                              locale="en"
                                              format="DD MMM ddd"
                                            />
                                          </p>
                                        </div>
                                        <div className="result__timing-total">
                                          <p className="result__timing-total-value">
                                            <span className="result__timing-total-timer">
                                              &#128337;
                                            </span>
                                            &#160;
                                            <Moment
                                              parse="HH:mm"
                                              locale="en"
                                              format="H:mm"
                                            >
                                              {segDuration}
                                            </Moment>
                                          </p>
                                        </div>
                                        <div className="result__timing result__timing_end">
                                          <p className="result__timing-time">
                                            <Moment
                                              date={segments.arrivalDate}
                                              locale="en"
                                              format="H:mm"
                                            />
                                          </p>
                                          <p className="result__timing-date">
                                            <Moment
                                              date={segments.arrivalDate}
                                              locale="en"
                                              format="DD MMM ddd"
                                            />
                                          </p>
                                        </div>
                                      </div>
                                      <p className="result__doer">
                                        Airline:&#160;
                                        {segments.airline.caption}
                                      </p>
                                      {transfer}
                                      {devide}
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        );
                      })}
                    <button className="result__select-button">Buy</button>
                  </li>
                );
              })}
          {filteredFlights.length <= counter
            ? null
            : (
              <button
                className="result__loadmore-button"
                onClick={() => {
                  plusCounter();
                }}
              >
                Show more
              </button>
          )}
        </ul>
      ) : (
        <div className="search-result__no-tickets">
          <p className="search-result__no-tickets-sign">No results</p>
        </div>
      )}
    </section>
  );
}

export default SearchPanel;
