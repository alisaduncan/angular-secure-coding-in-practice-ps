export interface Review {
  id?: number;
  user?: string;
  text: string;
  video?: string;
}

export interface Product {
   id: number;
   image: string;
   name: string;
   description: string;
   price: number;
   reviews: Review[];
}


