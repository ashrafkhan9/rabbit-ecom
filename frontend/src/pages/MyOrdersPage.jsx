import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserOrders } from "../redux/slice/orderSlice";

const MyOrdersPage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const handleRowClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>
      <div className="relative shadow-md sm:rounded-lg overflow-hidden">
        <table className="min-w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-gray-800 to-gray-900 text-white uppercase text-sm">
            <tr>
              <th className="py-4 px-6 text-left">Image</th>
              <th className="py-4 px-6 text-left">Order ID</th>
              <th className="py-4 px-6 text-left">Created</th>
              <th className="py-4 px-6 text-left">Shipping Address</th>
              <th className="py-4 px-6 text-left">Items</th>
              <th className="py-4 px-6 text-left">Price</th>
              <th className="py-4 px-6 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 cursor-pointer">
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  onClick={() => handleRowClick(order._id)}
                  className="border-b border-gray-300 hover:bg-gray-200 transition-all duration-300"
                >
                  <td className="py-3 px-6">
                    <img
                      src={order.orderItem[0].image}
                      alt={order.orderItem[0].name}
                      className="w-12 h-12 object-cover rounded-lg shadow-md border border-gray-300"
                    />
                  </td>
                  <td className="py-3 px-6 text-gray-700">{order._id}</td>
                  <td className="py-3 px-6 text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()}{" "}
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </td>
                  <td className="py-3 px-6 text-gray-700">
                    {order.shippingAddress
                      ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
                      : "N/A"}
                    ,
                  </td>
                  <td className="py-3 px-6 text-gray-700">
                    {order.orderItem.length}
                  </td>
                  <td className="py-3 px-6 font-semibold text-gray-800">
                    ${order.totalPrice}
                  </td>
                  <td className="py-2 px-2 font-bold text-center">
                    <span
                      className={`${
                        order.isPaid
                          ? "text-green-200 bg-green-700"
                          : "text-red-100 bg-red-700"
                      } px-2 py-1 rounded-full text-xs sm:text-sm`}
                    >
                      {order.isPaid ? "Paid" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-6 px-6 text-center text-gray-500">
                  You have no orders
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrdersPage;
