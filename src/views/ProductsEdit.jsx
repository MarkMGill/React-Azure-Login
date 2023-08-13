import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../redux/productsSlice';
import { ProductsEditItem } from './ProductsEditItem';

const ProductsEdit = () => {
  const dispatch = useDispatch();
  const {products} = useSelector((state) => state.products);
  
  useEffect(() => {
    dispatch(setProducts());
  }, [])


  return (
    <div>
      <h1>Product List</h1>
      {products?.map((product, index) => (
        <ProductsEditItem product={product} key={product.id} />
      ))}
    </div>
  );
};

export default ProductsEdit;
