interface UnsplashPhoto {
  id: string;
  urls: {
    regular: string;
  };
}

export interface ImageDataResponse {
  response: UnsplashPhoto[];
  errors: string[] | null;
}
