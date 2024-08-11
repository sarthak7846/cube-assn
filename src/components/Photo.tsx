import { FC, useEffect, useState } from "react";
import { createApi } from "unsplash-js";
import { ImageDataResponse } from "../types/ImageDataResponse";
import { PhotoProps } from "../types/PhotoProps";

const api = createApi({
  accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY || "",
});

export const Photo: FC<PhotoProps> = ({ customerId }) => {
  const [imageData, setPhotosResponse] = useState<ImageDataResponse | null>(
    null
  );

  useEffect(() => {
    const fetchPhotos = () => {
      api.photos
        .getRandom({ count: 9, query: "space" })
        .then((result) => {
          const formattedResult = {
            response: result.response || null,
            errors: result.errors || null,
          } as ImageDataResponse;

          setPhotosResponse(formattedResult);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchPhotos();

    const intervalId = setInterval(fetchPhotos, 10000);

    return () => clearInterval(intervalId);
  }, [customerId]);

  if (imageData === null) {
    return <div className="flex justify-center">Loading Images...</div>;
  } else if (imageData.errors) {
    return (
      <div>
        {imageData.errors.map((error, index) => (
          <div key={index}>{error}</div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="grid grid-cols-3 gap-2 mt-3 justify-items-center">
        {imageData.response.map((photo) => (
          <div key={photo.id} className="my-1">
            <img className="h-28 w-28 rounded-lg" src={photo.urls.regular} />
          </div>
        ))}
      </div>
    );
  }
};
