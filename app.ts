import express, { Express, Request, Response } from 'express';
import { restaurants } from './src/models/Restaurant';
import { Message } from './src/models/Message';
import { RestaurantController } from './src/controllers/RestaurantController';
import { ControllerError } from './src/models/Error';
import bodyParser from "body-parser";

const app: Express = express()

app.use(express.json());
app.set('view engine', 'pug')
app.set('views', './src/views')

app.use(express.static('public'))
app.use(express.static('files'))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const restaurantController = new RestaurantController(restaurants);

app.get('/', (req: Request, res: Response) => {
  const restaurants = restaurantController.getAllRestaurants('');

  const randomRestaurant = [...restaurants].sort(() => 0.5 - Math.random())[0];
  const randomRestaurant2 = [...restaurants].sort(() => 0.5 - Math.random())[1];

  res.render('index', {values: restaurants, highlighted: randomRestaurant, highlighted2: randomRestaurant2})
})

app.get("/restaurants", (req: Request, res: Response) => {
  console.log(req.query)

  const sortingOpt = typeof req.query.sorting === 'string' ? req.query.sorting : '';
  const restaurants = restaurantController.getAllRestaurants(sortingOpt);
  const [checked1, checked2] = req.query.sorting === 'priceRange' ? [false,true] : [true,false]

  const randomRestaurant = [...restaurants].sort(() => 0.5 - Math.random())[0];
  const randomRestaurant2 = [...restaurants].sort(() => 0.5 - Math.random())[1];

  res.render('index', { values: restaurants, highlighted: randomRestaurant, highlighted2: randomRestaurant2, opt1: checked1, opt2: checked2 })
})

app.get("/restaurants/:name", (req: Request, res: Response) => {
  const name = req.params.name
  const restaurant = restaurantController.getRestaurant(name)

  if (restaurant instanceof ControllerError) {
    res.render('404')
  } else {
    res.render('restaurantPage', restaurant)
  }
})

app.get("/addRestaurant", (req, res) => {
  const restaurants = restaurantController.getAllRestaurants('');
  const randomRestaurant = [...restaurants].sort(() => 0.5 - Math.random())[0];
  const randomRestaurant2 = [...restaurants].sort(() => 0.5 - Math.random())[1];

  res.render("addRestaurant", { highlighted: randomRestaurant, highlighted2: randomRestaurant2 });
});

app.post("/restaurants", (req: Request, res: Response) => {
  const body = req.body;
  restaurantController.addRestaurant(body);

  res.redirect('/');
})

app.listen(3000, () => console.log("Listening on port 3000"))
