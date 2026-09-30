import { useState } from "react";
import { assets } from "../../assets/assets";
import { categories } from "../../config/categories";
import { useAppContext } from "../../contex/AppContex";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [unit, setUnit] = useState("");

  const { axios } = useAppContext();
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const productData = {
        name,
        description: description.split("\n"),
        category,
        price: Number(price),
        offerPrice: Number(offerPrice || price),
        unit,
      };
      const formData = new FormData();
      formData.append("productData", JSON.stringify(productData));
      for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
      }

      const { data } = await axios.post("/api/product/add", formData);

      if (data.success) {
        toast.success(data.message);
        setName("");
        setDescription("");
        setCategory("");
        setPrice("");
        setOfferPrice("");
        setUnit("");
        setFiles([]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-extrabold tracking-tight">Add a product</h1>
      <p className="mt-1 text-muted">It appears in the shop as soon as you save it.</p>
      <form
        onSubmit={onSubmitHandler}
        className="mt-6 max-w-2xl space-y-5 rounded-[2rem] bg-white p-6 ring-1 ring-line sm:p-8"
      >
        {/* Product Images */}
        <div>
          <p className="font-bold">Product Image</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {Array(4)
              .fill("")
              .map((_, index) => (
                <label key={index} htmlFor={`image${index}`}>
                  <input
                    onChange={(e) => {
                      const updatedFiles = [...files];
                      updatedFiles[index] = e.target.files[0];
                      setFiles(updatedFiles);
                    }}
                    accept="image/*"
                    type="file"
                    id={`image${index}`}
                    hidden
                  />
                  <img
                    className="max-w-24 cursor-pointer"
                    src={
                      files[index]
                        ? URL.createObjectURL(files[index])
                        : assets.upload_area
                    }
                    alt="upload area"
                    width={100}
                    height={100}
                  />
                </label>
              ))}
          </div>
        </div>

        {/* Product Name */}
        <div className="flex flex-col gap-1 max-w-md">
          <label className="font-bold" htmlFor="product-name">
            Product Name
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            id="product-name"
            type="text"
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded-xl border border-line text-lg"
            required
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1 max-w-md">
          <label
            className="font-bold"
            htmlFor="product-description"
          >
            Product Description
          </label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            id="product-description"
            rows={4}
            className="outline-none md:py-2.5 py-2 px-3 rounded-xl border border-line text-lg resize-none"
            placeholder="Type here"
          ></textarea>
        </div>

        {/* Category */}
        <div className="w-full flex flex-col gap-1">
          <label className="font-bold" htmlFor="category">
            Category
          </label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            id="category"
            required
            className="outline-none md:py-2.5 py-2 px-3 rounded-xl border border-line text-lg"
          >
            <option value="">Select Category</option>
            {categories.map((item, index) => (
              <option key={index} value={item.path}>
                {item.text}
              </option>
            ))}
          </select>
        </div>

        {/* Pack size */}
        <div className="flex flex-col gap-1 max-w-md">
          <label className="font-bold" htmlFor="product-unit">
            Pack size
          </label>
          <input
            onChange={(e) => setUnit(e.target.value)}
            value={unit}
            id="product-unit"
            type="text"
            placeholder="e.g. 1 kg, 50 kg bag, 1 paint bucket, 6 pieces"
            className="outline-none md:py-2.5 py-2 px-3 rounded-xl border border-line text-lg"
          />
        </div>

        {/* Pricing */}
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="font-bold" htmlFor="product-price">
              Normal price (₦)
            </label>
            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              id="product-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded-xl border border-line text-lg"
              required
            />
          </div>

          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="font-bold" htmlFor="offer-price">
              Selling price (₦)
            </label>
            <input
              onChange={(e) => setOfferPrice(e.target.value)}
              value={offerPrice}
              id="offer-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded-xl border border-line text-lg"
            />
          </div>
        </div>

        {/* Submit */}
        <button className="h-14 rounded-2xl bg-primary px-10 text-lg font-extrabold text-white hover:bg-primary-dull">
          Save product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
