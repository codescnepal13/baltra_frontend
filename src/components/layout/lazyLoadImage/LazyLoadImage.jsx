import React, { memo, useState } from "react";

const LazyLoadImage = memo(({ url }) => {
  const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
  
  return (
    <>
      <div className="relative w-full h-48 object-contain">
        {/* Skeleton Loader */}
        {!loaded && !error && (
          <div className="absolute inset-0 bg-gray-300 animate-pulse" />
        )}
        {/* Image */}
        <img
          src={url}
          alt="Lazy Loaded"
          className={`w-full h-48 object-contain transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setLoaded(true)}
          onError={() => {
            setError(true); 
            setLoaded(true);
          }}
          loading="lazy"
        />
              {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <span className="text-3xl font-extrabold text-gray-800 drop-shadow-lg">
              BALTRA
            </span>
          </div>
        )}
      </div>
    </>
  );
});

export default LazyLoadImage;
