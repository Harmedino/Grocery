import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../contex/AppContex';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

// ✅ Reusable Input Field Component
const InputField = ({ type, placeholder, name, handleChange, address }) => (
  <input
    type={type}
    placeholder={placeholder}
    onChange={handleChange}
    name={name}
    value={address[name]}
    required
    className="w-full md:w-80 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
  />
);

// ✅ Main AddAddress Component
const AddAddress = () => {
  const {axios, navigate, user} = useAppContext()
  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
   try {
    const payload = { address, userId:user._id}
    const {data} = await axios.post('/api/address/add', payload)
    if(data.success){
      toast.success(data.message)
      navigate('/cart')
    }else{
      toast.error(data.message)
    }
   } catch (error) {
    toast.error(error.message)
   }
  };

  useEffect(()=>{
    if(!user){
      navigate('/cart')
    }
  },[])

  return (
    <div className="mt-16 pb-16">
      <p className="text-2xl md:text-3xl text-gray-500">
        Add Shipping <span className="font-semibold text-primary">Address</span>
      </p>

      <div className="flex flex-col-reverse md:flex-row justify-between mt-10">
        {/* Form Section */}
        <div>
          <form onSubmit={onSubmitHandler} className="space-y-3 mt-6 text-sm">
            <div className="grid  grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name="firstName"
                type="text"
                placeholder="First Name"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="lastName"
                type="text"
                placeholder="Last Name"
              />
            </div>
            <InputField
              handleChange={handleChange}
              address={address}
              name="email"
              type="email"
              placeholder="Email Address"
            />
            <InputField
              handleChange={handleChange}
              address={address}
              name="street"
              type="text"
              placeholder="Street"
            />
            <div className="grid  grid-cols-2 gap-4">
            <InputField
              handleChange={handleChange}
              address={address}
              name="city"
              type="text"
              placeholder="City"
            />
            <InputField
              handleChange={handleChange}
              address={address}
              name="state"
              type="text"
              placeholder="State"
            />
            </div>
            <div className="grid  grid-cols-2 gap-4">
            <InputField
              handleChange={handleChange}
              address={address}
              name="zipCode"
              type="text"
              placeholder="Zip Code"
            />
            <InputField
              handleChange={handleChange}
              address={address}
              name="country"
              type="text"
              placeholder="Country"
            />
            </div>
            <InputField
              handleChange={handleChange}
              address={address}
              name="phone"
              type="text"
              placeholder="Phone Number"
            />

            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark"
            >
              Save Address
            </button>
          </form>
        </div>

        {/* Image Section */}
        <img
          className="md:mr-16 mb-16 md:mt-0 w-80 md:w-96"
          src={assets.add_address_iamge}
          alt="Add address"
        />
      </div>
    </div>
  );
};

export default AddAddress;
