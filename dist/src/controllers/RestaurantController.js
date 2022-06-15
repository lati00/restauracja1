"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantController = void 0;
const Error_1 = require("../models/Error");
const sortingOptions = {
    "priceRange": (a, b) => a.priceRange.length - b.priceRange.length,
    "default": (a, b) => 0
};
class RestaurantController {
    constructor(restaurants) {
        this.restaurants = restaurants;
    }
    addRestaurant(restaurant) {
        this.restaurants.push(this.parseRestaurantToAdd(restaurant));
        return restaurant;
    }
    parseRestaurantToAdd(addRestaurant) {
        const menu = addRestaurant.menu.split(",");
        const newId = Math.max(...this.restaurants.map(e => e.id)) + 1;
        const newRestaurant = {
            id: newId,
            name: addRestaurant.name,
            desc: addRestaurant.desc,
            menu: menu,
            priceRange: this.changeNumberToPriceRange(addRestaurant.priceRange.length % 3)
        };
        return newRestaurant;
    }
    changeNumberToPriceRange(num) {
        if (num === 3)
            return '$';
        if (num === 2)
            return '$$';
        return '$$$';
    }
    getRestaurant(name) {
        const found = this.restaurants.find(e => e.name === name);
        if (found === undefined) {
            return new Error_1.ControllerError("Restaurant not found", 404);
        }
        return found;
    }
    getAllRestaurants(sortingOpt) {
        const sortingFunc = sortingOpt === "priceRange" ? sortingOptions.priceRange : sortingOptions.default;
        return this.restaurants.map(e => e).sort(sortingFunc);
    }
    deleteRestaurantByName(name) {
        this.restaurants = this.restaurants.filter(e => e.name !== name);
        return this.restaurants;
    }
    updateRestaurantByName(name, updated) {
        const restaurant = this.restaurants.find(e => e.name === name);
        if (restaurant !== undefined) {
            this.updateRestaurant(restaurant, updated);
        }
        return restaurant;
    }
    updateRestaurant(oldValue, newValue) {
        oldValue.desc = newValue.desc;
        oldValue.menu = newValue.menu;
        oldValue.priceRange = newValue.priceRange;
    }
}
exports.RestaurantController = RestaurantController;
