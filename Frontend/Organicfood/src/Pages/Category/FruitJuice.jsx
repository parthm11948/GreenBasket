import React from 'react';

const FruitJuice = ({ searchQuery, renderCard, onProductClick }) => {
  const data = [
    { id: 1, name: "Orange Juice", price: "180", unit: "Ltr", cat: "Fruit Juice", img: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500", isPopular: true },
    { id: 2, name: "Mango Juice", price: "220", unit: "Ltr", cat: "Fruit Juice", img: "https://images.unsplash.com/photo-1697642452436-9c40773cbcbb?w=500", isPopular: true },
  ];
  return data
    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .map(product => (
      <div key={`fjuice-${product.id}`} onClick={() => onProductClick(product)} className="cursor-pointer">
        {renderCard(product)}
      </div>
    ));
};
export default FruitJuice;