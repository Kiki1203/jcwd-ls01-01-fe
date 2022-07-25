import { useEffect, useRef } from 'react'
import './SearchBubbleTransaksi.css'
import { ClipLoader } from "react-spinners";

function SearchBubbleTransaksi({result, setQuery, setBubbleOpen, loading}) {
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

    return (
        <div className="search-bubble-transaksi" ref={refOne}>
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
                                        onClick={() => {setQuery(res); setBubbleOpen(false)}}>
                                        {res}
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

export default SearchBubbleTransaksi;