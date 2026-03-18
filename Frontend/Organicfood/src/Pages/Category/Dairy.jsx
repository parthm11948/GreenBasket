import React from 'react';

const Dairy = ({ searchQuery, renderCard, onProductClick }) => {
  const data = [
    { id: 1, name: "Cow Milk", price: "64", unit: "Ltr", cat: "Dairy", img: "https://images.unsplash.com/photo-1639151082235-406d8eb262b9?w=500" },
    { id: 2, name: "Curd", price: "80", unit: "kg", cat: "Dairy", img: "https://images.unsplash.com/photo-1581868164904-77b124b80242?w=500" },
    { id: 3, name: "Buttermilk", price: "40", unit: "Ltr", cat: "Dairy", img: "https://images.unsplash.com/photo-1630409346699-79481a79db52?w=500" },
    { id: 4, name: "Butter", price: "550", unit: "kg", cat: "Dairy", img: "https://plus.unsplash.com/premium_photo-1700440539073-c769891a9e3f?w=500" },
    { id: 5, name: "Ghee", price: "700", unit: "Ltr", cat: "Dairy", img: "https://media.istockphoto.com/id/1187181045/photo/pure-or-desi-ghee-clarified-melted-butter-healthy-fats-bulletproof-diet-concept-or-paleo.webp?a=1&b=1&s=612x612&w=0&k=20&c=SQlM0ESr2hxs2HsOzRTkjonfFtlHXQFVTKLfaaHWOVg=" },
    { id: 6, name: "Paneer", price: "400", unit: "kg", cat: "Dairy", img: "https://media.istockphoto.com/id/1175414525/photo/fresh-cheese.webp?a=1&b=1&s=612x612&w=0&k=20&c=nzrBsrcIYBEEuDp4RBI_8IhwDPic2n137yMpiQ0k0r0=" },
  ];

  return data
    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .map(product => (
      <div key={`dairy-${product.id}`} onClick={() => onProductClick(product)} className="cursor-pointer">
        {renderCard(product)}
      </div>
    ));
};

export default Dairy;