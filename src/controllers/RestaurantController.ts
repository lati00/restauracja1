import { Restaurant, PriceRange } from "../models/Restaurant";
import { ControllerError } from "../models/Error";
import { AddRestaurant } from "../models/AddRestaurant";

const sortingOptions = {
  "priceRange": (a: Restaurant, b: Restaurant) => a.priceRange.length - b.priceRange.length,
  "default": (a: Restaurant, b: Restaurant) => 0
}

export class RestaurantController {
  restaurants: Array<Restaurant>;

  constructor(restaurants: Array<Restaurant>) {
    this.restaurants = restaurants;
  }

  addRestaurant(restaurant: AddRestaurant) {
    this.restaurants.push(this.parseRestaurantToAdd(restaurant));

    return restaurant;
  }

  private parseRestaurantToAdd(addRestaurant: AddRestaurant) {
    const menu = addRestaurant.menu.split(",");
    const newId = Math.max(...this.restaurants.map(e => e.id)) + 1;
    const newRestaurant: Restaurant = {
      id: newId,
      name: addRestaurant.name,
      desc: addRestaurant.desc,
      menu: menu,
      priceRange: this.changeNumberToPriceRange(addRestaurant.priceRange.length % 3)
    }

    return newRestaurant;
  }

  private changeNumberToPriceRange(num: number): PriceRange {
    if (num === 3) return '$'
    if (num === 2) return '$$'
    return '$$$'
  }

  getRestaurant(name: string) {
    const found = this.restaurants.find(e => e.name === name);

    if (found === undefined) {
      return new ControllerError("Restaurant not found", 404);
    }
    return found;
  }

  getAllRestaurants(sortingOpt: string) {
    const sortingFunc: (a: Restaurant, b: Restaurant) => number = sortingOpt === "priceRange" ? sortingOptions.priceRange : sortingOptions.default;

    return this.restaurants.map(e => e).sort(sortingFunc);
  }

  deleteRestaurantByName(name: string) {
    this.restaurants = this.restaurants.filter(e => e.name !== name);
    return this.restaurants;
  }

  updateRestaurantByName(name: string, updated: Restaurant) {
    const restaurant = this.restaurants.find(e => e.name === name);
    if (restaurant !== undefined){
      this.updateRestaurant(restaurant, updated);
    }

    return restaurant;
  }

  private updateRestaurant(oldValue: Restaurant, newValue: Restaurant) {
    oldValue.desc = newValue.desc;
    oldValue.menu = newValue.menu;
    oldValue.priceRange = newValue.priceRange;
  }

}
