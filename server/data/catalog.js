// Starter catalog used by scripts/seed.js. Prices are in Naira (₦).
// Images live in client/public/images/products and are served by the frontend.
// Category keys must match client/src/config/categories.js.

export const CATEGORIES = [
  "Fruits",
  "Vegetables",
  "Foodstuff",
  "Cooking",
  "Meat",
  "Breakfast",
  "Bakery",
  "Drinks",
  "Snacks",
  "Instant",
  "Household",
  "PersonalCare",
];

const img = (name) => `/images/products/${name}.webp`;

// (name, unit, price, offerPrice, image, description[], tags[])
const inCategory = (category) => (name, unit, price, offerPrice, image, description, tags = []) => ({
  name,
  unit,
  price,
  offerPrice,
  category,
  images: [img(image)],
  description,
  tags,
  inStock: true,
});

const fruit = inCategory("Fruits");
const veg = inCategory("Vegetables");
const food = inCategory("Foodstuff");
const cook = inCategory("Cooking");
const meat = inCategory("Meat");
const bfast = inCategory("Breakfast");
const bakery = inCategory("Bakery");
const drink = inCategory("Drinks");
const snack = inCategory("Snacks");
const instant = inCategory("Instant");
const home = inCategory("Household");
const care = inCategory("PersonalCare");

