import shortid from "shortid";
import "./SearchPanel.css";

function SearchPanel({
  companies,
  hadleLowSort,
  handleHighSort,
  handleFlyTimeSort,
  handleTransfer,
  filter,
  filterChange,
  handleFilter,
  handleSelectAvia,
}) {
  return (
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
                onClick={hadleLowSort}
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
                onClick={handleHighSort}
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
                onClick={handleFlyTimeSort}
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
                min="0"
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
                min="0"
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
  );
}

export default SearchPanel;