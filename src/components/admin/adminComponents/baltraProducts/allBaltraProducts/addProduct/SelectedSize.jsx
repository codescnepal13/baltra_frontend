const SelectedSize = ({ sizes }) => {
  return (
    <div className="flex flex-wrap">
      {sizes.map((size, index) => (
        <div
          key={index}
          className="px-2 py-1 mr-2 mb-2 border border-gray-300 rounded-md"
          style={{ minWidth: "30px" }}
        >
          {size}
        </div>
      ))}
    </div>
  );
};

export default SelectedSize;
