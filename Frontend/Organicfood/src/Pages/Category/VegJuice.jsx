import React from 'react';

const VegJuice = ({ searchQuery, renderCard, onProductClick }) => {
  const data = [
    { id: 1, name: "Bitter Gourd Juice", price: "120", unit: "Ltr", cat: "Vegetable Juice", img: "https://media.istockphoto.com/id/1277972151/photo/bitter-gourd-juice-in-a-wine-glass-along-with-condiments.webp?a=1&b=1&s=612x612&w=0&k=20&c=lrb2sZBiChPhPUOTIjh5RLXmoTVjmk_01IyknB6mY0I=", isPopular: true },
    { id: 2, name: "Bottle Gourd Juice", price: "100", unit: "Ltr", cat: "Vegetable Juice", img: "https://media.istockphoto.com/id/2226325312/photo/a-fresh-bottle-gourd-with-slices-peels-and-a-glass-of-green-juice-are-arranged-on-a-wooden.webp?a=1&b=1&s=612x612&w=0&k=20&c=jrscCjeGE5X9IjFx9Rz-XKwCmg1xx3W54NT3Y6i_kOc=" },
    { id: 3, name: "Carrot Juice", price: "150", unit: "Ltr", cat: "Vegetable Juice", img: "https://plus.unsplash.com/premium_photo-1726842349081-86a2b7c28bee?w=500" },
  ];
  return data
    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .map(product => (
      <div key={`vjuice-${product.id}`} onClick={() => onProductClick(product)} className="cursor-pointer">
        {renderCard(product)}
      </div>
    ));
};
export default VegJuice;