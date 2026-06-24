const ProductVaccum = ({ singleProduct }) => {
  return (
    (singleProduct?.galleryimageone || singleProduct?.galleryimagetwo) && (
      <div className="mt-6 bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gray-800 text-white px-6 py-4">
          <h3 className="text-xl font-bold">Product Gallery</h3>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {singleProduct?.galleryimageone && (
            <div className="w-full h-96 rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={singleProduct?.galleryimageone}
                alt="Gallery Image 1"
                className="w-full h-full object-contain"
              />
            </div>
          )}
          {singleProduct?.galleryimagetwo && (
            <div className="w-full h-96 rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={singleProduct?.galleryimagetwo}
                alt="Gallery Image 2"
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default ProductVaccum;
