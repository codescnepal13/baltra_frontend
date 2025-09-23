// const ProductVaccum = ({ singleProduct }) => {
//   return (
//     <div className="flex flex-col sm:flex-row gap-4 my-14 px-4 sm:px-8">
//       <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
//         <img
//           className="w-full h-96 sm:h-96 object-contain"
//           src={singleProduct?.galleryimageone}
//           alt="Baltra Blue Vacuum"
//         />
//       </div>
//       <div className="w-full sm:w-1/2">
//         <img
//           className="w-full h-96 sm:h-96 object-contain"
//           src={singleProduct?.galleryimagetwo}
//           alt="Baltra Red Vacuum"
//         />
//       </div>
//     </div>
//   );
// };

// export default ProductVaccum;
const ProductVaccum = ({ singleProduct }) => {
  return (
    (singleProduct?.galleryimageone || singleProduct?.galleryimagetwo) && (
      <div className="mt-6 bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gray-800 text-white px-6 py-4">
          <h3 className="text-xl font-bold">Product Gallery</h3>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {singleProduct?.galleryimageone && (
            <img
              src={singleProduct?.galleryimageone}
              alt="Gallery Image 1"
              className="w-full rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
            />
          )}
          {singleProduct?.galleryimagetwo && (
            <img
              src={singleProduct?.galleryimagetwo}
              alt="Gallery Image 2"
              className="w-full rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
            />
          )}
        </div>
      </div>
    )
  );
};

export default ProductVaccum;
