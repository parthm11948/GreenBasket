import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/product.js"; 

dotenv.config();

const productData = [
  // --- Dairy ---
  { name: "Cow Milk", price: 64, unit: "Ltr", category: "Dairy", img: "https://images.unsplash.com/photo-1639151082235-406d8eb262b9?w=500" },
  { name: "Curd", price: 80, unit: "kg", category: "Dairy", img: "https://images.unsplash.com/photo-1581868164904-77b124b80242?w=500" },
  { name: "Buttermilk", price: 40, unit: "Ltr", category: "Dairy", img: "https://images.unsplash.com/photo-1630409346699-79481a79db52?w=500" },
  { name: "Butter", price: 550, unit: "kg", category: "Dairy", img: "https://plus.unsplash.com/premium_photo-1700440539073-c769891a9e3f?w=500" },
  { name: "Ghee", price: 700, unit: "Ltr", category: "Dairy", img: "https://media.istockphoto.com/id/1187181045/photo/pure-or-desi-ghee-clarified-melted-butter-healthy-fats-bulletproof-diet-concept-or-paleo.webp?a=1&b=1&s=612x612&w=0&k=20&c=SQlM0ESr2hxs2HsOzRTkjonfFtlHXQFVTKLfaaHWOVg=" },
  { name: "Paneer", price: 400, unit: "kg", category: "Dairy", img: "https://media.istockphoto.com/id/1175414525/photo/fresh-cheese.webp?a=1&b=1&s=612x612&w=0&k=20&c=nzrBsrcIYBEEuDp4RBI_8IhwDPic2n137yMpiQ0k0r0=" },

  // --- Dry Fruits ---
  { name: "Almonds", price: 900, unit: "kg", category: "Dry Fruits", img: "https://plus.unsplash.com/premium_photo-1675237625910-e5d354c03987?w=500" },
  { name: "Walnuts", price: 1200, unit: "kg", category: "Dry Fruits", img: "https://images.unsplash.com/photo-1524593000379-d4729b2c4f99?w=500" },
  { name: "Cashews", price: 850, unit: "kg", category: "Dry Fruits", img: "https://images.unsplash.com/photo-1598049025533-dbd5c11c2462?w=500" },
  { name: "Mixed Organic Nuts", price: 1100, unit: "kg", category: "Dry Fruits", img: "https://media.istockphoto.com/id/1218693828/photo/wooden-bowl-with-mixed-nuts-on-rustic-table-top-view-healthy-food-and-snack.webp?a=1&b=1&s=612x612&w=0&k=20&c=un8-1rnSbeydD36u6g5Jp4MLrzX2GWOGYuxZJeYQrXU=", isPopular: true },
 
  // --- Fruit Juice ---
  { name: "Orange Juice", price: 180, unit: "Ltr", category: "Fruit Juice", img: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500", isPopular: true },
  { name: "Mango Juice", price: 220, unit: "Ltr", category: "Fruit Juice", img: "https://images.unsplash.com/photo-1697642452436-9c40773cbcbb?w=500", isPopular: true },
  



  // --- Fruits ---
  { name: "Apples", price: 180, unit: "kg", category: "Fruits", img: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500" },
  { name: "Bananas", price: 60, unit: "kg", category: "Fruits", img: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=500" },
  { name: "Blueberries", price: 450, unit: "kg", category: "Fruits", img: "https://plus.unsplash.com/premium_photo-1674831509063-e68252300846?w=500" },
  { name: "Orange", price: 80, unit: "kg", category: "Fruits", img: "https://media.istockphoto.com/id/482078328/photo/orange-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=BvPCN7BMB9NRkFr7acz4q2eNt3VHuMhK3M9QWafVKws=" },
  { name: "Guava", price: 60, unit: "kg", category: "Fruits", img: "https://images.unsplash.com/photo-1689996647327-5d263fbbc79d?w=500" },
  { name: "Kesar Mango", price: 250, unit: "kg", category: "Fruits", img: "https://media.istockphoto.com/id/1834699100/photo/alphanso-ratnagiri-mangoes-arranged-in-a-box-to-sell-and-buy-mangoes-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=7GWkTv-zUvRXdALEd3uEJzQtGD55rbl-tGoeFHdhX5E=" },
  { name: "Green Grapes", price: 100, unit: "kg", category: "Fruits", img: "https://images.unsplash.com/photo-1632576883732-f131be0be48a?w=500" },
  { name: "Papaya", price: 50, unit: "kg", category: "Fruits", img: "https://images.unsplash.com/photo-1702040242599-46809572ffce?w=500" },
  { name: "Pineapple", price: 70, unit: "kg", category: "Fruits", img: "https://images.unsplash.com/photo-1550828520-4cb496926fc9?w=500" },
  { name: "Watermelon", price: 40, unit: "kg", category: "Fruits", img: "https://images.unsplash.com/photo-1621961048737-a9993789e1ad?w=500" },
  { name: "Muskmelon", price: 60, unit: "kg", category: "Fruits", img: "https://media.istockphoto.com/id/1253633982/photo/close-up-image-of-green-grocers-supermarket-healthy-fruit-market-stall-with-pile-of-freshly.webp?a=1&b=1&s=612x612&w=0&k=20&c=4a6_VzUZCAV0kqfNTc8hTXW7qU7bIwOfd9aGKdtveIU=" },
  { name: "Lychee", price: 200, unit: "kg", category: "Fruits", img: "https://images.unsplash.com/photo-1521123036037-6725d75de336?w=500" },
  { name: "Sapota (Chikoo)", price: 80, unit: "kg", category: "Fruits", img: "https://media.istockphoto.com/id/169941852/photo/sapodilla-fruit.webp?a=1&b=1&s=612x612&w=0&k=20&c=Wi92NCHxOH_Cf3joeKhICDjKdn7_n_kVpm_AabWwlao=" },
  { name: "Kiwi", price: 250, unit: "kg", category: "Fruits", img: "https://plus.unsplash.com/premium_photo-1666299434471-1815114cdccc?w=500" },
  { name: "Strawberry", price: 300, unit: "kg", category: "Fruits", img: "https://plus.unsplash.com/premium_photo-1675731118661-15dc54c11130?w=500", isPopular: true },
  { name: "Avocado", price: 400, unit: "kg", category: "Fruits", img: "https://images.unsplash.com/photo-1612506266679-606568a33215?w=500" },

  // --- Vegetables ---
  { name: "Organic Carrots", price: 80, unit: "kg", category: "Vegetables", img: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500" },
  { name: "Purple Cabbage", price: 60, unit: "kg", category: "Vegetables", img: "https://images.unsplash.com/photo-1692958208988-227f4d09b8b0?w=500" },
  { name: "Green Bell Peppers", price: 120, unit: "kg", category: "Vegetables", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-QzyJvyRgB7I6ZnErmQ-yVcC4S9Wt0ulCYg&s" },
  { name: "Red Chilli Peppers", price: 150, unit: "kg", category: "Vegetables", img: "https://plus.unsplash.com/premium_photo-1726138639775-2b2d52a990d3?w=500" },
  { name: "Tomatoes", price: 40, unit: "kg", category: "Vegetables", img: "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?w=500" },
  { name: "Potato", price: 30, unit: "kg", category: "Vegetables", img: "https://images.unsplash.com/photo-1675501344642-92d35d90fe51?w=500" },
  { name: "Onion", price: 50, unit: "kg", category: "Vegetables", img: "https://plus.unsplash.com/premium_photo-1680345332736-78bac61bc086?w=500" },
  { name: "Garlic", price: 200, unit: "kg", category: "Vegetables", img: "https://images.unsplash.com/photo-1559454473-27bc85c67728?w=500" },
  { name: "Cauliflower", price: 60, unit: "kg", category: "Vegetables", img: "https://images.unsplash.com/photo-1675861595435-1e3d00f8f2f5?w=500" },
  { name: "Cucumber", price: 40, unit: "kg", category: "Vegetables", img: "https://images.unsplash.com/photo-1518568403628-df55701ade9e?w=500" },
  { name: "Peas", price: 80, unit: "kg", category: "Vegetables", img: "https://plus.unsplash.com/premium_photo-1663844169236-ff32474d1dc8?w=500" },
  { name: "Lettuce", price: 100, unit: "kg", category: "Vegetables", img: "https://images.unsplash.com/photo-1556781366-336f8353ba7c?w=500" },
  { name: "Ginger", price: 180, unit: "kg", category: "Vegetables", img: "https://images.unsplash.com/photo-1635008388183-04ea0313c5d1?w=500" },
  { name: "Radish", price: 40, unit: "kg", category: "Vegetables", img: "https://images.unsplash.com/photo-1585369496137-6b539c324adc?w=500" },
  { name: "Pumpkin", price: 30, unit: "kg", category: "Vegetables", img: "https://images.unsplash.com/photo-1509622905150-fa66d3906e09?w=500" },
  { name: "Aubergine", price: 60, unit: "kg", category: "Vegetables", img: "https://plus.unsplash.com/premium_photo-1675040829737-8520b531178a?w=500" },
  { name: "Corn", price: 40, unit: "kg", category: "Vegetables", img: "https://images.unsplash.com/photo-1634467524884-897d0af5e104?w=500" },
  { name: "Beans", price: 80, unit: "kg", category: "Vegetables", img: "https://plus.unsplash.com/premium_photo-1671130295735-25af5e78d40c?w=500" },
  { name: "Beetroot", price: 50, unit: "kg", category: "Vegetables", img: "https://images.unsplash.com/photo-1533231040102-5ec7a63e6d0a?w=500" },
  { name: "Broccoli", price: 150, unit: "kg", category: "Vegetables", img: "https://images.unsplash.com/photo-1723976525220-a5c4f8a879b6?w=500", isPopular: true },
  { name: "Spinach", price: 40, unit: "kg", category: "Vegetables", img: "https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?w=500" },
  { name: "Green Chilli Peppers", price: 100, unit: "kg", category: "Vegetables", img: "https://images.unsplash.com/photo-1613750406907-619c9c484fe3?w=500" },
  { name: "Bottle Gourd", price: 40, unit: "kg", category: "Vegetables", img: "https://media.istockphoto.com/id/2154552631/photo/horizontal-image-of-stack-of-plenty-gheeya-ghiyas-lauki-or-bottle-gourd-vegetable-making.webp?a=1&b=1&s=612x612&w=0&k=20&c=YkqKsuZRzgMdQzlW8F7AFp2ceu6ZUtEGS3-MbkHbqrE=" },
  { name: "Bitter Gourd", price: 60, unit: "kg", category: "Vegetables", img: "https://images.unsplash.com/photo-1739903760973-4731a8e79a03?w=500" },
  

  // --- Vegetable Juice ---
  { name: "Bitter Gourd Juice", price: 120, unit: "Ltr", category: "Vegetable Juice", img: "https://media.istockphoto.com/id/1277972151/photo/bitter-gourd-juice-in-a-wine-glass-along-with-condiments.webp?a=1&b=1&s=612x612&w=0&k=20&c=lrb2sZBiChPhPUOTIjh5RLXmoTVjmk_01IyknB6mY0I=", isPopular: true },
  { name: "Bottle Gourd Juice", price: 100, unit: "Ltr", category: "Vegetable Juice", img: "https://media.istockphoto.com/id/2226325312/photo/a-fresh-bottle-gourd-with-slices-peels-and-a-glass-of-green-juice-are-arranged-on-a-wooden.webp?a=1&b=1&s=612x612&w=0&k=20&c=jrscCjeGE5X9IjFx9Rz-XKwCmg1xx3W54NT3Y6i_kOc=" },
  { name: "Carrot Juice", price: 150, unit: "Ltr", category: "Vegetable Juice", img: "https://plus.unsplash.com/premium_photo-1726842349081-86a2b7c28bee?w=500" },
  
];

const seedDB = async () => {
  try {
    // UPDATED: Points exactly to your Atlas 'greenbasket' database
    const ATLAS_URI = "mongodb+srv://parthmendapara2005_db_user:yFn4BAa3r1V3mUGy@cluster0.iavfp4g.mongodb.net/greenbasket";
    
    console.log("⏳ Connecting to MongoDB Atlas...");
    await mongoose.connect(ATLAS_URI);
    console.log("✅ Atlas Database Connected Successfully");

    // This clears the old data so you don't have duplicates
    await Product.deleteMany({}); 
    console.log("🗑️  Old Collection cleared");

    // This inserts the 50+ items into your Atlas cluster
    await Product.insertMany(productData);
    console.log(`📦 Success! ${productData.length} Green Basket products added to Atlas!`);

    process.exit();
  } catch (error) {
    console.error("❌ Seeding Error:", error.message);
    process.exit(1);
  }
};

seedDB();