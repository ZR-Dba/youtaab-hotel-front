// import axios from "axios";
// import { useEffect, useState } from "react";
// import * as Icons from "react-icons/fa"; // همه آیکون‌های FontAwesome
// import { FaBars, FaSearch, FaUtensils } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import { default as icon, default as noImage } from "../assets/images/logo.png";
// import headerImage from "../assets/images/omlet.jpeg";
// import { useCart } from "./CartContext";

// interface MenuItem {
// 	id: number;
// 	title: string;
// 	description: string;
// 	fee: number;
// 	image: string;
// 	categoryId: number;
// 	available: boolean;
// }

// interface Category {
// 	id: number;
// 	name: string;
// 	icon: string;
// }

// function Menu() {
// 	const { cart, setCart, allMenuItems } = useCart();
// 	const [selectedCategory, setSelectedCategory] = useState("breakfast");
// 	const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
// 	const [searchQuery, setSearchQuery] = useState("");
// 	const [categories, setCategories] = useState<Category[]>();

// 	const navigate = useNavigate();

// 	const totalPrice = Object.entries(cart).reduce((sum, [itemId, quantity]) => {
// 		const item = allMenuItems.find((i) => i.id === parseInt(itemId));
// 		console.log(`Calculating price for item ${itemId}:`, item, quantity);
// 		return sum + (item ? item.fee * quantity : 0);
// 	}, 0);

// 	const updateQuantity = (itemId: number, delta: number) => {
// 		setCart((prev) => {
// 			console.log("delta", delta);
// 			const newQuantity = (prev[itemId] || 0) + delta;
// 			if (newQuantity <= 0) {
// 				const { [itemId]: _, ...rest } = prev;
// 				console.log(`Removed item ${itemId} from cart`);
// 				return rest;
// 			}
// 			console.log(`Updated item ${itemId} to quantity ${newQuantity}`);
// 			return { ...prev, [itemId]: newQuantity };
// 		});
// 	};

// 	const filteredItems = Array.isArray(menuItems)
// 		? searchQuery.trim() === ""
// 			? menuItems
// 			: menuItems.filter((item) =>
// 					[item.title, item.description].some((field) =>
// 						field.toLowerCase().includes(searchQuery.toLowerCase())
// 					)
// 			  )
// 		: [];
// 	console.log("Filtered Items:", filteredItems, "Search Query:", searchQuery);

// 	const getCategories = async () => {
// 		try {
// 			// const response = await axios.get("http://localhost:3000/menu/categories");
// 			const response = await axios.get(
// 				`${import.meta.env.VITE_API_BASE_URL}${
// 					import.meta.env.VITE_MENU_CATEGORIES_ENDPOINT
// 				}`
// 			);
// 			console.log("API Response:", response.data);
// 			setCategories(response.data);
// 		} catch (error) {
// 			console.error("Error fetching categories:", error);
// 			throw error;
// 		}
// 	};

// 	const getMenuItemsByCategoryId = async (categoryId: number) => {
// 		try {
// 			// const response = await axios.get(
// 			// 	`http://localhost:3000/menu/items/category/${categoryId}`
// 			// );
// 			const response = await axios.get(
// 				`${import.meta.env.VITE_API_BASE_URL}${
// 					import.meta.env.VITE_MENU_ITEMS_BY_CATEGORY_ENDPOINT
// 				}/${categoryId}`
// 			);

// 			let items = [];
// 			if (Array.isArray(response.data)) {
// 				items = response.data;
// 			} else if (response.data && typeof response.data === "object") {
// 				items = response.data.items || response.data.data || [];
// 			}
// 			console.log("Extracted Items:", items, "Length:", items.length);
// 			setMenuItems(items);
// 		} catch (error) {
// 			console.error("Error fetching menu items:", error);
// 			setMenuItems([]);
// 		}
// 	};

// 	useEffect(() => {
// 		getCategories();
// 	}, []);

// 	//
// 	useEffect(() => {
// 		if (categories && categories.length > 0) {
// 			setSelectedCategory(categories[0].name);
// 			getMenuItemsByCategoryId(categories[0].id);
// 		}
// 	}, [categories]);

