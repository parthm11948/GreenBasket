import React from 'react';

const DryFruit = ({ searchQuery, renderCard, onProductClick }) => {
  const data = [
    { id: 1, name: "Almonds", price: "900", unit: "kg", cat: "Dry Fruits", img: "https://plus.unsplash.com/premium_photo-1675237625910-e5d354c03987?w=500" },
    { id: 2, name: "Walnuts", price: "1200", unit: "kg", cat: "Dry Fruits", img: "https://images.unsplash.com/photo-1524593000379-d4729b2c4f99?w=500" },
    { id: 3, name: "Cashews", price: "850", unit: "kg", cat: "Dry Fruits", img: "https://images.unsplash.com/photo-1598049025533-dbd5c11c2462?w=500" },
    { id: 4, name: "Mixed Organic Nuts", price: "1100", unit: "kg", cat: "Dry Fruits", img: "https://media.istockphoto.com/id/1218693828/photo/wooden-bowl-with-mixed-nuts-on-rustic-table-top-view-healthy-food-and-snack.webp?a=1&b=1&s=612x612&w=0&k=20&c=un8-1rnSbeydD36u6g5Jp4MLrzX2GWOGYuxZJeYQrXU=", isPopular: true },
  ];

  return data
    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .map(product => (
      <div key={`dry-${product.id}`} onClick={() => onProductClick(product)} className="cursor-pointer">
        {renderCard(product)}
      </div>
    ));
};

export default DryFruit;