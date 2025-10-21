import React, { useState } from 'react'
import { assets } from '../assets/assets'

const inputField =  ({type, placeholder, name, handleChange,  address })=>  (
    <input type={type}
    placeholder={placeholder}
    onChange={handleChange}
    name={name}
    value={address[name]}
    required
    className="w-full md:w-80 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
    />
)

const AddAddress = ()=>{
    const [address, setAddress] = useState()
}

const onSubmitHandler = (e)=>{
    e.preventDefault()
    //logic to add address
}
const AddAddress = () => {
  return (
    <div className='mt-16 pb-16'>
        <p className='text-2xl md:text-3xl text-grey-500'>Add Shipping <span className='font-semibold text-primary'>Address</span></p>


    <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
<div>
    <form onSubmit={onSubmitHandler}  className='space-y-3 mt-6 text-sm'>

        <div>
            <inputField handleChange={handleChange}  address={address} name="firstName" type="text" placeholder="First Name"/>
            <inputField handleChange={handleChange}  address={address} name="lastName" type="text" placeholder="Last Name"/>
        </div>
    </form>
</div>


    <img className='md:mr-16 mb-16 md:mt-0' src={assets.add_address_iamge} alt="Add address" />


    </div>
    </div>
  )
}

export default AddAddress