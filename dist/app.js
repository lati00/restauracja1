"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Restaurant_1 = require("./src/models/Restaurant");
const RestaurantController_1 = require("./src/controllers/RestaurantController");
const Error_1 = require("./src/models/Error");
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.set('view engine', 'pug');
app.set('views', './src/views');
app.use(express_1.default.static('public'));
app.use(express_1.default.static('files'));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
const restaurantController = new RestaurantController_1.RestaurantController(Restaurant_1.restaurants);
app.get('/', (req, res) => {
    const restaurants = restaurantController.getAllRestaurants('');
    const randomRestaurant = [...restaurants].sort(() => 0.5 - Math.random())[0];
    const randomRestaurant2 = [...restaurants].sort(() => 0.5 - Math.random())[1];
    res.render('index', { values: restaurants, highlighted: randomRestaurant, highlighted2: randomRestaurant2 });
});
app.get("/restaurants", (req, res) => {
    console.log(req.query);
    const sortingOpt = typeof req.query.sorting === 'string' ? req.query.sorting : '';
    const restaurants = restaurantController.getAllRestaurants(sortingOpt);
    const [checked1, checked2] = req.query.sorting === 'priceRange' ? [false, true] : [true, false];
    const randomRestaurant = [...restaurants].sort(() => 0.5 - Math.random())[0];
    const randomRestaurant2 = [...restaurants].sort(() => 0.5 - Math.random())[1];
    res.render('index', { values: restaurants, highlighted: randomRestaurant, highlighted2: randomRestaurant2, opt1: checked1, opt2: checked2 });
});
app.get("/restaurants/:name", (req, res) => {
    const name = req.params.name;
    const restaurant = restaurantController.getRestaurant(name);
    if (restaurant instanceof Error_1.ControllerError) {
        res.render('404');
    }
    else {
        res.render('restaurantPage', restaurant);
    }
});
app.get("/addRestaurant", (req, res) => {
    const restaurants = restaurantController.getAllRestaurants('');
    const randomRestaurant = [...restaurants].sort(() => 0.5 - Math.random())[0];
    const randomRestaurant2 = [...restaurants].sort(() => 0.5 - Math.random())[1];
    res.render("addRestaurant", { highlighted: randomRestaurant, highlighted2: randomRestaurant2 });
});
app.post("/restaurants", (req, res) => {
    const body = req.body;
    restaurantController.addRestaurant(body);
    res.redirect('/');
});
app.listen(3000, () => console.log("Listening on port 3000"));
