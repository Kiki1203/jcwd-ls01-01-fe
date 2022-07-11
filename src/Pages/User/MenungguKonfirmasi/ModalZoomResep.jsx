import axios from 'axios';
import React, { useState } from "react";
import API_URL  from '../../../Helpers/API_URL.js';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import Cropper from "react-easy-crop";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faXmark, faAngleDown, faPlus, faMinus, faDownload} from '@fortawesome/free-solid-svg-icons';

const ModalZoomResep = () => {

  const [zoom, setZoom] = useState(1);
  const [objectFit, setObjectFit] = useState(null);
  const [aspect, setAspect] = useState(0);
  const [shape, setShape] = useState("");
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [image, setImage] = useState([]);

  useEffect(() => {
    if (image.type === "ava") {
      setObjectFit("vertical-cover");
      setAspect(1);
      setShape("round");
    } else {
      setObjectFit("horizontal-cover");
      setAspect(16 / 9);
      setShape("rect");
    }
    // eslint-disable-next-line
  }, []);

  const onZoomChange = (zoom) => {
    setZoom(zoom);
  };
  
    return (
    <>
       <div id="button-tambah-obat-produk"  onClick={() => setModalOpen(true)} >Perbesar Gambar</div>
       <Modal isOpen={modalOpen}>
            <ModalHeader>
               Zoom Resep
            </ModalHeader>
            <ModalBody>
               <div className="border border-white h-64 relative">
                <Cropper
                  cropShape={shape}
                  image={image}
                  zoom={zoom}
                  aspect={aspect}
                  onZoomChange={onZoomChange}
                  objectFit={objectFit}
                />
              </div>
              <div className="w-full flex justify-center py-2">
                  <input
                    type="range"
                    min={1}
                    max={3}
                    step={0.1}
                    value={zoom}
                    onInput={(e) => {
                      onZoomChange(e.target.value);
                    }}
                    className="w-3/4"
                  ></input>
                </div>
                <button
                    type="button"
                    className=" shadow-md hover:shadow-black inline-flex justify-center px-4 py-2 text-sm font-medium text-white w-36 bg-primary border border-transparent rounded-md  focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue duration-500"
                   
                  >
                    Done
                  </button>
            </ModalBody>
        </Modal>
        
    </>
   
    );
}

export default ModalZoomResep;