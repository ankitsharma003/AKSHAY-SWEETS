import React from 'react';

export const Breadcrumbs = (props) => {
  const { product } = props;
  return (
    <div className='breadcrumbs'>
      Shop now {product.name}
    </div>
  );
};
