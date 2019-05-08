import React from "react";
import Sorter from "./Sorter";
import Filterer from "./Filterer";
import Searcher from "./Searcher";
import Header from "./Header";

export default class Table extends React.Component {
  render() {
    let { data } = this.props;
    return (
      <div>
        <Header />
        <Sorter data={data}>
          {sortedData => {
            return (
              <Filterer data={sortedData}>
                {filteredData => {
                  return (
                    <Searcher data={filteredData}>
                      {searchedData => {
                        console.log({
                          data,
                          sortedData,
                          filteredData,
                          searchedData
                        });
                        return <div>Hi2</div>;
                      }}
                    </Searcher>
                  );
                }}
              </Filterer>
            );
          }}
        </Sorter>
      </div>
    );
  }
}
