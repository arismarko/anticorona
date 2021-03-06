import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Router from 'next/router'
import css from './AddStore.scss';

import { Modal } from 'react-bulma-components';

import { Field, Formik, Form } from 'formik';


import { StoreContext } from '../../providers/stores/stores.provider';
import { addItemToStore } from '../../providers/stores/stores.utils';


import AddItem from '../AddItem/AddItem';

const AddStore = () => {
    const { storeItems, addItem } = useContext(StoreContext);
    const [ open, setOpen] = useState(false);

    const [ location, setLocation] = useState(false);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocation(`${position.coords.latitude},${position.coords.longitude}`)
            });
        } else { 
            setLocation(none, none)
        }
        
    },[]);

    return (
        <div className="container">
            <section>
                <div className='columns'>
                    <div className="column is-8">
                        <Formik
                            initialValues={{ storename: '', location: '', coordinates: '' }}
                            validate={values => {
                                const errors = {};
                                return errors;
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                setTimeout(() => {

                                values.items = storeItems;
                                values.coordinates = location;
                                values.amount = 0;
                                
                                axios.post(`${process.env.SERVER}/api/stores`, values).then(
                                    (response) => { 
                                        console.log(response) 
                                        Router.push('/')
                                    },
                                    (error) => {
                                        console.log(error);
                                    }
                                )

                                setSubmitting(false);
                                }, 400);
                            }}
                            >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                isSubmitting,
                                /* and other goodies */
                            }) => (
                            <form onSubmit={handleSubmit}>
                            <div className="field">
                                <label className="label">Store name</label>
                                <div className="control">
                                    <input
                                        className="input" 
                                        type="text"
                                        name="storename"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        placeholder="Tesco or Sainsbury's" 
                                    />
                                    {errors.email && touched.email && errors.email}

                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Location</label>
                                <div className="control">
                                    <input
                                        className="input" 
                                        type="text"
                                        name="location"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.location}
                                        placeholder="Camden" 
                                    />
                                    {errors.email && touched.email && errors.email}

                                </div>
                            </div>

                           
                            
                            <div className="field">
                                <h2>Missing Items</h2>  

                                <div className={`${open? css.hide : ''}`}>
                                    <a 
                                        onClick={() => setOpen(!open)}
                                        aria-haspopup="true">Add Item and Quantity
                                    </a>
                                    <br />
                                    
                                    {
                                        storeItems.length === 0 ?
                                        "No Items added" :
                                        storeItems.map(({item, number}) => 
                                            <ul>
                                                <li>{item} x {number}</li>
                                            </ul>
                                        )
                                    }
                                </div>

                                <div className={`${css.formborder} ${!open? css.hide : ''}`}>
                                    <a className={css.closeBtn} onClick={() => setOpen(!open)}>X</a>
                                    <AddItem close={() => setOpen(!open)} />
                                </div> 
                            </div>
                         

                            <div className={`field is-grouped ${css.addmissings}`}>
                                <div className="control">
                                    <button className="button is-link">Submit</button>
                                </div>
                            </div>
                            
                        </form>
                    )}
                    </Formik> 
                    </div>

                 
                </div>
            </section>
        </div>
    )
}

export default AddStore; 