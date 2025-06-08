import React, { useEffect, useState } from "react";
import { assets } from "../assets/admin_assets/assets";
import axios from "axios";
import { backendUrl } from "./../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState("");
  const [features, setFeatures] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allCategories = await axios.get(
          backendUrl + "/api/category/list"
        );
        const allBrands = await axios.get(backendUrl + "/api/brand/list");
        if (allCategories.data.success) {
          setCategories(allCategories.data.categories);
        }
        if (allBrands.data.success) {
          setBrands(allBrands.data.brands);
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to load categories or brands");
      }
    };
    fetchData();
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("brand", brand);
      formData.append("bestseller", bestSeller);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("features", JSON.stringify(features));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setImage1("");
        setImage2("");
        setImage3("");
        setImage4("");
        setPrice("");
        setFeatures([]);
        setSizes([]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Add product Failed");
    }
  };

  return (
    <div>
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col w-full items-start gap-3"
      >
        <div>
          <p className="mb-2">Upload Image</p>
          <div className="flex gap-2">
            <label htmlFor="image1">
              <img
                className="w-20"
                src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
                alt=""
              />
              <input
                onChange={(e) => setImage1(e.target.files[0])}
                type="file"
                id="image1"
                hidden
              />
            </label>
            <label htmlFor="image2">
              <img
                className="w-20"
                src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
                alt=""
              />
              <input
                onChange={(e) => setImage2(e.target.files[0])}
                type="file"
                id="image2"
                hidden
              />
            </label>
            <label htmlFor="image3">
              <img
                className="w-20"
                src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
                alt=""
              />
              <input
                onChange={(e) => setImage3(e.target.files[0])}
                type="file"
                id="image3"
                hidden
              />
            </label>
            <label htmlFor="image4">
              <img
                className="w-20"
                src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
                alt=""
              />
              <input
                onChange={(e) => setImage4(e.target.files[0])}
                type="file"
                id="image4"
                hidden
              />
            </label>
          </div>
        </div>
        <div className="w-full">
          <p className="mb-2">Product Name</p>
          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
            className="w-full max-w-[500px] px-3 py-2"
            type="text"
            required
          />
        </div>
        <div className="w-full">
          <p className="mb-2">Product Description</p>
          <textarea
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            value={description}
            className="w-full max-w-[500px] px-3 py-2"
            required
          />
        </div>
        <div className="w-full">
          <p className="mb-2">Product Features</p>
          <textarea
            onChange={(e) => {
              const items = e.target.value
                .split(",")
                .map((item)=>item.trim())
                .filter((item) => item !== "");
              setFeatures(items);
            }}
            value={features.join(",")}
            className="w-full max-w-[500px] px-3 py-2"
            required
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
          <div>
            <p className="mb-2">Product category</p>
            <select
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              className="w-full px-3 py-2"
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p className="mb-2">Product Brand</p>
            <select
              onChange={(e) => {
                setBrand(e.target.value);
              }}
              className="w-full px-3 py-2"
            >
              <option value="">Select Brand</option>
              {brands.map((b) => (
                <option key={b._id} value={b._id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p className="mb-2">Product Price</p>
            <input
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              value={price}
              className="w-full px-3 py-2 sm:w-[120px]"
              type="number"
            />
          </div>
        </div>
        <div className="w-full">
          <p className="mb-2">Product Sizes</p>
          <textarea
            onChange={(e) => {
              const items = e.target.value
                .split(",")
                .map((item) => item.trim())
                .filter((item) => item !== "");
              setSizes(items);
            }}
            value={sizes.join(", ")} 
            className="w-full max-w-[500px] px-3 py-2"
            required
          />
        </div>
        <div className="flex gap-2 mt-2">
          <input
            onChange={(e) => {
              setBestSeller((prev) => !prev);
            }}
            checked={bestSeller}
            type="checkbox"
            id="bestseller"
          />
          <label className="cursor-pointer" htmlFor="bestseller">
            Add to BestSeller
          </label>
        </div>
        <button type="submit" className="w-28  py-3 mt-4 bg-black text-white">
          Add
        </button>
      </form>
    </div>
  );
};

export default Add;
