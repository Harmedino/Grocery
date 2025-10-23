import React, { useEffect, useState } from 'react';
import { useAppContext } from '../contex/AppContex';
import { dummyOrders } from '../assets/assets';

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { currency } = useAppContext();

  const fetchMyOrders = async () => {
    setMyOrders(dummyOrders);
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  return (
    <div className="mt-16 pb-16">
      {/* Page Header */}
      <div className="flex flex-col items-start w-full mb-8">
        <p className="text-2xl font-medium uppercase">My Orders</p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>

      {/* Orders */}
      {myOrders.length === 0 ? (
        <p className="text-gray-500 text-center">You have no orders yet.</p>
      ) : (
        myOrders.map((order, index) => (
          <div
            key={index}
            className="mb-10 border border-gray-300 rounded-lg p-4 max-w-5xl mx-auto"
          >
            {/* Top Info Row */}
            <div className="flex justify-between text-gray-600 font-medium flex-wrap">
              <span>OrderId : {order._id}</span>
              <span>Payment : {order.paymentType}</span>
              <span>
                Total Amount : {currency}
                {order.totalAmount || order.amount}
              </span>
            </div>

            {/* Divider Line */}
            <hr className="border-t border-gray-300 my-3" />

            {/* Product List */}
            {order.items.map((item, i) => (
              <div
                key={i}
                className="grid grid-cols-12 gap-4 items-start mt-4"
              >
                {/* Left Column - Product Image */}
                <div className="col-span-2 flex justify-center">
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <img
                      src={item.product.image[0]}
                      alt={item.product.name}
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                </div>

                {/* Middle Column - Product Info + Quantity/Status/Date */}
                <div className="col-span-7">
                  <h2 className="text-lg font-medium text-gray-800">
                    {item.product.name}
                  </h2>
                  <p className="text-sm text-gray-500 mb-2">
                    Category: {item.product.category}
                  </p>

                  {/* These three lines appear directly under Payment section */}
                  <div className="ml-12 text-sm text-gray-600 leading-tight">
                    <p>Quantity : {item.quantity || 1}</p>
                    <p>Status : {item.status}</p>
                    <p>Date : {new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Right Column - Amount */}
                <div className="col-span-3 flex justify-end items-center">
                  <p className="text-primary text-lg font-semibold">
                    {currency}
                    {(item.product.offerPrice * (item.quantity || 1)).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}

            {/* Order Total */}
            <p className="mt-6 font-semibold text-right text-gray-800">
              Total: {currency}
              {order.totalAmount || order.amount}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
