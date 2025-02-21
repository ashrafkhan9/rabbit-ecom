import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createCheckout } from "../../redux/slice/checkoutSlice";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Checkout = () => {
  const navigate = useNavigate();
  const [checkoutId, setCheckoutId] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  // Ensure cart is loaded before proceeding
  useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  // Handle checkout creation via form submission
  const handleCreateCheckout = async (e) => {
    e.preventDefault();
    if (cart && cart.products.length > 0) {
      const res = await dispatch(
        createCheckout({
          checkoutItems: cart.products,
          shippingAddress,
          paymentMethod: "Paypal", // or any method you want to fake
          totalPrice: cart.totalPrice,
        })
      );
      if (res.payload && res.payload._id) {
        setCheckoutId(res.payload._id);
      }
    }
  };

  // This function handles payment success by updating your checkout status
  const handlePaymentSuccess = async (paymentDetails) => {
    try {
      await axios.put(
        `${BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        { paymentStatus: "paid", paymentDetails },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      await handleFinalizedCheckout(checkoutId);
    } catch (error) {
      console.error("Payment success error:", error);
    }
  };

  const handleFinalizedCheckout = async (checkoutId) => {
    try {
      await axios.post(
        `${BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      navigate("/order-confirmation");
    } catch (error) {
      console.error("Finalize checkout error:", error);
    }
  };

  // Fake payment simulation: waits 2 seconds then calls handlePaymentSuccess with dummy data
  const simulateFakePayment = async () => {
    setPaymentLoading(true);
    // Simulate a delay for payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const dummyPaymentDetails = {
      transactionId: "FAKE12345",
      payerEmail: user ? user.email : "guest@example.com",
      amount: cart.totalPrice,
      status: "COMPLETED",
    };
    await handlePaymentSuccess(dummyPaymentDetails);
    setPaymentLoading(false);
  };

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!cart || !cart.products || cart.products.length === 0) {
    return <p>Your Cart is Empty</p>;
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      {/* Left Section: Checkout Form */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-4">Checkout</h2>
        <form onSubmit={handleCreateCheckout}>
          <h3 className="text-lg mb-3">Contact Details</h3>
          <div className="mb-3">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={user ? user.email : ""}
              className="w-full p-2 border rounded"
              disabled
            />
          </div>

          <h3 className="text-lg mb-3">Delivery</h3>
          <div className="mb-3 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                value={shippingAddress.firstName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    firstName: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                value={shippingAddress.lastName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    lastName: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Address</label>
            <input
              type="text"
              value={shippingAddress.address}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  address: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-3 grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-gray-700 mb-2">City</label>
              <input
                type="text"
                value={shippingAddress.city}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    city: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Postal Code</label>
              <input
                type="text"
                value={shippingAddress.postalCode}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    postalCode: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Country</label>
            <input
              type="text"
              value={shippingAddress.country}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  country: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 mt-4">Phone</label>
            <input
              type="text"
              value={shippingAddress.phone}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  phone: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mt-6">
            {!checkoutId ? (
              // When checkout isn't created yet, submit the form to create it.
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded"
              >
                Continue to Payment
              </button>
            ) : (
              <div>
                <h3 className="text-lg mb-4">Pay with Fake Payment</h3>
                <button
                  type="button"
                  onClick={simulateFakePayment}
                  disabled={paymentLoading}
                  className="w-full bg-blue-500 text-white py-3 rounded font-semibold hover:bg-blue-600 transition"
                >
                  {paymentLoading
                    ? "Processing Payment..."
                    : "Simulate Payment Success"}
                </button>
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Right Section: Order Summary */}
      <div className="bg-gray-100 p-6 rounded-lg">
        <h3 className="text-lg mb-4">Order Summary</h3>
        <div className="border-t py-4 mb-4">
          {cart.products.map((product, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 border-b"
            >
              <div className="flex items-start">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-cover mr-4"
                />
                <div>
                  <h3 className="text-md">{product.name}</h3>
                  <p className="text-gray-500">Size: {product.size}</p>
                  <p className="text-gray-500">Color: {product.color}</p>
                </div>
              </div>
              <p className="text-xl">${product.price?.toLocaleString()}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center text-lg mb-4">
          <p>Subtotal</p>
          <p>${cart.totalPrice?.toLocaleString()}</p>
        </div>

        <div className="flex justify-between items-center text-lg">
          <p>Shipping</p>
          <p>Free</p>
        </div>

        <div className="flex justify-between items-center text-lg mt-4 border-t pt-4">
          <p>Total</p>
          <p>${cart.totalPrice?.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
