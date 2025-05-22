import axios from "axios";
import { useEffect, useState } from "react";
import { FaBars, FaChevronDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import icon from "../assets/images/logo.png";
import foodImage from "../assets/images/omlet.jpeg";
import { useCart } from "./CartContext";

interface Table {
	id: number;
	name: string;
	capacity: number;
	photo: string;
	description?: string;
}

const getAllTables = async () => {
	try {
		// const response = await axios.get("http://localhost:3000/tables");
		const response = await axios.get(
			`${import.meta.env.VITE_API_BASE_URL}${
				import.meta.env.VITE_TABLES_ENDPOINT
			}`
		);
		console.log("API Response:", response.data);
		return response.data;
	} catch (error) {
		console.error("Error fetching tables:", error);
		throw error;
	}
};

function SelectService() {
	const { cart, setCart, allMenuItems } = useCart();
	const [selectedTable, setSelectedTable] = useState("");
	const [additionalNotes, setAdditionalNotes] = useState("");
	const [tables, setTables] = useState<Table[]>();
	const navigate = useNavigate();

	useEffect(() => {
		getAllTables().then((tables) => setTables(tables));
	}, []);

	// محاسبه مجموع قیمت
	const totalPrice = Object.entries(cart).reduce((sum, [itemId, quantity]) => {
		const item = allMenuItems.find((i) => i.id === parseInt(itemId));
		return sum + (item ? item.fee * quantity : 0);
	}, 0);

	// تغییر تعداد آیتم
	const updateQuantity = (itemId: number, delta: number) => {
		setCart((prev) => {
			const newQuantity = (prev[itemId] || 0) + delta;
			if (newQuantity <= 0) {
				const { [itemId]: _, ...rest } = prev;
				return rest;
			}
			return { ...prev, [itemId]: newQuantity };
		});
	};

	const handlePayment = () => {
		if (!selectedTable) {
			alert("لطفاً یک میز انتخاب کنید");
			return;
		}
		console.log("سفارش:", { cart, selectedTable, additionalNotes, totalPrice });
		navigate("/success");
		toast.success(`سفارش شما با موفقیت برای میز شماره ${selectedTable} ثبت شد`);
	};

	return (
		<div className="flex flex-col h-screen bg-[#FBFBFB]">
			{/* navbar */}
			<nav
				className="w-full bg-white flex items-center justify-between border-b"
				style={{ borderBottomColor: "#BB995B" }}
			>
				<button className="text-2xl focus:outline-none p-6 text-[#138F96]">
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

			{/* order details */}
			<div className="p-6 mx-4 bg-white rounded-lg shadow-xs my-4">
				<h2 className="text-xs text-[#BB995B] text-center pb-6">
					:اطلاعات تکمیلی سفارش
				</h2>
				<div className="mb-4">
					<label className="block text-sm text-[#1B1D1D] text-right mb-2">
						نام میز را انتخاب کنید
					</label>
					<div className="relative w-full">
						<select
							value={selectedTable}
							onChange={(e) => setSelectedTable(e.target.value)}
							className="w-full p-3 pl-10 border border-gray-300 rounded-lg text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#138F96] appearance-none bg-white"
						>
							<option value=""></option>
							{tables?.map((table) => (
								<option key={table.id} value={table.id}>
									{table.name}
								</option>
							))}
						</select>
						<FaChevronDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#868686] text-sm" />
					</div>
				</div>
				<div>
					<label className="block text-sm text-[#868686] text-right mb-2">
						توضیحات اضافه
					</label>
					<textarea
						value={additionalNotes}
						onChange={(e) => setAdditionalNotes(e.target.value)}
						className="w-full p-3 border border-gray-300 rounded-lg text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#138F96] resize-none"
						rows={4}
					/>
				</div>
			</div>

			{/* user order*/}
			<div className="flex-1 shadow-xs overflow-y-auto p-6 mx-4 mb-30 rounded-lg bg-white">
				<h2 className="text-sm text-[#BB995B] text-center pb-6">سفارش شما</h2>
				{Object.entries(cart).length === 0 ? (
					<p className="text-sm text-[#868686] text-right">
						هنوز هیچ سفارشی ثبت نکرده اید
					</p>
				) : (
					<div className="grid grid-cols-1 gap-4">
						{Object.entries(cart).map(([itemId, quantity]) => {
							const item = allMenuItems.find((i) => i.id === parseInt(itemId));
							return item ? (
								<div
									key={itemId}
									className="bg-white rounded-lg shadow-xs overflow-hidden flex transition-transform transform hover:scale-105 border border-[#C9C9C93D]"
								>
									{/* اطلاعات غذا */}
									<div className="p-3 flex-1">
										<h3 className="text-sm text-[#1B1D1D] font-bold text-right">
											{item.title}
										</h3>
										<p className="text-xs text-[#868686] text-right mt-1 line-clamp-2">
											{item.description}
										</p>
										<div className="flex justify-between items-center mt-4">
											<div className="flex items-center gap-2">
												<button
													onClick={() => updateQuantity(item.id, 1)}
													className={`w-6 h-6 rounded-lg text-[#BB995B] border border-[#C9C9C97D] `}
												>
													+
												</button>
												<span className="text-sm">{quantity}</span>
												<button
													onClick={() => updateQuantity(item.id, -1)}
													className={`w-6 h-6 rounded-lg text-[#BB995B] border border-[#C9C9C97D] `}
												>
													-
												</button>
											</div>
											<p className="text-sm text-[#138F96] font-bold">
												{(item.fee * quantity).toLocaleString()} تومان
											</p>
										</div>
									</div>
									{/* عکس غذا */}
									<div className="p-4">
										<img
											src={foodImage}
											alt={item.title}
											className="w-24 h-24 object-cover rounded-lg"
										/>
									</div>
								</div>
							) : null;
						})}
					</div>
				)}
			</div>

			{/* footer*/}
			<div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#BB995B] p-5 flex justify-between items-center">
				<button
					onClick={handlePayment}
					className="bg-[#138F96] text-white font-bold py-4 px-6 rounded-4xl hover:bg-[#0F767B] transition-colors"
				>
					تایید نهایی
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

export default SelectService;
