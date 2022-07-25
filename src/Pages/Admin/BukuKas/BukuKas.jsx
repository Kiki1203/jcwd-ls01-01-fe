import React from 'react';
import './BukuKas.css';
import SidebarAdmin from '../../../Components/Admin/SidebarAdmin/SidebarAdmin.jsx';
import { InputGroup, InputGroupText, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const BukuKas = () => {
  return (
    <div>
      <SidebarAdmin />
      <div className="container-fluid-buku">
        <div className="box-statistik">
          <div className="box-table-buku">
            <div className="row mb-5">
              <div className="col-3 text-start">
                <div className="mb-2">Akun kas</div>
                <div>BCA xxxxxxxxxx</div>
              </div>
              <div className="col-3 text-start">
                <div>Tanggal</div>
                <div>
                  <InputGroup>
                    <Input type="date" />
                  </InputGroup>
                </div>
              </div>
              <div className="col-5 text-start">
                <br />
                <div>
                  {' '}
                  <InputGroup>
                    <InputGroupText style={{ background: 'white' }}>
                      <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </InputGroupText>
                    <Input placeholder="Cari nama obat" />
                  </InputGroup>
                </div>
              </div>
            </div>
            <div className="box-table-isi">
              <table className="table">
                <thead style={{ background: '#213360' }} className="box-table-isi">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td colspan="2">Larry the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BukuKas;
