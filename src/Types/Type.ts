export interface ProductProps {
    id: string;
    name: string;
    description: string;
    price: {
      formatted_with_symbol: string;
    };
    image: {
      url: string;
    };
  }
  