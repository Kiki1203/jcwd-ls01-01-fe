import { useEffect, useRef } from 'react'
import { ClipLoader } from "react-spinners";

function SearchBubbleResep({result, setSearch, setObat, setBubbleOpen, loading}) {
    const refOne = useRef(null)

    useEffect(() => {
        document.addEventListener("keydown", hideOnEscape, true)
        document.addEventListener("click", hideOnClickOutside, true)
    }, [])

    const hideOnEscape = (e) => {
        if( e.key === "Escape" ) {
        setBubbleOpen(false)
        }
    }

    const hideOnClickOutside = (e) => {
        if( refOne.current && !refOne.current.contains(e.target) ) {
        setBubbleOpen(false)
        }
    }
    const satuanObat = ['strip','botol','tube','box','sachet','piece','kit','pack','kaleng']
    
    return (
        <div className="search-bubble-transaksi" style={{width:'409px'}} ref={refOne}>
            {
                loading ?  <div style={{height:'100%', width:'100%', display:'flex',
                justifyContent:'center', alignItems:'center', padding:'40px'}}>
                    <ClipLoader color={'#213360'} size={35} /> </div>:
                result.length
                ?
                <div id='search-result-container'>
                    {
                        result.map((res) => {
                            return <div className='d-flex mb-1'>
                                    <p className='search-result'
                                        onClick={() => {setObat({id:res.id, nama:res.namaObat, harga:res.diskon, qty:1, satuan:satuanObat[res.satuanObat_id - 1], dosis:'', stok:res.stok, gambar:res.gambar}); setSearch(res.namaObat); setBubbleOpen(false)}}>
                                        {res.namaObat}
                                    </p>
                            </div>
                        })
                    }
                </div>
                :
                <div style={{height:'100%', width:'100%', display:'flex',
                justifyContent:'center', alignItems:'center', padding:'40px',
                fontSize:'14px', color: 'grey'}}>
                    Hasil pencarian kosong.
                </div>
            }
        </div>
    );
}

export default SearchBubbleResep;