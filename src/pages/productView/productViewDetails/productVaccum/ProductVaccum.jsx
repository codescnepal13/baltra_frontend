import { motion } from "framer-motion";

const ProductVaccum = ({ singleProduct }) => {
  const imageOne = singleProduct?.galleryimageone;
  const imageTwo = singleProduct?.galleryimagetwo;

  if (!imageOne && !imageTwo) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mt-6 bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className="bg-gray-800 text-white px-6 py-4">
        <h3 className="text-xl font-bold">Product Gallery</h3>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {imageOne && (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
            whileHover={{ scale: 1.03 }}
            className="w-full aspect-[3/2] rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={imageOne}
              alt="Product gallery 1"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-contain"
            />
          </motion.div>
        )}

        {imageTwo && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.2, ease: "easeOut" }}
            whileHover={{ scale: 1.03 }}
            className="w-full aspect-[3/2] rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={imageTwo}
              alt="Product gallery 2"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-contain"
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductVaccum;
