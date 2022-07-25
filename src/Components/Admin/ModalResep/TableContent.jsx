import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

function TableContent({index, obat, arrObat, setArrObat}) {
    const [edit, setEdit] = useState(false)
    const [qty, setQty] = useState(obat.qty)
    const [dosis, setDosis] = useState(obat.dosis)

    const onEdit = () => {
        let temp = [...arrObat]
        temp[index] = {...obat, qty:qty, dosis:dosis}
        setArrObat(temp)
        setEdit(false)
    }
    const onDelete = () => {
        Swal.fire({
            text: `Hapus ${obat.nama}?`,
            width: '400px',
            confirmButtonText: 'Ya',
            showCancelButton: true,
            cancelButtonText: 'Batal',
            reverseButtons: true,
            confirmButtonColor: '#E0004D'
          }).then((result) => {
            if (result.isConfirmed) {
                let temp = [...arrObat]
                temp.splice(index, 1)
                setArrObat(temp)
            }
          })
    }

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{obat.nama}</td>
            <td>{`Rp ${obat.harga.toLocaleString('de-DE', {minimumFractionDigits: 0})}`}</td>
            <td>{edit ? <input defaultValue={obat.qty}
                style={{width:'30px', textAlign:'center'}}
                onChange={(e) => setQty(e.target.value)} /> : obat.qty}</td>
            <td>{obat.satuan}</td>
            <td>{edit ? <input defaultValue={obat.dosis}
                style={{width:'140px', textAlign:'center'}}
                onChange={(e) => setDosis(e.target.value)} /> : obat.dosis}</td>
            <td style={{width:'108px'}}>{edit ? <button className='resep-detail-edit'
                onClick={() => onEdit()}>Simpan</button>
                : <button className='resep-detail-edit'
                onClick={() => setEdit(true)}>Edit</button>
                }
            <FontAwesomeIcon icon={faTrashCan} style={{color:'#E0004D', cursor:'pointer'}}
                onClick={onDelete} /></td>
        </tr>
    );
}

export default TableContent;