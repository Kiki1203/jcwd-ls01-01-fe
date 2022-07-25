import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBubble.css'

function SearchBubble({searchQuery, products, setBubbleOpen}) {
    const navigate = useNavigate()
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
        <div className="bubble" ref={refOne}>
            {
                products.length
                ?
                <div id='search-result-container'>
                    {
                        products.slice(0,10).map((p) => {
                            return <div className='d-flex mb-1'>
                                    <p className='search-result'
                                        onClick={() => {navigate(`/productdetail/${p.id}`); setBubbleOpen(false)}}>
                                        {p.namaObat}
                                    </p>
                            </div>
                        })
                    }
                    {
                        products.length > 10 && <p id='lihat-semua' onClick={() => navigate(`/kategori/semua-kategori?search=${searchQuery}`)}>
                            {`Lihat seluruh hasil pencarian (${products.length} produk)`}
                        </p>
                    }
                </div>
                :
                <div className='produk-tidak-ditemukan' >
                    Produk tidak ditemukan.
                </div>
            }
        </div>
    );
}

export default SearchBubble;