export const PRODUCTS = [
  // Fresh Fruits
  fruit("Pineapple (Large)", "1 piece", 2000, 1700, "pineapple", ["Sweet and juicy, ready to eat", "Great for juice and fruit salad", "Picked fresh this week"], ["bestseller"]),
  fruit("Watermelon (Medium)", "1 piece", 3500, 3000, "watermelon", ["Sweet red flesh, very refreshing", "Perfect for hot afternoons", "Keep in the fridge after cutting"]),
  fruit("Sweet Oranges", "10 pieces", 2000, 1700, "tangerine", ["Juicy and full of vitamin C", "Easy to peel", "Great for fresh juice"], ["bestseller"]),
  fruit("Ripe Banana", "1 bunch", 2000, 1800, "banana", ["Soft and naturally sweet", "Good energy for all ages", "Easy to eat, no cutting needed"]),
  fruit("Red Apples", "4 pieces", 3200, 2800, "red-apple", ["Crisp and sweet", "Wash and eat", "Keeps well in the fridge"]),
  fruit("Green Apples", "4 pieces", 3200, 2800, "green-apple", ["Crunchy with a tangy taste", "Good for snacks and salads", "Keeps well in the fridge"]),
  fruit("Avocado Pear", "3 pieces", 1800, 1500, "avocado", ["Soft and creamy when ripe", "Lovely with bread or rice", "Rich in healthy fats"], ["bestseller"]),
  fruit("Mangoes", "5 pieces", 1500, 1200, "mango", ["Sweet and fragrant", "Eat fresh or blend into juice", "In season now"]),
  fruit("Coconut", "2 pieces", 1200, 1000, "coconut", ["Fresh coconut water inside", "Grate for rice, candy or cooking", "Firm and fresh"]),
  fruit("Seedless Grapes", "500 g", 5500, 4800, "grapes", ["Sweet and seedless", "Wash before eating", "Imported, carefully packed"]),
  fruit("Strawberries", "250 g", 6000, 5200, "strawberry", ["Bright red and sweet", "Lovely with yoghurt or cream", "Keep chilled, eat within 3 days"]),
  fruit("Lemons", "5 pieces", 1500, 1200, "lemon", ["Juicy and sour", "For drinks, tea and cooking", "Fresh and firm"]),

  // Vegetables & Peppers
  veg("Fresh Tomatoes", "1 kg", 2500, 2200, "tomato", ["Firm, red and ripe", "For stew, jollof and salads", "Sorted by hand"], ["bestseller"]),
  veg("Red Onions", "1 kg", 2000, 1700, "onion", ["Big, firm bulbs", "For stew, soup and pepper sauce", "Store in a cool, dry place"], ["bestseller"]),
  veg("Scotch Bonnet Pepper (Rodo)", "500 g", 2500, 2000, "chili", ["Very hot and full of flavour", "For stew, pepper soup and sauce", "Fresh from the farm"]),
  veg("Red Bell Pepper (Tatashe)", "500 g", 2800, 2400, "bell-pepper", ["Sweet pepper for rich red stew", "Not hot", "Firm and fresh"]),
  veg("Ugu Leaves (Pumpkin Leaves)", "1 bunch", 800, 700, "leafy-greens", ["Fresh green leaves", "For edikang ikong, egusi and vegetable soup", "Washed and ready to slice"]),
  veg("Bitter Leaf (Washed)", "1 bunch", 700, 600, "herbs", ["Already washed, less bitter", "For bitter leaf and egusi soup", "Use within 2 days"]),
  veg("Garden Egg", "10 pieces", 1000, 800, "eggplant", ["Crunchy and fresh", "Eat with groundnut paste or in sauce", "Healthy snack"]),
  veg("Okro", "500 g", 1200, 1000, "pea-pod", ["Tender young okro", "For draw soup", "Wash just before cutting"]),
  veg("Carrots", "1 kg", 1800, 1500, "carrot", ["Sweet and crunchy", "For fried rice, salad and stew", "Good for the eyes"]),
  veg("Cucumber", "3 pieces", 1200, 1000, "cucumber", ["Cool and crunchy", "Great in salad", "Fresh and firm"]),
  veg("Irish Potatoes", "2 kg", 3500, 3000, "potato", ["Good for chips, porridge and salad", "Clean and sorted", "Store in a dark place"]),
  veg("Sweet Corn", "4 cobs", 1500, 1200, "corn", ["Roast or boil", "Sweet and tender", "Freshly harvested"]),
  veg("Fresh Ginger", "250 g", 1200, 1000, "ginger", ["Strong and spicy", "For tea, zobo and pepper soup", "Keeps for weeks"]),
  veg("Garlic", "250 g", 1500, 1200, "garlic", ["Full, firm bulbs", "Adds flavour to any meal", "Store in a dry place"]),
  veg("Broccoli", "500 g", 3500, 3000, "broccoli", ["Fresh green florets", "Steam or add to stir-fry", "Full of vitamins"]),

  // Rice, Beans & Foodstuff
  food("Parboiled Long Grain Rice", "50 kg bag", 95000, 88000, "rice", ["Stone-free, well-sorted rice", "Cooks soft and separate", "Best value for families"], ["bestseller"]),
  food("Parboiled Long Grain Rice", "10 kg bag", 22000, 20500, "rice", ["Stone-free, well-sorted rice", "Cooks soft and separate", "Good size for small homes"], ["bestseller"]),
  food("Basmati Rice", "5 kg bag", 18000, 16500, "rice", ["Long, fragrant grains", "Perfect for fried rice", "Cooks in 15 minutes"]),
  food("Honey Beans (Oloyin)", "1 paint bucket", 9000, 8200, "beans", ["Naturally sweet beans", "Cooks soft for porridge", "Picked and cleaned"], ["bestseller"]),
  food("Brown Beans (Drum)", "1 paint bucket", 7500, 6800, "beans", ["Great for moi moi and akara", "Picked and cleaned", "Good value"]),
  food("White Garri (Ijebu)", "1 paint bucket", 5000, 4500, "cereal", ["Crispy and sour, perfect for soaking", "Well fried and dry", "No sand, no stones"], ["bestseller"]),
  food("Yellow Garri", "1 paint bucket", 5500, 5000, "cereal", ["Made with palm oil", "Smooth eba every time", "Well fried and dry"]),
  food("Yam Tuber (Large)", "1 tuber", 5000, 4500, "potato", ["Big, healthy tuber", "For pounded yam, porridge or frying", "Selected by hand"]),
  food("Unripe Plantain", "1 bunch", 6000, 5200, "banana", ["Firm green plantain", "Boil, roast or make chips", "Good for people watching sugar"]),
  food("Semolina", "5 kg", 9500, 8800, "wheat", ["Smooth and lump-free", "Quick to prepare", "Goes with any soup"]),
  food("Poundo Yam Flour", "1.8 kg", 5500, 5000, "wheat", ["Tastes like fresh pounded yam", "Ready in minutes", "No pounding needed"]),
  food("Wheat Flour", "2 kg", 3500, 3100, "wheat", ["For bread, chin chin and puff-puff", "Fine and white", "Store in a dry place"]),

  // Oils, Soup & Spices
  cook("Red Palm Oil", "1 litre", 3500, 3000, "palm-tree", ["Pure, fresh palm oil", "Rich colour and taste", "For soups, stew and yam"], ["bestseller"]),
  cook("Vegetable Oil", "5 litres", 18000, 16500, "sunflower", ["Light, clear cooking oil", "Good for frying", "Cholesterol free"], ["bestseller"]),
  cook("Groundnut Oil", "3 litres", 12000, 11000, "peanuts", ["Pure groundnut oil", "Nice nutty taste", "For frying and cooking"]),
  cook("Seasoning Cubes", "Pack of 100", 2200, 1900, "butter", ["Adds rich flavour to any meal", "For stew, soup and rice", "Individually wrapped"], ["bestseller"]),
  cook("Tomato Paste", "400 g tin", 1500, 1300, "canned", ["Thick, rich tomato paste", "For stew and jollof", "Easy-open lid"]),
  cook("Ground Crayfish", "250 g", 3000, 2600, "shrimp", ["Clean, well-ground crayfish", "Gives soup that sweet taste", "Sealed pack"]),
  cook("Ground Egusi (Melon Seed)", "500 g", 3500, 3000, "melon", ["Freshly ground and clean", "For thick egusi soup", "No stones"]),
  cook("Ogbono Seeds", "250 g", 3500, 3000, "chestnut", ["Draws well", "Grind fresh for soup", "Clean and dry"]),
  cook("Stockfish (Okporoko)", "1 medium head", 6000, 5200, "fish", ["Dried stockfish", "Adds deep flavour to soup", "Soak before cooking"]),
  cook("Locust Beans (Iru)", "100 g", 1000, 800, "jar", ["Traditional seasoning", "For ewedu and efo riro", "Fresh and aromatic"]),
  cook("Curry & Thyme", "2 x 50 g", 1200, 1000, "herbs", ["The perfect pair for rice and stew", "Strong aroma", "Resealable packs"]),
  cook("Iodised Salt", "500 g", 500, 400, "salt", ["Fine table salt", "With iodine", "Free-flowing"]),
  cook("Pure Honey", "500 ml", 5000, 4300, "honey", ["Natural, unmixed honey", "For tea and breakfast", "Never goes bad"]),

  // Meat, Fish & Chicken
  meat("Whole Chicken (Frozen)", "1.8 kg", 9500, 8800, "chicken", ["Cleaned and ready to cook", "Kept frozen till delivery", "For stew, pepper soup or roasting"], ["bestseller"]),
  meat("Chicken Laps", "1 kg", 6500, 6000, "chicken", ["Juicy thigh and drumstick", "Great for fried or grilled chicken", "Kept frozen till delivery"]),
  meat("Turkey Wings", "1 kg", 8500, 7800, "meat-bone", ["Meaty turkey wings", "Fry, grill or add to stew", "Kept frozen till delivery"], ["bestseller"]),
  meat("Fresh Beef", "1 kg", 8500, 7800, "steak", ["Cut fresh every morning", "Tender and clean", "Cut into pieces on request"]),
  meat("Goat Meat", "1 kg", 9500, 8800, "meat-bone", ["Fresh goat meat", "For pepper soup and stew", "Cut into pieces"]),
  meat("Titus Fish (Mackerel)", "1 kg", 6000, 5500, "fish", ["Big, oily and tasty", "Fry or add to stew", "Kept frozen till delivery"], ["bestseller"]),
  meat("Fresh Catfish", "1 kg", 4500, 4000, "fish", ["Cleaned and cut", "Perfect for pepper soup", "Delivered fresh"]),
  meat("Jumbo Prawns", "500 g", 9000, 8000, "shrimp", ["Large and meaty", "For fried rice and sauce", "Kept frozen till delivery"]),
  meat("Giant Snails", "5 pieces", 8000, 7000, "snail", ["Big, fleshy snails", "Washed and ready to cook", "A special treat"]),
  meat("Beef Suya", "1 wrap", 3000, 2700, "suya", ["Spicy grilled beef", "With onions and yaji pepper", "Ready to eat"]),
  meat("Chicken Sausages", "400 g", 3500, 3000, "hot-dog", ["Ready in minutes", "Fry or grill", "Kids love them"]),

  // Milk, Eggs & Breakfast
  bfast("Crate of Eggs", "30 eggs", 6000, 5500, "egg", ["Fresh, medium-size eggs", "Carefully packed", "For breakfast and baking"], ["bestseller"]),
  bfast("Full Cream Milk Powder", "400 g tin", 4500, 4100, "milk", ["Rich and creamy", "For tea, pap and cereal", "Easy to mix"], ["bestseller"]),
  bfast("Milk Powder Refill", "800 g pack", 7500, 6900, "milk", ["Same creamy milk, bigger pack", "Pour into your tin", "Best value"]),
  bfast("Evaporated Milk", "6 x 160 g", 3600, 3300, "canned", ["Creamy milk in small tins", "For tea and cereal", "Long shelf life"]),
  bfast("Chocolate Malt Drink", "500 g refill", 4200, 3800, "coffee", ["Chocolate drink for energy", "Mix with hot or cold milk", "Loved by all ages"], ["bestseller"]),
  bfast("Maize & Soya Cereal", "900 g", 4500, 4000, "cereal", ["Filling breakfast cereal", "Just add hot water", "With added vitamins"]),
  bfast("Cornflakes", "500 g", 3800, 3400, "corn", ["Crunchy toasted flakes", "Serve with cold milk", "With added iron"]),
  bfast("Rolled Oats", "500 g", 2800, 2400, "wheat", ["Whole grain oats", "Good for the heart", "Cooks in 3 minutes"]),
  bfast("Custard Powder", "2 kg", 5000, 4500, "custard", ["Smooth vanilla custard", "Mix with milk and sugar", "Family size"]),
  bfast("Tea Bags", "50 bags", 1500, 1300, "tea", ["Strong black tea", "One bag per cup", "Fresh and aromatic"]),
  bfast("Margarine", "450 g", 2500, 2200, "butter", ["Soft and easy to spread", "For bread and baking", "Keep cool"]),
  bfast("Plain Yoghurt", "1 litre", 3000, 2700, "milk", ["Thick and creamy", "Lightly sweetened", "Keep refrigerated"]),

  // Bread & Pastries
  bakery("Sliced Bread (Family Loaf)", "1 loaf", 1800, 1600, "bread", ["Soft and fresh", "Baked this morning", "Perfect for tea and sandwiches"], ["bestseller"]),
  bakery("Agege Bread", "1 loaf", 1500, 1300, "baguette", ["Soft, stretchy Agege bread", "Great with akara or beans", "Baked this morning"], ["bestseller"]),
  bakery("Meat Pie", "2 pieces", 1600, 1400, "pie", ["Flaky pastry, full of minced meat", "Warm for 1 minute before eating", "Freshly baked"]),
  bakery("Puff-Puff", "Pack of 10", 1000, 800, "puff-puff", ["Soft, sweet and fluffy", "Freshly fried", "Perfect snack with a drink"]),
  bakery("Doughnuts", "4 pieces", 2000, 1700, "doughnut", ["Soft with sugar glaze", "Freshly made", "Best eaten the same day"]),
  bakery("Cupcakes", "6 pieces", 4500, 3900, "cupcake", ["Soft sponge with cream", "Great for small parties", "Assorted colours"]),
  bakery("Sponge Cake Slices", "2 slices", 2500, 2200, "cake", ["Light cake with cream", "Keep in the fridge", "Sweet treat"]),
  bakery("Birthday Cake", "1 kg", 25000, 22000, "birthday-cake", ["Vanilla cake with icing", "Serves 10 to 12 people", "Order a day ahead for a name on top"]),

  // Drinks & Water
  drink("Table Water", "12 x 75 cl", 2500, 2200, "water", ["Clean, purified drinking water", "Sealed bottles", "Pack of 12"], ["bestseller"]),
  drink("Cola Soft Drink", "12 x 50 cl", 6000, 5400, "soda", ["Cold and refreshing", "For parties and meals", "Pack of 12 bottles"], ["bestseller"]),
  drink("Orange Soft Drink", "12 x 50 cl", 6000, 5400, "soda", ["Sweet orange taste", "Serve chilled", "Pack of 12 bottles"]),
  drink("Malt Drink", "6 x 33 cl", 4800, 4300, "soda", ["Rich, non-alcoholic malt", "Full of energy", "Pack of 6 cans"]),
  drink("Fruit Juice", "1 litre", 2200, 1900, "juice-box", ["100% fruit juice", "No added sugar", "Shake well before drinking"]),
  drink("Zobo Drink", "1 litre", 1500, 1200, "zobo", ["Homemade with ginger and pineapple", "Serve chilled", "Keep in the fridge"]),
  drink("Kunu Aya (Tiger Nut Drink)", "1 litre", 1500, 1300, "milk", ["Creamy tiger nut drink", "Naturally sweet", "Keep in the fridge"]),
  drink("Non-Alcoholic Sparkling Wine", "75 cl", 5500, 4800, "sparkling", ["Sparkling grape drink", "Perfect for celebrations", "Alcohol free"]),

  // Snacks & Sweets
  snack("Chin Chin", "500 g", 2500, 2100, "pretzel", ["Crunchy and sweet", "Freshly fried", "Sealed to stay crisp"], ["bestseller"]),
  snack("Plantain Chips", "6 packs", 3000, 2600, "fries", ["Thin and crispy", "Lightly salted", "Great on the go"], ["bestseller"]),
  snack("Roasted Groundnuts", "500 g", 2000, 1700, "peanuts", ["Well roasted and crunchy", "Lightly salted", "Great with garri"]),
  snack("Cashew Nuts", "250 g", 4500, 4000, "chestnut", ["Roasted cashew nuts", "Crunchy and rich", "Resealable pack"]),
  snack("Sausage Rolls", "6 pieces", 2400, 2100, "hot-dog", ["Soft bread with sausage inside", "Great for lunch boxes", "Ready to eat"]),
  snack("Cream Biscuits", "Pack of 10", 2000, 1700, "cookie", ["Crunchy biscuits with cream", "Great with tea", "Individually wrapped"]),
  snack("Coconut Candy", "250 g", 1500, 1200, "coconut", ["Sweet and chewy", "Made with fresh coconut", "Old-school favourite"]),
  snack("Milk Chocolate Bar", "100 g", 2500, 2200, "chocolate", ["Smooth and creamy", "Keep in a cool place", "Sweet treat"]),
  snack("Assorted Sweets", "200 g", 1500, 1200, "candy", ["Mixed fruit flavours", "Individually wrapped", "For parties and kids"]),
  snack("Lollipops", "10 pieces", 1200, 1000, "lollipop", ["Fruity lollipops", "Kids' favourite", "Assorted colours"]),
  snack("Popcorn", "5 packs", 1500, 1200, "popcorn", ["Sweet and salty", "Freshly popped", "For movie night"]),

  // Noodles & Ready Meals
  instant("Instant Noodles (Chicken)", "Carton of 40", 13500, 12500, "noodles", ["Ready in 3 minutes", "Chicken flavour", "Best value carton"], ["bestseller"]),
  instant("Instant Noodles (Chicken)", "5 packs", 2000, 1800, "noodles", ["Ready in 3 minutes", "Chicken flavour", "Add egg and vegetables"]),
  instant("Spaghetti", "500 g", 1400, 1200, "spaghetti", ["Does not stick together", "Cooks in 10 minutes", "Great for jollof spaghetti"], ["bestseller"]),
  instant("Spaghetti", "Carton of 20", 26000, 24000, "spaghetti", ["20 packs of 500 g", "Best value for families", "Long shelf life"]),
  instant("Macaroni", "500 g", 1400, 1200, "spaghetti", ["Short pasta shapes", "For jollof or salad", "Cooks in 10 minutes"]),
  instant("Sardines in Oil", "4 x 125 g", 4000, 3600, "canned", ["Tasty fish in oil", "Eat with bread or rice", "Easy-open tins"]),
  instant("Corned Beef", "340 g", 4500, 4000, "canned", ["Ready-to-eat beef", "For sandwiches and sauce", "Long shelf life"]),
  instant("Jollof Rice & Chicken", "1 pack", 3500, 3000, "curry", ["Smoky party jollof", "With fried chicken and plantain", "Freshly cooked, just warm"], ["bestseller"]),
  instant("Egusi Soup & Pounded Yam", "1 pack", 4500, 4000, "stew", ["Rich egusi with assorted meat", "Soft pounded yam", "Freshly cooked"]),
  instant("Fried Rice & Chicken", "1 pack", 3500, 3000, "bento", ["Colourful fried rice", "With chicken and coleslaw", "Freshly cooked"]),
  instant("Chicken Pizza (Medium)", "1 pizza", 9000, 8000, "pizza", ["Cheesy chicken pizza", "Serves 2 to 3 people", "Delivered hot"]),

  // Cleaning & Home
  home("Detergent Powder", "2 kg", 5500, 5000, "bubbles", ["Removes tough stains", "Works in cold water", "Fresh scent"], ["bestseller"]),
  home("Multipurpose Bar Soap", "6 bars", 2500, 2200, "soap", ["For laundry and cleaning", "Long lasting", "Good value"]),
  home("Toilet Roll", "12 rolls", 5500, 4900, "toilet-paper", ["Soft and strong", "2-ply", "Family pack"], ["bestseller"]),
  home("Dishwashing Liquid", "1 litre", 2200, 1900, "lotion", ["Cuts through oil fast", "Gentle on hands", "Lemon scent"]),
  home("Scouring Sponges", "5 pieces", 1500, 1200, "sponge", ["Scrub side and soft side", "For pots and plates", "Long lasting"]),
  home("Sweeping Broom", "1 piece", 2000, 1700, "broom", ["Strong and neat", "Sweeps well", "Long handle"]),
  home("Plastic Bucket", "20 litres", 4000, 3500, "bucket", ["Strong bucket with handle", "For water and laundry", "Easy to carry"]),
  home("Candles", "6 pieces", 1500, 1200, "candle", ["For when light goes off", "Burns up to 6 hours each", "White wax"]),
  home("AA Batteries", "4 pieces", 2500, 2100, "battery", ["Long-lasting power", "For remotes, torches and clocks", "Alkaline"]),
  home("Energy Saving Bulbs", "2 pieces", 3000, 2500, "light-bulb", ["Bright white LED light", "Uses less electricity", "Lasts for years"]),
  home("Kitchen Gloves", "1 pair", 1500, 1200, "gloves", ["Protects your hands", "Strong rubber", "Medium/large size"]),
  home("Laundry Basket", "1 piece", 7000, 6000, "basket", ["Big basket with handles", "Neat and strong", "Air holes on the sides"]),

  // Personal Care
  care("Toothpaste", "2 x 140 g", 3000, 2600, "tooth", ["Fights tooth decay", "Fresh mint breath", "With fluoride"], ["bestseller"]),
  care("Toothbrushes", "3 pieces", 1500, 1200, "toothbrush", ["Soft bristles", "Gentle on gums", "For the whole family"]),
  care("Body Lotion", "400 ml", 4500, 3900, "lotion", ["Keeps skin soft all day", "With cocoa butter", "Non-greasy"], ["bestseller"]),
  care("Bathing Soap", "3 bars", 2400, 2000, "soap", ["Gentle on skin", "Fresh, clean smell", "Lasts long"]),
  care("Petroleum Jelly", "250 ml", 1500, 1300, "jar", ["Protects dry skin and lips", "For all the family", "Pure and gentle"]),
  care("Shaving Razors", "5 pieces", 1500, 1200, "razor", ["Smooth, close shave", "Twin blades", "Disposable"]),
  care("Baby Formula", "400 g", 7500, 6900, "baby-bottle", ["Complete nutrition for babies", "From 0 to 6 months", "Follow the instructions on the tin"]),
];
