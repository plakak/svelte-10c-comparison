import { derived, writable } from 'svelte/store';

export interface BasketItem {
  id: number;
  name: string;
  description: string;
  photoUrl: string;
  count: number;
  price: number;
}

type Basket = BasketItem[];

const initialState: Basket = [
  {
    id: 1,
    name: 'OnePlus 7T Pro',
    description: '256GB, Nebula Blue',
    photoUrl: 'https://plakak.smallhost.pl/oneplus.png',
    count: 1,
    price: 800
  },
  {
    id: 2,
    name: 'Google Pixel 4 XL',
    description: '64GB, Jet Black',
    photoUrl: 'https://plakak.smallhost.pl/pixel.png',
    count: 1,
    price: 900
  },
  {
    id: 3,
    name: 'Samsung Galaxy Note 10',
    description: '256GB, Aura Glow',
    photoUrl: 'https://plakak.smallhost.pl/note.png',
    count: 1,
    price: 1000
  },
  {
    id: 4,
    name: 'iPhone 11 Pro',
    description: '256GB, Space Gray',
    photoUrl: 'https://plakak.smallhost.pl/iphone.png',
    count: 1,
    price: 1100
  }
];

export const items = writable<Basket>(initialState);

export const deleteBasketItem = (id: number) => {
  items.update(store => store.filter(i => i.id !== id));
};

export const updateBasketItemCount = ({
  id,
  count
}: {
  id: number;
  count: number;
}) => {
  items.update(store => {
    const index = store.findIndex(i => i.id == id);
    return [
      ...store.slice(0, index),
      { ...store[index], count },
      ...store.slice(index + 1)
    ];
  });
};

export const resetBasket = () => {
  items.set(initialState);
};

export const price = derived<typeof items, number>(items, i =>
  i.reduce((acc, next) => acc + next.price * next.count, 0)
);
