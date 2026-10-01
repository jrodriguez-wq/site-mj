/**
 * Datos de lugares de interés para las comunidades
 */

export interface Place {
  id: string;
  name: string;
  category: string;
  address: string;
  lat: number;
  lng: number;
  phone?: string;
  website?: string;
}

export interface CommunityPlaces {
  labelle: {
    center: { lat: number; lng: number; zoom: number };
    places: Place[];
  };
  lehighAcres: {
    center: { lat: number; lng: number; zoom: number };
    places: Place[];
  };
}

export const COMMUNITY_PLACES: CommunityPlaces = {
  labelle: {
    center: { lat: 26.7617, lng: -81.4381, zoom: 13 },
    places: [
      // Nuestra Oficina
      {
        id: "mj-newell-homes-office",
        name: "MJ Newell Homes",
        category: "Nuestra Oficina",
        address: "45 Bridge St, LaBelle, FL 33935",
        lat: 26.7623241,
        lng: -81.4373774,
        phone: "(239) 323-9797",
        website: "https://www.mjnewellhomes.com",
      },
      // Restaurantes
      {
        id: "mcdonalds-labelle",
        name: "McDonald's",
        category: "Restaurantes",
        address: "1200 S Bridge St, LaBelle, FL 33935",
        lat: 26.7589,
        lng: -81.4378,
        phone: "(863) 675-0000",
      },
      {
        id: "tacobell-labelle",
        name: "Taco Bell",
        category: "Restaurantes",
        address: "1200 S Bridge St, LaBelle, FL 33935",
        lat: 26.7591,
        lng: -81.4375,
        phone: "(863) 675-0001",
      },
      {
        id: "subway-labelle",
        name: "Subway",
        category: "Restaurantes",
        address: "100 S Bridge St, LaBelle, FL 33935",
        lat: 26.7620,
        lng: -81.4385,
        phone: "(863) 675-0002",
      },
      {
        id: "pizza-hut-labelle",
        name: "Pizza Hut",
        category: "Restaurantes",
        address: "800 S Bridge St, LaBelle, FL 33935",
        lat: 26.7600,
        lng: -81.4380,
        phone: "(863) 675-0003",
      },
      {
        id: "kfc-labelle",
        name: "KFC",
        category: "Restaurantes",
        address: "600 S Bridge St, LaBelle, FL 33935",
        lat: 26.7610,
        lng: -81.4370,
        phone: "(863) 675-0004",
      },
      {
        id: "burger-king-labelle",
        name: "Burger King",
        category: "Restaurantes",
        address: "400 S Bridge St, LaBelle, FL 33935",
        lat: 26.7630,
        lng: -81.4390,
        phone: "(863) 675-0005",
      },
      {
        id: "dominos-labelle",
        name: "Domino's Pizza",
        category: "Restaurantes",
        address: "200 S Bridge St, LaBelle, FL 33935",
        lat: 26.7640,
        lng: -81.4400,
        phone: "(863) 675-0006",
      },
      {
        id: "wendys-labelle",
        name: "Wendy's",
        category: "Restaurantes",
        address: "300 S Bridge St, LaBelle, FL 33935",
        lat: 26.7650,
        lng: -81.4410,
        phone: "(863) 675-0007",
      },
      {
        id: "dunkin-labelle",
        name: "Dunkin'",
        category: "Restaurantes",
        address: "500 S Bridge St, LaBelle, FL 33935",
        lat: 26.7660,
        lng: -81.4420,
        phone: "(863) 675-0008",
      },
      {
        id: "sonic-labelle",
        name: "Sonic Drive-In",
        category: "Restaurantes",
        address: "700 S Bridge St, LaBelle, FL 33935",
        lat: 26.7670,
        lng: -81.4430,
        phone: "(863) 675-0009",
      },
      {
        id: "arby-labelle",
        name: "Arby's",
        category: "Restaurantes",
        address: "900 S Bridge St, LaBelle, FL 33935",
        lat: 26.7680,
        lng: -81.4440,
        phone: "(863) 675-0010",
      },
      {
        id: "papa-johns-labelle",
        name: "Papa John's Pizza",
        category: "Restaurantes",
        address: "1100 S Bridge St, LaBelle, FL 33935",
        lat: 26.7690,
        lng: -81.4450,
        phone: "(863) 675-0011",
      },
      // Supermercados
      {
        id: "walmart-labelle",
        name: "Walmart Supercenter",
        category: "Supermercados",
        address: "1500 S Bridge St, LaBelle, FL 33935",
        lat: 26.7550,
        lng: -81.4350,
        phone: "(863) 675-0100",
      },
      {
        id: "publix-labelle",
        name: "Publix",
        category: "Supermercados",
        address: "500 N Bridge St, LaBelle, FL 33935",
        lat: 26.7700,
        lng: -81.4460,
        phone: "(863) 675-0101",
      },
      {
        id: "aldi-labelle",
        name: "ALDI",
        category: "Supermercados",
        address: "300 N Bridge St, LaBelle, FL 33935",
        lat: 26.7710,
        lng: -81.4470,
        phone: "(863) 675-0102",
      },
      // Gasolineras
      {
        id: "shell-labelle",
        name: "Shell",
        category: "Gasolineras",
        address: "1000 S Bridge St, LaBelle, FL 33935",
        lat: 26.7605,
        lng: -81.4375,
        phone: "(863) 675-0200",
      },
      {
        id: "bp-labelle",
        name: "BP",
        category: "Gasolineras",
        address: "200 N Bridge St, LaBelle, FL 33935",
        lat: 26.7720,
        lng: -81.4480,
        phone: "(863) 675-0201",
      },
      {
        id: "chevron-labelle",
        name: "Chevron",
        category: "Gasolineras",
        address: "1300 S Bridge St, LaBelle, FL 33935",
        lat: 26.7570,
        lng: -81.4360,
        phone: "(863) 675-0202",
      },
      // Escuelas
      {
        id: "labelle-elementary",
        name: "LaBelle Elementary School",
        category: "Escuelas",
        address: "800 E Cowboy Way, LaBelle, FL 33935",
        lat: 26.7650,
        lng: -81.4300,
        phone: "(863) 675-0300",
      },
      {
        id: "labelle-middle",
        name: "LaBelle Middle School",
        category: "Escuelas",
        address: "800 E Cowboy Way, LaBelle, FL 33935",
        lat: 26.7640,
        lng: -81.4310,
        phone: "(863) 675-0301",
      },
      {
        id: "labelle-high",
        name: "LaBelle High School",
        category: "Escuelas",
        address: "800 E Cowboy Way, LaBelle, FL 33935",
        lat: 26.7630,
        lng: -81.4320,
        phone: "(863) 675-0302",
      },
      // Hospitales/Clínicas
      {
        id: "hendry-regional-labelle",
        name: "Hendry Regional Medical Center",
        category: "Hospitales",
        address: "524 W Sagamore Ave, Clewiston, FL 33440",
        lat: 26.7500,
        lng: -81.4500,
        phone: "(863) 675-0400",
      },
    ],
  },
  lehighAcres: {
    center: { lat: 26.6256, lng: -81.6248, zoom: 13 },
    places: [
      // Restaurantes
      {
        id: "mcdonalds-lehigh",
        name: "McDonald's",
        category: "Restaurantes",
        address: "1000 Lee Blvd, Lehigh Acres, FL 33936",
        lat: 26.6250,
        lng: -81.6250,
        phone: "(239) 368-0000",
      },
      {
        id: "tacobell-lehigh",
        name: "Taco Bell",
        category: "Restaurantes",
        address: "1100 Lee Blvd, Lehigh Acres, FL 33936",
        lat: 26.6260,
        lng: -81.6260,
        phone: "(239) 368-0001",
      },
      {
        id: "subway-lehigh",
        name: "Subway",
        category: "Restaurantes",
        address: "1200 Lee Blvd, Lehigh Acres, FL 33936",
        lat: 26.6270,
        lng: -81.6270,
        phone: "(239) 368-0002",
      },
      {
        id: "pizza-hut-lehigh",
        name: "Pizza Hut",
        category: "Restaurantes",
        address: "1300 Lee Blvd, Lehigh Acres, FL 33936",
        lat: 26.6280,
        lng: -81.6280,
        phone: "(239) 368-0003",
      },
      {
        id: "kfc-lehigh",
        name: "KFC",
        category: "Restaurantes",
        address: "1400 Lee Blvd, Lehigh Acres, FL 33936",
        lat: 26.6290,
        lng: -81.6290,
        phone: "(239) 368-0004",
      },
      {
        id: "burger-king-lehigh",
        name: "Burger King",
        category: "Restaurantes",
        address: "1500 Lee Blvd, Lehigh Acres, FL 33936",
        lat: 26.6300,
        lng: -81.6300,
        phone: "(239) 368-0005",
      },
      {
        id: "dominos-lehigh",
        name: "Domino's Pizza",
        category: "Restaurantes",
        address: "1600 Lee Blvd, Lehigh Acres, FL 33936",
        lat: 26.6310,
        lng: -81.6310,
        phone: "(239) 368-0006",
      },
      {
        id: "wendys-lehigh",
        name: "Wendy's",
        category: "Restaurantes",
        address: "1700 Lee Blvd, Lehigh Acres, FL 33936",
        lat: 26.6320,
        lng: -81.6320,
        phone: "(239) 368-0007",
      },
      {
        id: "dunkin-lehigh",
        name: "Dunkin'",
        category: "Restaurantes",
        address: "1800 Lee Blvd, Lehigh Acres, FL 33936",
        lat: 26.6330,
        lng: -81.6330,
        phone: "(239) 368-0008",
      },
      {
        id: "sonic-lehigh",
        name: "Sonic Drive-In",
        category: "Restaurantes",
        address: "1900 Lee Blvd, Lehigh Acres, FL 33936",
        lat: 26.6340,
        lng: -81.6340,
        phone: "(239) 368-0009",
      },
      {
        id: "arby-lehigh",
        name: "Arby's",
        category: "Restaurantes",
        address: "2000 Lee Blvd, Lehigh Acres, FL 33936",
        lat: 26.6350,
        lng: -81.6350,
        phone: "(239) 368-0010",
      },
      {
        id: "papa-johns-lehigh",
        name: "Papa John's Pizza",
        category: "Restaurantes",
        address: "2100 Lee Blvd, Lehigh Acres, FL 33936",
        lat: 26.6360,
        lng: -81.6360,
        phone: "(239) 368-0011",
      },
      // Supermercados
      {
        id: "walmart-lehigh",
        name: "Walmart Supercenter",
        category: "Supermercados",
        address: "2500 Lee Blvd, Lehigh Acres, FL 33936",
        lat: 26.6400,
        lng: -81.6400,
        phone: "(239) 368-0100",
      },
      {
        id: "publix-lehigh",
        name: "Publix",
        category: "Supermercados",
        address: "500 Homestead Rd N, Lehigh Acres, FL 33936",
        lat: 26.6200,
        lng: -81.6200,
        phone: "(239) 368-0101",
      },
      {
        id: "aldi-lehigh",
        name: "ALDI",
        category: "Supermercados",
        address: "600 Homestead Rd N, Lehigh Acres, FL 33936",
        lat: 26.6210,
        lng: -81.6210,
        phone: "(239) 368-0102",
      },
      {
        id: "target-lehigh",
        name: "Target",
        category: "Supermercados",
        address: "700 Homestead Rd N, Lehigh Acres, FL 33936",
        lat: 26.6220,
        lng: -81.6220,
        phone: "(239) 368-0103",
      },
      // Gasolineras
      {
        id: "shell-lehigh",
        name: "Shell",
        category: "Gasolineras",
        address: "800 Lee Blvd, Lehigh Acres, FL 33936",
        lat: 26.6240,
        lng: -81.6240,
        phone: "(239) 368-0200",
      },
      {
        id: "bp-lehigh",
        name: "BP",
        category: "Gasolineras",
        address: "900 Lee Blvd, Lehigh Acres, FL 33936",
        lat: 26.6230,
        lng: -81.6230,
        phone: "(239) 368-0201",
      },
      {
        id: "chevron-lehigh",
        name: "Chevron",
        category: "Gasolineras",
        address: "1000 Homestead Rd N, Lehigh Acres, FL 33936",
        lat: 26.6190,
        lng: -81.6190,
        phone: "(239) 368-0202",
      },
      {
        id: "exxon-lehigh",
        name: "Exxon",
        category: "Gasolineras",
        address: "1100 Homestead Rd N, Lehigh Acres, FL 33936",
        lat: 26.6180,
        lng: -81.6180,
        phone: "(239) 368-0203",
      },
      // Escuelas
      {
        id: "lehigh-elementary",
        name: "Lehigh Elementary School",
        category: "Escuelas",
        address: "2000 E 5th St, Lehigh Acres, FL 33936",
        lat: 26.6150,
        lng: -81.6150,
        phone: "(239) 368-0300",
      },
      {
        id: "lehigh-middle",
        name: "Lehigh Middle School",
        category: "Escuelas",
        address: "2100 E 5th St, Lehigh Acres, FL 33936",
        lat: 26.6140,
        lng: -81.6140,
        phone: "(239) 368-0301",
      },
      {
        id: "lehigh-high",
        name: "Lehigh Senior High School",
        category: "Escuelas",
        address: "2200 E 5th St, Lehigh Acres, FL 33936",
        lat: 26.6130,
        lng: -81.6130,
        phone: "(239) 368-0302",
      },
      // Hospitales/Clínicas
      {
        id: "lehigh-regional",
        name: "Lehigh Regional Medical Center",
        category: "Hospitales",
        address: "1500 Lee Blvd, Lehigh Acres, FL 33936",
        lat: 26.6300,
        lng: -81.6300,
        phone: "(239) 368-0400",
      },
      {
        id: "gulf-coast-lehigh",
        name: "Gulf Coast Medical Center",
        category: "Hospitales",
        address: "13681 Doctor's Way, Fort Myers, FL 33912",
        lat: 26.6000,
        lng: -81.6000,
        phone: "(239) 368-0401",
      },
    ],
  },
};

/**
 * Obtiene los lugares agrupados por categoría
 */
export const getPlacesByCategory = (places: Place[]) => {
  const grouped: Record<string, Place[]> = {};
  places.forEach((place) => {
    if (!grouped[place.category]) {
      grouped[place.category] = [];
    }
    grouped[place.category].push(place);
  });
  return grouped;
};

/**
 * Obtiene el conteo de lugares por categoría
 */
export const getCategoryCounts = (places: Place[]) => {
  const counts: Record<string, number> = {};
  places.forEach((place) => {
    counts[place.category] = (counts[place.category] || 0) + 1;
  });
  return counts;
};
