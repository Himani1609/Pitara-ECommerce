import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/pages/ProductDetail.css'; 
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useCart } from '../context/CartContext';


import basket1 from '../assets/images/products/basket1.jpg';
import basket2 from '../assets/images/products/basket2.jpg';

import bookmark1 from '../assets/images/products/bookmark1.jpg';
import bookmark2 from '../assets/images/products/bookmark2.jpg';

import calendar1 from '../assets/images/products/calendar1.jpg';
import calendar2 from '../assets/images/products/calendar2.jpg';

import canvas1 from '../assets/images/products/canvas1.jpg';
import canvas2 from '../assets/images/products/canvas2.jpg';

import camel1 from '../assets/images/products/camel1.jpg';
import camel2 from '../assets/images/products/camel2.jpg';

import clock1 from '../assets/images/products/clock1.jpg';
import clock2 from '../assets/images/products/clock2.jpg';

import dino1 from '../assets/images/products/dino1.jpg';
import dino2 from '../assets/images/products/dino2.jpg';

import envelope1 from '../assets/images/products/envelope1.jpg';
import envelope2 from '../assets/images/products/envelope2.jpg';

import ganesha1 from '../assets/images/products/ganesha1.jpg';
import ganesha2 from '../assets/images/products/ganesha2.jpg';

import lamp1 from '../assets/images/products/lamp1.jpg';
import lamp2 from '../assets/images/products/lamp2.jpg';

import macrame1 from '../assets/images/products/macrame1.jpg';
import macrame2 from '../assets/images/products/macrame2.jpg';

import mask1 from '../assets/images/products/mask1.jpg';
import mask2 from '../assets/images/products/mask2.jpg';

import notebook1 from '../assets/images/products/notebook1.jpg';
import notebook2 from '../assets/images/products/notebook2.jpg';

import pencilcase1 from '../assets/images/products/pencilcase1.jpg';
import pencilcase2 from '../assets/images/products/pencilcase2.jpg';

import plate1 from '../assets/images/products/plate1.jpg';
import plate2 from '../assets/images/products/plate2.jpg';

import vase1 from '../assets/images/products/vase1.jpg';
import vase2 from '../assets/images/products/vase2.jpg';

import inlaybox1 from '../assets/images/products/inlaybox1.jpg';
import inlaybox2 from '../assets/images/products/inlaybox2.jpg';

import inkkit1 from '../assets/images/products/inkkit1.jpg';
import inkkit2 from '../assets/images/products/inkkit2.jpg';

import teddy1 from '../assets/images/products/teddy1.jpg';
import teddy2 from '../assets/images/products/teddy2.jpg';

import bunny1 from '../assets/images/products/bunny1.jpg';
import bunny2 from '../assets/images/products/bunny2.jpg';

import elephantplush1 from '../assets/images/products/elephantplush1.jpg';
import elephantplush2 from '../assets/images/products/elephantplush2.jpg';

import elephant1 from '../assets/images/products/elephant1.jpg';
import elephant2 from '../assets/images/products/elephant2.jpg';

import koala1 from '../assets/images/products/koala1.jpg';
import koala2 from '../assets/images/products/koala2.jpg';

import llama1 from '../assets/images/products/llama1.jpg';
import llama2 from '../assets/images/products/llama2.jpg';


const productImages = {
  'vase1.jpg': vase1,
  'vase2.jpg': vase2,
  'macrame1.jpg': macrame1,
  'macrame2.jpg': macrame2,
  'lamp1.jpg': lamp1,
  'lamp2.jpg': lamp2,
  'basket1.jpg': basket1,
  'basket2.jpg': basket2,
  'clock1.jpg': clock1,
  'clock2.jpg': clock2,
  'canvas1.jpg': canvas1,
  'canvas2.jpg': canvas2,

  'pencilcase1.jpg': pencilcase1,
  'pencilcase2.jpg': pencilcase2,
  'inkkit1.jpg': inkkit1,
  'inkkit2.jpg': inkkit2,
  'notebook1.jpg': notebook1,
  'notebook2.jpg': notebook2,
  'bookmark1.jpg': bookmark1,
  'bookmark2.jpg': bookmark2,
  'calendar1.jpg': calendar1,
  'calendar2.jpg': calendar2,
  'envelope1.jpg': envelope1,
  'envelope2.jpg': envelope2,

  'ganesha1.jpg': ganesha1,
  'ganesha2.jpg': ganesha2,
  'elephant1.jpg': elephant1,
  'elephant2.jpg': elephant2,
  'plate1.jpg': plate1,
  'plate2.jpg': plate2,
  'camel1.jpg': camel1,
  'camel2.jpg': camel2,
  'mask1.jpg': mask1,
  'mask2.jpg': mask2,
  'inlaybox1.jpg': inlaybox1,
  'inlaybox2.jpg': inlaybox2,

  'teddy1.jpg': teddy1,
  'teddy2.jpg': teddy2,
  'bunny1.jpg': bunny1,
  'bunny2.jpg': bunny2,
  'elephantplush1.jpg': elephantplush1,
  'elephantplush2.jpg': elephantplush2,
  'dino1.jpg': dino1,
  'dino2.jpg': dino2,
  'koala1.jpg': koala1,
  'koala2.jpg': koala2,
  'llama1.jpg': llama1,
  'llama2.jpg': llama2,

};

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleQuantity = (delta) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`Added ${quantity} ${product.name}(s) to cart`);
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-detail">
      <div className="product-detail-left">
        <Carousel showThumbs={false} showStatus={false} infiniteLoop>
          {product.images.map((imgName, idx) => (
            <div key={idx}>
              <img
                src={productImages[imgName] || '/placeholder.jpg'}
                alt={`${product.name} ${idx + 1}`}
              />
            </div>
          ))}
        </Carousel>
      </div>

      <div className="product-detail-right">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p><strong>Price:</strong> ${product.price}</p>
        <p><strong>In Stock:</strong> {product.stock}</p>

        <div className="quantity-control">
          <button onClick={() => handleQuantity(-1)}>-</button>
          <span>{quantity}</span>
          <button onClick={() => handleQuantity(1)}>+</button>
        </div>

        <button className="btn-add-cart" onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetail;
