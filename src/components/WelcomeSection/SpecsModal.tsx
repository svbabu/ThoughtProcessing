//import { Modal } from "react-bootstrap";
import { Product } from '../../typed/Product';
import latop from '@img/latop.png';
import asusZenbook from '@img/asuszenbook.png';
import dellXps from '@img/dellxps.png';
import macbookPro from '@img/macbookpro.png';
import hpSpectre from '@img/hpspectre.png';
import lenovoThinkpad from '@img/lenovothinkpad.png';
import macbookAir from '@img/macbookair.png';
import dellLatitude from '@img/delllatitude.png';
import msiStealth from '@img/msistealth.png';
import hpEnvyx360 from '@img/hpenvyx360.png';
import hpEnvyx360f from '@img/hpenvyx360-front.png';
import hpEnvyx360b from '@img/hpenvyx360-back.png';

import acerSwift from '@img/acerswift.png';
import { Modal, Carousel } from 'react-bootstrap';
type SpecsModalProps = {
  product: Product | null;
  onClose: () => void;
};


   // For grid thumbnails
  /* export const thumbnailMap: Record<string, string> = {

    "dellxps": dellXps,
    "macbookpro": macbookPro,
    "hpspectre": hpSpectre,
    "lenovothinkpad": lenovoThinkpad,
    "asuszenbook": asusZenbook,
    "macbookair":macbookAir,
    "delllatitude" :dellLatitude,
    "msistealth":msiStealth,
    "hpenvyx360":hpEnvyx360, // ✅ normalized key matches
    "acerswift":acerSwift
  }; */
const normalizeKey = (name: string) =>
  name.toLowerCase().replace(/[\s-]+/g, ""); // handles spaces & hyphens

export const galleryMap: Record<string, string[]> = {
  "dellxps": [dellXps],
  "macbookpro": [macbookPro],
  "hpspectre": [hpSpectre],
  "lenovothinkpad": [lenovoThinkpad],
  "asuszenbook": [asusZenbook],
  "macbookair": [macbookAir],
  "delllatitude": [dellLatitude],
  "msistealth": [msiStealth],
  "hpenvyx360": [hpEnvyx360f, hpEnvyx360b, hpEnvyx360], // multiple
  "acerswift": [acerSwift]
};

export const SpecsModal: React.FC<SpecsModalProps> = ({ product, onClose }) => {
  if (!product) return null;
    console.log("Product in modal:", product);

    /*  const resolvedImage =
        (product.modelName ? imageMap[normalizeKey(product.modelName)] : undefined) ||
        (product.productName ? imageMap[normalizeKey(product.productName)] : undefined) ||
       latop;
       const resolvedImages =
         product.images && product.images.length > 0
           ? product.images
           : [
               (product.modelName ? imageMap[normalizeKey(product.modelName)] : undefined) ||
               (product.productName ? imageMap[normalizeKey(product.productName)] : undefined) ||
               latop
             ]; */
     const key = normalizeKey(product.modelName || "");
     const resolvedImages: string[] = [
       ...(product?.images ?? []),
       ...(galleryMap[key] ?? [latop])
     ];
    /*  const resolvedImages: string[] =
       product?.images && product.images.length > 0
         ? product.images
         : (galleryMap[key] ?? [latop]);
 */
  return (
    <Modal show={!!product} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Brand:{product.brand} || Model:{product.modelName}</Modal.Title>

      </Modal.Header>
      <Modal.Body>
       {/* src={resolvedImage} */}
     {/*  <img

           src={resolvedImages[0]} // ✅ first image only
          alt={product.modelName}
          className="img-fluid mb-3"
        /> */}
        <Carousel interval={null} controls={true} indicators={true}
        prevIcon={<span className="custom-prev">‹</span>}
          nextIcon={<span className="custom-next">›</span>}>
                  {resolvedImages.map((imgSrc, idx) => (
                    <Carousel.Item key={idx}>
                      <img
                        src={imgSrc}
                        alt={`${product.modelName} image ${idx + 1}`}
                        className="d-block w-100 mb-3"
                      />
                    </Carousel.Item>
                  ))}

                </Carousel>
         <p>laptop Specification/Configuration as below</p>
        <ul>

          <li>Processor: {product.processor}</li>
          <li>RAM: {product.ramSize}</li>
          <li>Storage: {product.storageCapacity}</li>
          <li>OS: {product.operatingSystem}</li>
          <li>GPU: {product.videoCard}</li>
          <li>Display: {product.display}</li>
          <li>Color: {product.color}</li>

        </ul>
      </Modal.Body>
    </Modal>
  );
};
