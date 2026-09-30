// `path` must match the category stored on products (see server/data/catalog.js)
export const categories = [
  { path: "Fruits", text: "Fresh Fruits", image: "/images/products/tangerine.webp", bgColor: "#FFF1E4" },
  { path: "Vegetables", text: "Vegetables & Peppers", image: "/images/products/tomato.webp", bgColor: "#FDECEC" },
  { path: "Foodstuff", text: "Rice, Beans & Foodstuff", image: "/images/products/rice.webp", bgColor: "#FBF3DC" },
  { path: "Cooking", text: "Oils, Soup & Spices", image: "/images/products/palm-tree.webp", bgColor: "#EAF6E6" },
  { path: "Meat", text: "Meat, Fish & Chicken", image: "/images/products/chicken.webp", bgColor: "#FCEEE8" },
  { path: "Breakfast", text: "Milk, Eggs & Breakfast", image: "/images/products/egg.webp", bgColor: "#FFF6DD" },
  { path: "Bakery", text: "Bread & Pastries", image: "/images/products/bread.webp", bgColor: "#F7EFE6" },
  { path: "Drinks", text: "Drinks & Water", image: "/images/products/juice-box.webp", bgColor: "#E7F4FB" },
  { path: "Snacks", text: "Snacks & Sweets", image: "/images/products/chocolate.webp", bgColor: "#F6ECF9" },
  { path: "Instant", text: "Noodles & Ready Meals", image: "/images/products/noodles.webp", bgColor: "#FDEFE3" },
  { path: "Household", text: "Cleaning & Home", image: "/images/products/bubbles.webp", bgColor: "#EAF0FB" },
  { path: "PersonalCare", text: "Personal Care", image: "/images/products/lotion.webp", bgColor: "#EDF7F4" },
];

export const findCategory = (path) =>
  categories.find((c) => c.path.toLowerCase() === String(path || "").toLowerCase());

export const categoryTint = (path) => findCategory(path)?.bgColor || "#F1F4EE";
