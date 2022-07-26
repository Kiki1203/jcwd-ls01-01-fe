import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faMagnifyingGlassPlus, faMagnifyingGlassMinus, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import {
    TransformComponent,
    TransformWrapper,
  } from "@pronestor/react-zoom-pan-pinch";
import { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL  from '../../../../Helpers/API_URL.js';


function ModalZoomResep2({setOpenModal2, setGambar}) {


    return (
        <div className='modal-background fixed-top' onClick={() => setOpenModal2(false)}>
            <div className='modal-container' style={{height:'500px', width:'370px'}} onClick={e => e.stopPropagation()}>
                <FontAwesomeIcon icon={faXmark} className='close-icon'
                    style={{zIndex:'999'}}
                    onClick={() => setOpenModal2(false)}
                    />
            <div className='resep-mid-container'>
            <div style={{position:'relative', width:'330px', height:'430px', marginBottom:'15px', backgroundColor:'lightgray'}}>
                            <TransformWrapper
                                initialPositionX={0}
                                initialPositionY={0}
                                initialScale={1}
                            >
                                {({ zoomIn, zoomOut, ...rest }) => (
                                <>
                                    <TransformComponent>
                                    <div style={{backgroundColor:'lightgray', height:'430px', width:'330px', cursor:'move'}}>
                                    <img src={`${API_URL}/${setGambar}`} alt="" style={{height:'100%', width:'100%', objectFit:'contain'}} />
                                    </div>
                                    </TransformComponent>
                                    <div style={{position:'absolute', bottom:'7px', right:'10px', gap:'30px'}}>
                                    <button className='zoom-buttons' onClick={() => zoomIn()}>
                                        <FontAwesomeIcon icon={faMagnifyingGlassPlus}
                                        style={{filter:'drop-shadow(0px 0px 3px gray)'}} />
                                    </button>
                                    <button className='zoom-buttons' onClick={() => zoomOut()}>
                                        <FontAwesomeIcon icon={faMagnifyingGlassMinus}
                                        style={{filter:'drop-shadow(0px 0px 3px gray)'}} />
                                    </button>
                                    </div>
                                </>
                                )}
                            </TransformWrapper>
                            </div>
            </div>
            </div>
        </div>
    )
}

export default ModalZoomResep2;