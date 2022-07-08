import React, { Component } from 'react';

class TableData extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <table className="table table-striped" >
                <thead className='judul-tabel-daftar-produk'>
                    <tr>
                        <th className="">No</th>
                        <th className="">Nama Obat</th>
                        <th className="">No.Obat</th>
                        <th className="">No.BPOM</th>
                        <th className="">Kategori</th>
                        <th className="">Stok</th>
                        <th className="">Satuan</th>
                        <th className="nilai-barang-list" >Nilai Barang</th>
                        <th className="">Nilai Jual</th>
                        <th className="">Atur</th>
                    </tr>
                </thead>
                <tbody className='body-tabel-daftar-produk'>
                    {this.props.children}
                </tbody>
            </table>
        );
    }
}

export default TableData;