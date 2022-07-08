import React, { useState, useMemo } from 'react';
import { useAsyncDebounce } from 'react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { InputGroup, InputGroupText, Input } from 'reactstrap';
import './DaftarProduk2.css';
export function GlobalFilter({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 300);

  return (
    <span>
      <InputGroup className="GlobalFilter">
        <InputGroupText>
          {' '}
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </InputGroupText>
        <Input
          className="search"
          value={value || ''}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`${count} data...`}
          style={{}}
        />
      </InputGroup>
    </span>
  );
}

export function SelectColumnFilter({ column: { filterValue, setFilter, preFilteredRows, id } }) {
  // Use preFilteredRows to calculate the options
  const options = useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // UI for Multi-Select box
  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export function DefaultFilterForColumn({
  column: {
    filterValue,
    preFilteredRows: { length },
    setFilter,
  },
}) {
  return (
    <input
      value={filterValue || ''}
      onChange={(e) => {
        // Set undefined to remove the filter entirely
        setFilter(e.target.value || undefined);
      }}
      placeholder={`Search ${length} records..`}
      style={{ marginTop: '10px' }}
    />
  );
}
