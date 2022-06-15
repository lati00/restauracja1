import { PriceRange } from "./Restaurant";

export interface AddRestaurant {
  name: string;
  desc: string;
  menu: string;
  priceRange: PriceRange;
}
