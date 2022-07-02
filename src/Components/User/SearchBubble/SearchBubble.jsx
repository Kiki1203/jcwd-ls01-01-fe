import { useNavigate } from 'react-router-dom';
import './SearchBubble.css'

function SearchBubble({searchQuery, products, setBubbleOpen}) {
    const navigate = useNavigate()

    return (
        <div style={{position:'fixed', top:'0px', left:'0px', width:'100vw', height:'100vh', zIndex:'1'}} onClick={() => setBubbleOpen(false)}>
            <div style={{position:'relative', width:'100vw', height:'100vh'}}>
                <div className='bubble-dark-bg' />
                <div className="bubble" onClick={e => e.stopPropagation}>
                    {
                        products.length
                        ?
                        <div id='search-result-container'>
                            {
                                products.slice(0,10).map((p) => {
                                    return <div className='d-flex mb-1'>
                                            <p className='search-result'
                                                onClick={() => navigate(`/productdetail/${p.id}`)}>
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
                        <div style={{height:'100%', width:'100%', display:'flex',
                        justifyContent:'center', alignItems:'center', padding:'40px',
                        fontSize:'18px', color: 'grey'}}>
                            Produk tidak ditemukan.
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default SearchBubble;