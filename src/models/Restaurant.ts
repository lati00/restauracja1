export type PriceRange = "$" | "$$" | "$$$";

export interface Restaurant {
  id: number;
  name: string;
  desc: string;
  menu: Array<string>;
  priceRange: PriceRange;
}

export const restaurants: Array<Restaurant> = [
  {
    id: 1,
    name: "Polski kebab",
    desc: "Najlepszy kebab w mieście",
    menu: [
      "kebab bułka",
      "kebab tortilla",
      "falafel"
    ],
    priceRange: "$"
  },
  {
    id: 2,
    name: "KFC (Korean Fried Chicken)",
    desc: "Pyszne koreańskie, dobre na lunch",
    menu: [
      "KFC",
      "kimchi",
      "ryż"
    ],
    priceRange: "$$"
  },
  {
    id: 3,
    name: "Napoli",
    desc: "Italiano pizza from Napoli!",
    menu: [
      "pizza margherita",
      "pizza salami",
      "spaghetti carbonara",
      "spaghetti bolognese"
    ],
    priceRange: "$$$"
  },
  {
    id: 4,
    name: "Obiadek jak u mamy",
    desc: "dobre bo polskie",
    menu: [
      "kotlet schabowy",
      "mizeria",
      "rosół",
      "bigos"
    ],
    priceRange: "$"
  }
]
