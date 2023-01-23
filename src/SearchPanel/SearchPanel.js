import shortid from "shortid";
import "./SearchPanel.css";

function SearchPanel({
  companies,
  hadleLowSort,
  handleHighSort,
  handleFlyTimeSort,
  handleTransfer,
  filter,
  handleFilter,
  handleSelectAvia,
  filterInit
}) {
  return (
    <section className="search">
      <form className="search-panel">
        <div className="search-panel__sort">
          <p className="search-panel__title title">Sort by</p>
          <div>
            <input
                type="radio"
                name="radio"
                id="low-price"
                onClick={hadleLowSort}
                value={"low-price"}
              />
            <label htmlFor="low-price">
              price decrending
            </label>
          </div>
          <div>
            <input
                type="radio"
                name="radio"
                id="hight-price"
                onClick={handleHighSort}
                value={"low-price"}
              />
            <label htmlFor="hight-price">
              price ascending
            </label>
          </div>
          <div>
            <input
                type="radio"
                name="radio"
                id="by-time"
                onClick={handleFlyTimeSort}
                value={"low-price"}
              />
            <label htmlFor="by-time">
              travel time
            </label>
          </div>
        </div>
        <div className="search-panel__filter">
          <p className="search-panel__title title">Filter by</p>
          <div>
              <input
                type="number"
                id="transfers"
                name="transfers"
                value={typeof filter.transfers === 'number' ? filter.transfers : 0}
                onChange={(event) => {
                  handleTransfer("transfers", Number(event.target.value));
                }}
                min="0"
                max={typeof filterInit.transfers === 'number' ? filterInit.transfers : 0}
              ></input>
            <label htmlFor="transfers">transfers</label>
          </div>
        </div>
        <div className="search-panel__price">
          <p className="search-panel__title title">Price</p>
          <div>
            <label htmlFor="price-form">From</label>
            <input
                type="number"
                id="price-form"
                name="price-form"
                onChange={(event) => {
                  handleFilter("priceFrom", Number(event.target.value));
                }}
                value={filter.priceFrom}
                min={typeof filterInit.priceFrom === 'number' ? filterInit.priceFrom : 0}
                max={typeof filterInit.priceTo === 'number' ? filterInit.priceTo : 0}
              ></input>
          </div>
          <div>
            <label htmlFor="price-to">To</label>
            <input
                type="number"
                id="price-to"
                name="price-to"
                onChange={(event) => {
                  handleFilter("priceTo", Number(event.target.value));
                }}
                value={filter.priceTo}
                min={typeof filterInit.priceFrom === 'number' ? filterInit.priceFrom : 0}
                max={typeof filterInit.priceTo === 'number' ? filterInit.priceTo : 0}
              ></input>
          </div>
        </div>
        <ul className="search-panel__company">
          <p className="search-panel__title">Airlines</p>
          {companies.length !== 0 &&
            companies.map((item, index) => {
              return (
                <li className="" key={shortid.generate()}>
                    <input
                      type="checkbox"
                      id={index}
                      name={item}
                      checked={filter.aviaList.includes(item)}
                      onChange={() => {
                        handleSelectAvia(item);
                      }}
                    ></input>
                  <label
                    className="search-panel__comp-name"
                    htmlFor={index}
                  >
                    {item}
                  </label>
                </li>
              );
            })}
        </ul>
      </form>
    </section>
  );
}

export default SearchPanel;
