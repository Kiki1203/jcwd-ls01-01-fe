import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import './DaftarProduk2.css';
import { useGlobalFilter, useSortBy, useTable, useFilters, usePagination } from 'react-table';
import { GlobalFilter, DefaultFilterForColumn, SelectColumnFilter } from './GlobalFilter';

const DaftarProduk = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
    deleteProduct();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get('http://localhost:5000/admin/dataproduct').catch((err) => console.log(err));
    if (response) {
      const products = response.data;
      console.log('product', products);
      setProducts(products);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/admin/deleteproduct/${id}`);
      fetchProducts();
      return alert('success');
    } catch (error) {
      console.error(error);
    }
  };

  const productsData = useMemo(() => [...products], [products]);

  const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(number);
  };

  const productsColumns = useMemo(
    () =>
      products[0]
        ? Object.keys(products[0])
            .filter((key) => key !== 'SatuanObat_id' && key !== 'GolonganObat_id')
            .map((key) => {
              if (key === 'id')
                return {
                  Header: 'No',
                  accessor: key,
                  disableFilters: true,
                };
              if (key === 'namaObat')
                return {
                  Header: 'Nama Obat',
                  accessor: key,
                  disableFilters: true,
                };
              if (key === 'nomorObat')
                return {
                  Header: 'No.Obat',
                  accessor: key,
                  Cell: ({ value }) => `A0${('00' + value).slice(-3)}`,
                  disableFilters: true,
                };
              if (key === 'stok')
                return {
                  Header: 'Stock',
                  accessor: key,
                  disableFilters: true,
                };
              if (key === 'satuanObat')
                return {
                  Header: 'Satuan',
                  accessor: key,
                  disableFilters: true,
                };
              if (key === 'nilaiBarang')
                return {
                  Header: 'Nilai Barang',
                  accessor: key,
                  Cell: ({ value }) => rupiah(value),
                  disableFilters: true,
                };
              if (key === 'nilaiJual')
                return {
                  Header: 'Nilai Jual',
                  accessor: key,
                  Cell: ({ value }) => rupiah(value),
                  disableFilters: true,
                };
              if (key === 'Kategori')
                return {
                  Header: 'Kategori',
                  accessor: key,
                  Filter: SelectColumnFilter,
                  filter: 'includes',
                  disableSortBy: true,
                };
              if (key === 'NIE')
                return {
                  Header: 'NIE',
                  accessor: key,
                  disableFilters: true,
                };
              return { Header: key, accessor: key };
            })
        : [],
    [products]
  );

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: 'Edit',
        Header: 'Atur',
        Cell: ({ row }) => (
          <div>
            <button className="btn btn-danger me-2" onClick={() => deleteProduct(row.values.id)}>
              Delete
            </button>
          </div>
        ),
      },
    ]);
  };
  const tableInstance = useTable({ columns: productsColumns, data: productsData, defaultColumn: { Filter: DefaultFilterForColumn }, initialState: { pageIndex: 2 } }, useGlobalFilter, tableHooks, useFilters, useSortBy, usePagination);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = tableInstance;

  const isEven = (idx) => idx % 2 === 1;

  return (
    <div id="container-admin-produk">
      <div className="mb-5">
        <GlobalFilter preGlobalFilteredRows={preGlobalFilteredRows} setGlobalFilter={setGlobalFilter} globalFilter={state.globalFilter} />
      </div>
      <hr />
      <div className="container-tabel">
        <div className="container-tabel-produk">
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {column.render('Header')}
                      {column.isSorted ? (column.isSortedDesc ? ' ▼' : ' ▲') : ''}
                      <div>{column.canFilter ? column.render('Filter') : null}</div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, idx) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} className={isEven(idx) ? 'evenbg' : ''}>
                    {row.cells.map((cell, idx) => {
                      return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="pagination px-5 py-4">
          <span className="me-5">
            Menampilkan{' '}
            <strong>
              {pageIndex + 1} dari {pageOptions.length}
            </strong>{' '}
            data
          </span>
          <span className="me-5">
            Baris perhalaman -
            <span>
              <select
                style={{ width: '50px', height: '30px' }}
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>
            </span>
          </span>
          <span className="me-5">
            | Pergi ke halaman:{' '}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: '40px' }}
            />
          </span>{' '}
          <span>
            {' '}
            <button className="btn btn-light" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {'⟪'}
            </button>{' '}
            <button className="btn btn-light" onClick={() => previousPage()} disabled={!canPreviousPage}>
              {'⟨'}
            </button>{' '}
            <button className="btn btn-light" onClick={() => nextPage()} disabled={!canNextPage}>
              {'⟩'}
            </button>{' '}
            <button className="btn btn-light" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
              {'⟫'}
            </button>{' '}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DaftarProduk;
