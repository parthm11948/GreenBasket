import React from 'react';

const Fruits = ({ searchQuery, renderCard, onProductClick }) => {
  const data = [
    { id: 1, name: "Apples", price: "180", unit: "kg", cat: "Fruits", img: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500" },
    { id: 2, name: "Bananas", price: "60", unit: "kg", cat: "Fruits", img: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=500" },
    { id: 3, name: "Blueberries", price: "450", unit: "kg", cat: "Fruits", img: "https://plus.unsplash.com/premium_photo-1674831509063-e68252300846?w=500" },
    { id: 4, name: "Orange", price: "80", unit: "kg", cat: "Fruits", img: "https://media.istockphoto.com/id/482078328/photo/orange-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=BvPCN7BMB9NRkFr7acz4q2eNt3VHuMhK3M9QWafVKws=" },
    { id: 5, name: "Guava", price: "60", unit: "kg", cat: "Fruits", img: "https://images.unsplash.com/photo-1689996647327-5d263fbbc79d?w=500" },
    { id: 6, name: "Kesar Mango", price: "250", unit: "kg", cat: "Fruits", img: "https://media.istockphoto.com/id/1834699100/photo/alphanso-ratnagiri-mangoes-arranged-in-a-box-to-sell-and-buy-mangoes-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=7GWkTv-zUvRXdALEd3uEJzQtGD55rbl-tGoeFHdhX5E=" },
    { id: 7, name: "Green Grapes", price: "100", unit: "kg", cat: "Fruits", img: "https://images.unsplash.com/photo-1632576883732-f131be0be48a?w=500" },
    { id: 8, name: "Papaya", price: "50", unit: "kg", cat: "Fruits", img: "https://images.unsplash.com/photo-1702040242599-46809572ffce?w=500" },
    { id: 9, name: "Pineapple", price: "70", unit: "kg", cat: "Fruits", img: "https://images.unsplash.com/photo-1550828520-4cb496926fc9?w=500" },
    { id: 10, name: "Watermelon", price: "40", unit: "kg", cat: "Fruits", img: "https://images.unsplash.com/photo-1621961048737-a9993789e1ad?w=500" },
    { id: 11, name: "Muskmelon", price: "60", unit: "kg", cat: "Fruits", img: "https://media.istockphoto.com/id/1253633982/photo/close-up-image-of-green-grocers-supermarket-healthy-fruit-market-stall-with-pile-of-freshly.webp?a=1&b=1&s=612x612&w=0&k=20&c=4a6_VzUZCAV0kqfNTc8hTXW7qU7bIwOfd9aGKdtveIU=" },
    { id: 12, name: "Lychee", price: "200", unit: "kg", cat: "Fruits", img: "https://images.unsplash.com/photo-1521123036037-6725d75de336?w=500" },
    { id: 13, name: "Sapota (Chikoo)", price: "80", unit: "kg", cat: "Fruits", img: "https://media.istockphoto.com/id/169941852/photo/sapodilla-fruit.webp?a=1&b=1&s=612x612&w=0&k=20&c=Wi92NCHxOH_Cf3joeKhICDjKdn7_n_kVpm_AabWwlao=" },
    { id: 14, name: "Kiwi", price: "250", unit: "kg", cat: "Fruits", img: "https://plus.unsplash.com/premium_photo-1666299434471-1815114cdccc?w=500" },
    { id: 15, name: "Strawberry", price: "300", unit: "kg", cat: "Fruits", img: "https://plus.unsplash.com/premium_photo-1675731118661-15dc54c11130?w=500", isPopular: true },
    { id: 16, name: "Avocado", price: "400", unit: "kg", cat: "Fruits", img: "https://images.unsplash.com/photo-1612506266679-606568a33215?w=500" }, 
  ];

  return data
    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .map(product => (
      <div key={`fruit-${product.id}`} onClick={() => onProductClick(product)} className="cursor-pointer">
        {renderCard(product)}
      </div>
    ));
};

export default Fruits;