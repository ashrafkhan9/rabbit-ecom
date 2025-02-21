import {
  HiShoppingBag,
  HiArrowPathRoundedSquare,
  HiOutlineCreditCard,
} from "react-icons/hi2";

const Features = () => {
  const features = [
    {
      icon: <HiShoppingBag className="text-3xl text-gray-700" />,
      title: "FREE INTERNATIONAL SHIPPING",
      description: "On all orders $100.00",
    },
    {
      icon: <HiArrowPathRoundedSquare className="text-3xl text-gray-700" />,
      title: "45 DAYS RETURN",
      description: "Money back guarantee",
    },
    {
      icon: <HiOutlineCreditCard className="text-3xl text-gray-700" />,
      title: "SECURE CHECKOUT",
      description: "100% secured checkout process",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="p-4 rounded-full bg-gray-100 flex items-center justify-center w-16 h-16 mb-4">
              {feature.icon}
            </div>
            <h4 className="text-sm font-semibold tracking-tight">
              {feature.title}
            </h4>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
