export interface ModelData {
  key: string;
  name: string;
  sqft: string;
  bedrooms: string;
  bathrooms: string;
  garage: string;
  price: string;
  description: string;
  youtubeUrl?: string;
  imagesFolder: string;
  sections: {
    inside?: {
      title: string;
      description?: string;
    };
    exterior?: {
      title: string;
      description?: string;
    };
    virtualTour?: {
      title: string;
      description?: string;
    };
    floorplan?: {
      title: string;
      description?: string;
      image?: string;
    };
    standardFeatures?: {
      title: string;
      description?: string;
      categories?: {
        [key: string]: {
          title: string;
          items: string[];
        };
      };
    };
  };
}