// 	// render categpry icons
// 	const renderIcon = (iconName: string) => {
// 		const IconComponent = Icons[iconName as keyof typeof Icons];
// 		return IconComponent ? (
// 			<IconComponent className="text-xl" />
// 		) : (
// 			<FaUtensils className="text-xl" />
// 		);
// 	};

// 	return (
// 		<div className="flex flex-col h-screen bg-[#FBFBFB]">
// 			{/* navbar*/}
// 			<nav
// 				className="w-full bg-white flex items-center justify-between border-b h-15"
// 				style={{ borderBottomColor: "#BB995B" }}
// 			>
// 				<button className="text-2xl focus:outline-none px-6 text-[#138F96]">
// 					<FaBars />
// 				</button>
// 				<Link to="/" className="flex items-center gap-2">
// 					<img
// 						src={icon}
// 						alt="Logo"
// 						className="h-8 w-auto cursor-pointer"
// 						style={{ width: "100px", height: "auto" }}
// 					/>
// 				</Link>
// 			</nav>

// 			{/*header image */}
// 			<div className="w-full h-50">
// 				<img
// 					src={headerImage}
// 					alt="Menu Header"
// 					className="w-full h-full object-cover"
// 				/>
// 			</div>

// 			{/* categories*/}
// 			<div className="w-full overflow-x-auto bg-white scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
// 				<div className="flex w-max py-4 px-2 whitespace-nowrap flex-nowrap">
// 					{categories?.map((category) => (
// 						<button
// 							key={category.id}
// 							onClick={() => {
// 								setSelectedCategory(category.name);
// 								getMenuItemsByCategoryId(category.id);
// 							}}
// 							className={`flex flex-col items-center text-sm min-w-[90px] ${
// 								selectedCategory === category.name
// 									? "text-[#138F96]"
// 									: "text-[#868686]"
// 							}`}
// 						>
// 							{renderIcon(category.icon)}
// 							<span className="mt-2">{category.name}</span>
// 						</button>
// 					))}
// 				</div>
// 			</div>

// 			{/* search section*/}
// 			<div className="px-4 py-4">
// 				<div className="relative flex items-center">
// 					<FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#138F96]" />
// 					<input
// 						type="text"
// 						value={searchQuery}
// 						onChange={(e) => setSearchQuery(e.target.value)}
// 						placeholder="جستجو"
// 						className="w-full p-3 pl-10 border border-gray-300 rounded-4xl text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#138F96] placeholder:text-[#138F96]"
// 					/>
// 				</div>
// 			</div>

// 			{/* menuItems section*/}

// 			<div className="flex-1 overflow-y-auto p-6 pb-30 mx-4 rounded-lg">
// 				<div className="grid grid-cols-1 gap-4">
// 					{filteredItems.length > 0 ? (
// 						filteredItems.map((item) => (
// 							<div
// 								key={item.id}
// 								className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 border border-[#C9C9C93D]"
// 							>
// 								<img
// 									src={item.image && item.image != null ? item.image : noImage}
// 									alt={item.title}
// 									className="w-full h-50 object-cover"
// 								/>
// 								<div className="p-3">
// 									<h3 className="text-xs text-[#138F96] font-bold text-right">
// 										{item.title}
// 									</h3>
// 									<p className="text-xs text-[#868686] text-right mt-1 line-clamp-2">
// 										{item.description}
// 										{item.available ? null : (
// 											<span className="text-xs text-[#E80000] text-right mt-1 line-clamp-2 pt-2">
// 												ناموجود
// 											</span>
// 										)}
// 									</p>
// 									<div className="flex justify-between items-center mt-6">
// 										<div className="flex items-center gap-2">
// 											<button
// 												disabled={!item.available}
// 												onClick={() => updateQuantity(item.id, 1)}
// 												className="w-6 h-6 rounded-lg text-[#BB995B] border border-[#C9C9C97D]"
// 											>
// 												+
// 											</button>
// 											<span className="text-sm">{cart[item.id] || 0}</span>
// 											<button
// 												disabled={!item.available}
// 												onClick={() => updateQuantity(item.id, -1)}
// 												className="w-6 h-6 rounded-lg text-[#BB995B] border border-[#C9C9C97D]"
// 											>
// 												-
// 											</button>
// 										</div>
// 										<p className="text-sm text-[#138F96] font-bold">
// 											{item.fee} تومان
// 										</p>
// 									</div>
// 								</div>
// 							</div>
// 						))
// 					) : (
// 						<p className="text-center text-[#868686] text-sm">
// 							{searchQuery.trim() === ""
// 								? "هیچ آیتمی برای این دسته یافت نشد"
// 								: "هیچ آیتمی با این جستجو یافت نشد"}
// 						</p>
// 					)}
// 				</div>
// 			</div>

