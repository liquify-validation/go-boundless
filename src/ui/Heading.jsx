const Heading = ({ title, subtitle }) => {
  return (
    <div className="text-center py-10">
      <h2 className="text-3xl font-semibold text-gray-150 lg:text-4xl">
        {title}
      </h2>
      <p className="mt-6 text-gray-50 text-gray-150">{subtitle}</p>
    </div>
  );
};

export default Heading;
