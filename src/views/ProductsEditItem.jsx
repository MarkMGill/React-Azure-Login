import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { updateProduct } from '../redux/productsSlice';

export const ProductsEditItem = ({product}) => {
    const dispatch = useDispatch();
    const {products} = useSelector((state) => state.products);
    //console.log(products)
    /*const initialValues = {
      type: product.name,
      price: product.price,
      city: product.city,
      state: product.state,
    };*/
  
    const validationSchema = Yup.object({
      type: Yup.string().required('Required'),
      price: Yup.number().required('Required').min(0, 'Price must be positive'),
      city: Yup.string().required('Required'),
      stateAbr: Yup.string().required('Required'),
    });
  
    const handleSubmit = (values) => {
        console.log('submit')
      const updatedProduct = {
        id: product.id,
        type: values.type,
        price: values.price,
        city: values.city,
        stateAbr: values.stateAbr,
      };
  
      dispatch(updateProduct(updatedProduct));

    };
  
    useEffect(() => {
        console.log(products)
      }, [products])
  
    return (
    <div>
        <h3>{product.name}</h3>
            <Formik initialValues={product} validationSchema={validationSchema} onSubmit={handleSubmit}>
              <Form>
                <div>
                  <label htmlFor="type">Type</label>
                  <Field type="text" id="type" name="type" />
                  <ErrorMessage name="type" component="div" />
                </div>
  
                <div>
                  <label htmlFor="price">Price</label>
                  <Field type="number" id="price" name="price" />
                  <ErrorMessage name="price" component="div" />
                </div>
  
                <div>
                  <label htmlFor="city">City</label>
                  <Field type="text" id="city" name="city" />
                  <ErrorMessage name="city" component="div" />
                </div>
  
                <div>
                  <label htmlFor="stateAbr">State</label>
                  <Field type="text" id="stateAbr" name="stateAbr" />
                  <ErrorMessage name="stateAbr" component="div" />
                </div>
  
                <button type="submit">Save Changes</button>
              </Form>
            </Formik>
          </div>
    );
  }