// 			{/* price footer*/}
// 			<div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#BB995B] p-2 flex justify-between items-center">
// 				<button
// 					onClick={() => navigate("/selectService")} // هدایت به صفحه جدید
// 					className="bg-[#138F96] text-white font-bold py-3 px-4 rounded-4xl hover:bg-[#0F767B] transition-colors"
// 				>
// 					تأیید سفارش
// 				</button>
// 				<div className="text-right">
// 					<p className="text-sm text-[#1B1D1D]">مجموع سفارش</p>
// 					<p className="text-sm font-bold">
// 						{totalPrice.toLocaleString()} تومان
// 					</p>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

// export default Menu;



//2222222222222222222
// import axios from "axios";
// import { useEffect, useState } from "react";
// import * as Icons from "react-icons/fa"; // همه آیکون‌های FontAwesome
// import { FaBars, FaSearch, FaUtensils } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import { default as icon, default as noImage } from "../assets/images/logo.png";
// import headerImage from "../assets/images/omlet.jpeg";
// import { useCart } from "./CartContext";

// interface MenuItem {
//   id: number;
//   title: string;
//   description: string;
//   fee: number;
//   image: string;
//   categoryId: number;
//   available: boolean;
// }

// interface Category {
//   id: number;
//   name: string;
//   icon: string;
// }

// function Menu() {
//   const { cart, setCart, allMenuItems } = useCart();
//   const [selectedCategory, setSelectedCategory] = useState("breakfast");
//   const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [categories, setCategories] = useState<Category[]>();

//   const navigate = useNavigate();

//   const totalPrice = Object.entries(cart).reduce((sum, [itemId, quantity]) => {
//     const item = allMenuItems.find((i) => i.id === parseInt(itemId));
//     console.log(`Calculating price for item ${itemId}:`, item, quantity);
//     return sum + (item ? item.fee * quantity : 0);
//   }, 0);

//   const updateQuantity = (itemId: number, delta: number) => {
//     setCart((prev) => {
//       console.log("delta", delta);
//       const newQuantity = (prev[itemId] || 0) + delta;
//       if (newQuantity <= 0) {
//         const { [itemId]: _, ...rest } = prev;
//         console.log(`Removed item ${itemId} from cart`);
//         return rest;
//       }
//       console.log(`Updated item ${itemId} to quantity ${newQuantity}`);
//       return { ...prev, [itemId]: newQuantity };
//     });
//   };

//   const filteredItems = Array.isArray(menuItems)
//     ? searchQuery.trim() === ""
//       ? menuItems
//       : menuItems.filter((item) =>
//           [item.title, item.description].some((field) =>
//             field.toLowerCase().includes(searchQuery.toLowerCase())
//           )
//         )
//     : [];
//   console.log("Filtered Items:", filteredItems, "Search Query:", searchQuery);

//   const getCategories = async () => {
//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_API_BASE_URL}${
//           import.meta.env.VITE_MENU_CATEGORIES_ENDPOINT
//         }`
//       );
//       console.log("API Response:", response.data);
//       setCategories(response.data);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//       throw error;
//     }
//   };

//   const getMenuItemsByCategoryId = async (categoryId: number) => {
//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_API_BASE_URL}${
//           import.meta.env.VITE_MENU_ITEMS_BY_CATEGORY_ENDPOINT
//         }/${categoryId}`
//       );

//       let items = [];
//       if (Array.isArray(response.data)) {
//         items = response.data;
//       } else if (response.data && typeof response.data === "object") {
//         items = response.data.items || response.data.data || [];
//       }
//       console.log("Extracted Items:", items, "Length:", items.length);
//       setMenuItems(items);
//     } catch (error) {
//       console.error("Error fetching menu items:", error);
//       setMenuItems([]);
//     }
//   };

