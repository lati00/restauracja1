import { Restaurant } from "../models/Restaurant";

export interface Message {
  title: string;
  message: string;
  logo: string;
  values: Array<Restaurant>;
}

interface A {
  text: string;
}
