const LoadingSpinner = ({ size = 56, text = "Loading..." }) => {
  return (
    <section>
      <div
        className="animate-spin inline-block border-[6px] border-current border-t-transparent text-[#b3ff4a] rounded-full"
        role="status"
        aria-label="loading"
        style={{ width: `${size}px`, height: `${size}px` }}
      ></div>
      <p className="text-gray-50 mt-3 text-sm">{text}</p>
    </section>
  );
};

export default LoadingSpinner;