//   useEffect(() => {
//     getCategories();
//   }, []);

//   useEffect(() => {
//     if (categories && categories.length > 0) {
//       setSelectedCategory(categories[0].name);
//       getMenuItemsByCategoryId(categories[0].id);
//     }
//   }, [categories]);

//   // render category icons
//   const renderIcon = (iconName: string) => {
//     const IconComponent = Icons[iconName as keyof typeof Icons];
//     return IconComponent ? (
//       <IconComponent className="text-xl" />
//     ) : (
//       <FaUtensils className="text-xl" />
//     );
//   };

//   return (
//     <div className="flex flex-col h-screen bg-[#FBFBFB]">
//       {/* navbar */}
//       <nav
//         className="w-full bg-white flex items-center justify-between border-b h-15"
//         style={{ borderBottomColor: "#BB995B" }}
//       >
//         <button className="text-2xl focus:outline-none px-6 text-[#138F96]">
//           <FaBars />
//         </button>
//         <Link to="/" className="flex items-center gap-2">
//           <img
//             src={icon}
//             alt="Logo"
//             className="h-8 w-auto cursor-pointer"
//             style={{ width: "100px", height: "auto" }}
//           />
//         </Link>
//       </nav>

//       {/* scrollable content */}
//       <div
//         className="flex-1 overflow-y-auto mb-20"
//         style={{
//           height: "calc(100vh - 60px - 80px)", // نویگیشن 60px، فوتر 80px
//         }}
//       >
//         {/* header image */}
//         <div className="w-full h-50">
//           <img
//             src={headerImage}
//             alt="Menu Header"
//             className="w-full h-full object-cover"
//           />
//         </div>

//         {/* categories */}
//         <div className="w-full overflow-x-auto bg-white scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
//           <div className="flex w-max py-4 px-2 whitespace-nowrap flex-nowrap">
//             {categories?.map((category) => (
//               <button
//                 key={category.id}
//                 onClick={() => {
//                   setSelectedCategory(category.name);
//                   getMenuItemsByCategoryId(category.id);
//                 }}
//                 className={`flex flex-col items-center text-sm min-w-[90px] ${
//                   selectedCategory === category.name
//                     ? "text-[#138F96]"
//                     : "text-[#868686]"
//                 }`}
//               >
//                 {renderIcon(category.icon)}
//                 <span className="mt-2">{category.name}</span>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* search section */}
//         <div className="px-4 py-4">
//           <div className="relative flex items-center">
//             <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#138F96]" />
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="جستجو"
//               className="w-full p-3 pl-10 border border-gray-300 rounded-4xl text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#138F96] placeholder:text-[#138F96]"
//             />
//           </div>
//         </div>

