import React, { Component } from 'react';

class TableData extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <table className="table table-striped rounded" >
                <thead id='judul-tabel-kartu-produk'style={{borderRadius:"10px 10px 0px 0px"}}>
                    <tr style={{borderRadius:"10px 10px 0px 0px"}}>
                        <th className="">No</th>
                        <th className="">Tanggal</th>
                        <th className="">Aktivitas</th>
                        <th className="">Petugas</th>
                        <th className="">Keluar</th>
                        <th className="">Masuk</th>
                        <th className="">Sisa</th>
                        <th className="">Tgl. Kadaluarsa</th>
                    </tr>
                </thead>
                <tbody className='body-tabel-kartu-produk'>
                    {this.props.children}
                </tbody>
            </table>
        );
    }
}

export default TableData;