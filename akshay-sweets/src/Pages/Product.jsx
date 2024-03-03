import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import {ProductDisplay} from '../components/Product Dispaly/ProductDisplay'
import { Breadcrumbs } from '../components/breadcrumbs/Breadcrumbs.jsx';
import { RelatedProduct } from '../components/Related Product/RelatedProduct.jsx';
import { ShopContext } from '../components/context/ShopContext.jsx';
const Product = () => {
  const { All_products} = useContext(ShopContext)
  const { productId } = useParams();
  const product = All_products.find(product => product.id === Number(productId));
  return (
    <div>
      <ProductDisplay product={product}/>
      <RelatedProduct/>
    </div>
  );
};

export default Product;
