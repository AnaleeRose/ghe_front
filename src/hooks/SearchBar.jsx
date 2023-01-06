
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import React, { Component, useState, useRef } from 'react';

export const SearchBar = (props) => {
    let sample_data = [
        {
            id: "john",
            name: "John Doe",
        },
        {
            id: "jane",
            name: "Jane Doe",
        },
        {
            id: "mary",
            name: "Mary Phillips",
        },
        {
            id: "robert",
            name: "Robert",
        },
        {
            id: "karius",
            name: "Karius",
        },
    ];

    let items = (props.data) ? props.data : sample_data


    const handleOnSearch = (string, results) => {
        console.log("handleOnSearch")
        // console.log(string, results);
    };

    const handleOnHover = (result) => {
    //     console.log("handleOnHover")
    //     console.log(result);
    };

    const handleOnSelect = (item) => {
        let array = Object.entries(item)
        props.onChangeSelected(array)
    };

    const handleOnFocus = () => {
        // console.log("Focused");
    };

    const handleOnClear = () => {
        // console.log("Cleared");
    };

    const formatResult = (item) => {
        return (
          <>
            <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
          </>
        )
      }

    return (
        <ReactSearchAutocomplete
            items={items}
            fuseOptions={{ key: ["name"] }}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onFocus={handleOnFocus}
            onClear={handleOnClear}
            onSelect={handleOnSelect}
            autoFocus
            formatResult={formatResult}
            maxResults={5}
        />
    );
}
