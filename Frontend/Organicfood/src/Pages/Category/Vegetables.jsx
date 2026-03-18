import React from 'react';

const Vegetables = ({ searchQuery, renderCard, onProductClick }) => {
  const data = [
    { id: 1, name: "Organic Carrots", price: "80", unit: "kg", cat: "Vegetables", img: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500" },
    { id: 2, name: "Purple Cabbage", price: "60", unit: "kg", cat: "Vegetables", img: "https://images.unsplash.com/photo-1692958208988-227f4d09b8b0?w=500" },
    { id: 3, name: "Green Bell Peppers", price: "120", unit: "kg", cat: "Vegetables", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-QzyJvyRgB7I6ZnErmQ-yVcC4S9Wt0ulCYg&s" },
    { id: 4, name: "Red Chilli Peppers", price: "150", unit: "kg", cat: "Vegetables", img: "https://plus.unsplash.com/premium_photo-1726138639775-2b2d52a990d3?w=500" },
    { id: 5, name: "Tomatoes", price: "40", unit: "kg", cat: "Vegetables", img: "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?w=500" },
    { id: 6, name: "Potato", price: "30", unit: "kg", cat: "Vegetables", img: "https://images.unsplash.com/photo-1675501344642-92d35d90fe51?w=500" },
    { id: 7, name: "Onion", price: "50", unit: "kg", cat: "Vegetables", img: "https://plus.unsplash.com/premium_photo-1680345332736-78bac61bc086?w=500" },
    { id: 8, name: "Garlic", price: "200", unit: "kg", cat: "Vegetables", img: "https://images.unsplash.com/photo-1559454473-27bc85c67728?w=500" },
    { id: 9, name: "Cauliflower", price: "60", unit: "kg", cat: "Vegetables", img: "https://images.unsplash.com/photo-1675861595435-1e3d00f8f2f5?w=500" },
    { id: 10, name: "Cucumber", price: "40", unit: "kg", cat: "Vegetables", img: "https://images.unsplash.com/photo-1518568403628-df55701ade9e?w=500" },
    { id: 11, name: "Peas", price: "80", unit: "kg", cat: "Vegetables", img: "https://plus.unsplash.com/premium_photo-1663844169236-ff32474d1dc8?w=500" },
    { id: 12, name: "Lettuce", price: "100", unit: "kg", cat: "Vegetables", img: "https://images.unsplash.com/photo-1556781366-336f8353ba7c?w=500" }, 
    { id: 13, name: "Ginger", price: "180", unit: "kg", cat: "Vegetables", img: "https://images.unsplash.com/photo-1635008388183-04ea0313c5d1?w=500" },
    { id: 14, name: "Radish", price: "40", unit: "kg", cat: "Vegetables", img: "https://images.unsplash.com/photo-1585369496137-6b539c324adc?w=500" },
    { id: 15, name: "Pumpkin", price: "30", unit: "kg", cat: "Vegetables", img: "https://images.unsplash.com/photo-1509622905150-fa66d3906e09?w=500" },
    { id: 16, name: "Aubergine", price: "60", unit: "kg", cat: "Vegetables", img: "https://plus.unsplash.com/premium_photo-1675040829737-8520b531178a?w=500" },
    { id: 17, name: "Corn", price: "40", unit: "kg", cat: "Vegetables", img: "https://images.unsplash.com/photo-1634467524884-897d0af5e104?w=500" },
    { id: 18, name: "Beans", price: "80", unit: "kg", cat: "Vegetables", img: "https://plus.unsplash.com/premium_photo-1671130295735-25af5e78d40c?w=500" },
    { id: 19, name: "Beetroot", price: "50", unit: "kg", cat: "Vegetables", img: "https://images.unsplash.com/photo-1533231040102-5ec7a63e6d0a?w=500" },
    { id: 20, name: "Broccoli", price: "150", unit: "kg", cat: "Vegetables", img: "https://images.unsplash.com/photo-1723976525220-a5c4f8a879b6?w=500", isPopular: true },
    { id: 21, name: "Spinach", price: "40", unit: "kg", cat: "Vegetables", img: "https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?w=500" },
    { id: 22, name: "Green Chilli Peppers", price: "100", unit: "kg", cat: "Vegetables", img: "https://images.unsplash.com/photo-1613750406907-619c9c484fe3?w=500" },
    { id: 23, name: "Bottle Gourd", price: "40", unit: "kg", cat: "Vegetables", img: "https://media.istockphoto.com/id/2154552631/photo/horizontal-image-of-stack-of-plenty-gheeya-ghiyas-lauki-or-bottle-gourd-vegetable-making.webp?a=1&b=1&s=612x612&w=0&k=20&c=YkqKsuZRzgMdQzlW8F7AFp2ceu6ZUtEGS3-MbkHbqrE=" },
    { id: 24, name: "Bitter Gourd", price: "60", unit: "kg", cat: "Vegetables", img: "https://images.unsplash.com/photo-1739903760973-4731a8e79a03?w=500" },
  ];

  return data
    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .map(product => (
      <div key={`veg-${product.id}`} onClick={() => onProductClick(product)} className="cursor-pointer">
        {renderCard(product)}
      </div>
    ));
};

export default Vegetables;