//         {/* menuItems section */}
//         <div className="p-6 pb-4 mx-4 rounded-lg">
//           <div className="grid grid-cols-1 gap-4">
//             {filteredItems.length > 0 ? (
//               filteredItems.map((item) => (
//                 <div
//                   key={item.id}
//                   className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 border border-[#C9C9C93D]"
//                 >
//                   <img
//                     src={item.image && item.image != null ? item.image : noImage}
//                     alt={item.title}
//                     className="w-full h-50 object-cover"
//                   />
//                   <div className="p-3">
//                     <h3 className="text-xs text-[#138F96] font-bold text-right">
//                       {item.title}
//                     </h3>
//                     <p className="text-xs text-[#868686] text-right mt-1 line-clamp-2">
//                       {item.description}
//                       {item.available ? null : (
//                         <span className="text-xs text-[#E80000] text-right mt-1 line-clamp-2 pt-2">
//                           ناموجود
//                         </span>
//                       )}
//                     </p>
//                     <div className="flex justify-between items-center mt-6">
//                       <div className="flex items-center gap-2">
//                         <button
//                           disabled={!item.available}
//                           onClick={() => updateQuantity(item.id, 1)}
//                           className="w-6 h-6 rounded-lg text-[#BB995B] border border-[#C9C9C97D]"
//                         >
//                           +
//                         </button>
//                         <span className="text-sm">{cart[item.id] || 0}</span>
//                         <button
//                           disabled={!item.available}
//                           onClick={() => updateQuantity(item.id, -1)}
//                           className="w-6 h-6 rounded-lg text-[#BB995B] border border-[#C9C9C97D]"
//                         >
//                           -
//                         </button>
//                       </div>
//                       <p className="text-sm text-[#138F96] font-bold">
//                         {item.fee} تومان
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-center text-[#868686] text-sm">
//                 {searchQuery.trim() === ""
//                   ? "هیچ آیتمی برای این دسته یافت نشد"
//                   : "هیچ آیتمی با این جستجو یافت نشد"}
//               </p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* price footer */}
//       <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#BB995B] p-2 flex justify-between items-center">
//         <button
//           onClick={() => navigate("/selectService")}
//           className="bg-[#138F96] text-white font-bold py-3 px-4 rounded-4xl hover:bg-[#0F767B] transition-colors"
//         >
//           تأیید سفارش
//         </button>
//         <div className="text-right">
//           <p className="text-sm text-[#1B1D1D]">مجموع سفارش</p>
//           <p className="text-sm font-bold">
//             {totalPrice.toLocaleString()} تومان
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Menu;




import axios from "axios";
import { useEffect, useState } from "react";
import * as Icons from "react-icons/fa"; // همه آیکون‌های FontAwesome
import { FaBars, FaSearch, FaUtensils } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { default as icon, default as noImage } from "../assets/images/logo.png";
import headerImage from "../assets/images/omlet.jpeg";
import { useCart } from "./CartContext";

interface MenuItem {
  id: number;
  title: string;
  description: string;
  fee: number;
  image: string;
  categoryId: number;
  available: boolean;
}

interface Category {
  id: number;
  name: string;
  icon: string;
}

function Menu() {
  const { cart, setCart, allMenuItems } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("breakfast");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<Category[]>();

  const navigate = useNavigate();

  const totalPrice = Object.entries(cart).reduce((sum, [itemId, quantity]) => {
    const item = allMenuItems.find((i) => i.id === parseInt(itemId));
    console.log(`Calculating price for item ${itemId}:`, item, quantity);
    return sum + (item ? item.fee * quantity : 0);
  }, 0);

  const updateQuantity = (itemId: number, delta: number) => {
    setCart((prev) => {
      console.log("delta", delta);
      const newQuantity = (prev[itemId] || 0) + delta;
      if (newQuantity <= 0) {
        const { [itemId]: _, ...rest } = prev;
        console.log(`Removed item ${itemId} from cart`);
        return rest;
      }
      console.log(`Updated item ${itemId} to quantity ${newQuantity}`);
      return { ...prev, [itemId]: newQuantity };
    });
  };

  const filteredItems = Array.isArray(menuItems)
    ? searchQuery.trim() === ""
      ? menuItems
      : menuItems.filter((item) =>
          [item.title, item.description].some((field) =>
            field.toLowerCase().includes(searchQuery.toLowerCase())
          )
        )
    : [];
  console.log("Filtered Items:", filteredItems, "Search Query:", searchQuery);

  const getCategories = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}${
          import.meta.env.VITE_MENU_CATEGORIES_ENDPOINT
        }`
      );
      console.log("API Response:", response.data);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  };

  const getMenuItemsByCategoryId = async (categoryId: number) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}${
          import.meta.env.VITE_MENU_ITEMS_BY_CATEGORY_ENDPOINT
        }/${categoryId}`
      );

      let items = [];
      if (Array.isArray(response.data)) {
        items = response.data;
      } else if (response.data && typeof response.data === "object") {
        items = response.data.items || response.data.data || [];
      }
      console.log("Extracted Items:", items, "Length:", items.length);
      setMenuItems(items);
    } catch (error) {
      console.error("Error fetching menu items:", error);
      setMenuItems([]);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (categories && categories.length > 0) {
      setSelectedCategory(categories[0].name);
      getMenuItemsByCategoryId(categories[0].id);
    }
  }, [categories]);

  // render category icons
  const renderIcon = (iconName: string) => {
    const IconComponent = Icons[iconName as keyof typeof Icons];
    return IconComponent ? (
      <IconComponent className="text-xl" />
    ) : (
      <FaUtensils className="text-xl" />
    );
  };

  return (
    <div className="flex flex-col h-screen bg-[#FBFBFB]">
      {/* navbar */}
      <nav
        className="w-full bg-white flex items-center justify-between border-b h-15"
        style={{ borderBottomColor: "#BB995B" }}
      >
        <button className="text-2xl focus:outline-none px-6 text-[#138F96]">
          <FaBars />
        </button>
        <Link to="/" className="flex items-center gap-2">
          <img
            src={icon}
            alt="Logo"
            className="h-8 w-auto cursor-pointer"
            style={{ width: "100px", height: "auto" }}
          />
        </Link>
      </nav>

      {/* scrollable content */}
      <div
        className="flex-1 overflow-y-auto mb-20"
        style={{
          height: "calc(100vh - 60px - 80px)", // نویگیشن 60px، فوتر 80px
        }}
      >
        {/* header image */}
        <div className="w-full h-50">
          <img
            src={headerImage}
            alt="Menu Header"
            className="w-full h-full object-cover"
          />
        </div>

        {/* sticky categories */}
        <div className="sticky top-0 z-10 w-full overflow-x-auto bg-white scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          <div className="flex w-max py-4 px-2 whitespace-nowrap flex-nowrap">
            {categories?.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.name);
                  getMenuItemsByCategoryId(category.id);
                }}
                className={`flex flex-col items-center text-sm min-w-[90px] ${
                  selectedCategory === category.name
                    ? "text-[#138F96]"
                    : "text-[#868686]"
                }`}
              >
                {renderIcon(category.icon)}
                <span className="mt-2">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* search section */}
        <div className="px-4 py-4">
          <div className="relative flex items-center">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#138F96]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو"
              className="w-full p-3 pl-10 border border-gray-300 rounded-4xl text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#138F96] placeholder:text-[#138F96]"
            />
          </div>
        </div>

        {/* menuItems section */}
        <div className="p-6 pb-4 mx-4 rounded-lg">
          <div className="grid grid-cols-1 gap-4">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 border border-[#C9C9C93D]"
                >
                  <img
                    src={item.image && item.image != null ? item.image : noImage}
                    alt={item.title}
                    className="w-full h-50 object-cover"
                  />
                  <div className="p-3">
                    <h3 className="text-xs text-[#138F96] font-bold text-right">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#868686] text-right mt-1 line-clamp-2">
                      {item.description}
                      {item.available ? null : (
                        <span className="text-xs text-[#E80000] text-right mt-1 line-clamp-2 pt-2">
                          ناموجود
                        </span>
                      )}
                    </p>
                    <div className="flex justify-between items-center mt-6">
                      <div className="flex items-center gap-2">
                        <button
                          disabled={!item.available}
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 rounded-lg text-[#BB995B] border border-[#C9C9C97D]"
                        >
                          +
                        </button>
                        <span className="text-sm">{cart[item.id] || 0}</span>
                        <button
                          disabled={!item.available}
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 rounded-lg text-[#BB995B] border border-[#C9C9C97D]"
                        >
                          -
                        </button>
                      </div>
                      <p className="text-sm text-[#138F96] font-bold">
                        {item.fee} تومان
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-[#868686] text-sm">
                {searchQuery.trim() === ""
                  ? "هیچ آیتمی برای این دسته یافت نشد"
                  : "هیچ آیتمی با این جستجو یافت نشد"}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* price footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#BB995B] p-2 flex justify-between items-center">
        <button
          onClick={() => navigate("/selectService")}
          className="bg-[#138F96] text-white font-bold py-3 px-4 rounded-4xl hover:bg-[#0F767B] transition-colors"
        >
          تأیید سفارش
        </button>
        <div className="text-right">
          <p className="text-sm text-[#1B1D1D]">مجموع سفارش</p>
          <p className="text-sm font-bold">
            {totalPrice.toLocaleString()} تومان
          </p>
        </div>
      </div>
    </div>
  );
}

export default Menu;