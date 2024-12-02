const LaptopCard = ({
  name,
  description,
  features,
  ctaLink,
  image,
  reverse = false,
}) => {
  return (
    <div
      className={`flex flex-col md:flex-row ${
        reverse ? "md:flex-row-reverse" : ""
      } items-center mb-8`}
    >
      {/* Image Section */}
      <div className="md:w-1/2">
        <img
          src={image}
          alt={name}
          className="w-full h-auto rounded-lg shadow-lg"
        />
        {/* Description */}
        <p className="text-gray-600 mt-4 text">{description}</p>
      </div>

      {/* Content Section */}
      <div className="md:w-1/2 flex flex-col justify-center p-6">
        <h3 className="text-2xl font-bold text-gray-800">{name}</h3>

        {/* Features Table */}
        <div className="overflow-x-auto mt-4">
          <table className="table-auto border-collapse border border-gray-400 w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-400 px-4 py-2 text-left">
                  Feature
                </th>
                <th className="border border-gray-400 px-4 py-2 text-left">
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-gray-200`}
                >
                  <td className="border border-gray-400 px-4 py-2">
                    {feature.name}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {feature.detail}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* CTA Button */}
        <a
          href={ctaLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block px-6 py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow transition duration-200"
        >
          Check Price on Amazon
        </a>
      </div>
    </div>
  );
};

export default LaptopCard;
