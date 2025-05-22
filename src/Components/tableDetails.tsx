import { FaBars, FaCalendarAlt, FaClock, FaUser } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import table1 from "../assets/images/home.png";
import icon from "../assets/images/logo.png";

function TableDetail() {
	const { state } = useLocation();
	const { reservationData, selectedTable } = state || {};
	const navigate = useNavigate();

	const completeReservation = () => {
		// هدایت به صفحه تأیید با ارسال اطلاعات
		navigate("/confirmation", { state: { reservationData, selectedTable } });
	};

	return (
		<div className="flex flex-col h-screen bg-[#FBFBFB]">
			{/* نوار ناوبری */}
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

			<p className="text-xs text-right text-[#868686] py-3 px-4">
				{" "}
				رزرو میز / جیستجو / اطلاعات میز
			</p>
			{/* تصویر میز */}
			<div className="h-1/3 w-full p-3">
				<img
					src={table1}
					alt={selectedTable?.number}
					className="h-full w-full object-cover rounded-3xl"
				/>
			</div>

			{/* فیلترهای انتخابی */}
			<div className="px-4 py-4 bg-white mx-4 mt-4 rounded-lg">
				<h2 className="text-sm text-[#BB995B] text-center">
					:فیلترهای انتخابی
				</h2>
				<hr className="border-gray-300 mt-3" />
				<p className="text-[#138F96] text-right pt-3 font-bold">
					{selectedTable?.name}
				</p>
				<div className="mt-2 text-xs text-[#868686] flex justify-end p-2 gap-3">
					<div className="flex items-center gap-1 bg-[#BB995B0F] p-1 rounded-lg text-[#BB995B]">
						<span>نفر</span>
						<span>{reservationData?.people}</span>
						<FaUser />
					</div>
					<div className="flex items-center gap-1 bg-[#BB995B0F] p-1 rounded-lg text-[#BB995B]">
						<span>{reservationData?.hour} ساعت</span>
						<FaClock />
					</div>
					<div className="flex items-center gap-1 bg-[#BB995B0F] p-1 rounded-lg text-[#BB995B]">
						<span>{reservationData?.date}</span>
						<FaCalendarAlt />
					</div>
				</div>
			</div>

			{/* توضیحات میز */}
			<div className="px-4 py-4 bg-white mx-4 mt-4 rounded-lg">
				<h2 className="text-sm text-[#BB995B] text-center">:توضیحات میز</h2>
				<hr className="border-gray-300 mt-3" />
				<div className="mt-2 text-xs text-[#1B1D1D] text-right">
					{selectedTable.description}
				</div>
			</div>

			{/* هزینه رزرو */}
			<div className="px-4 py-4 bg-white mx-4 mt-4 rounded-lg">
				<h2 className="text-sm text-[#BB995B] text-center">:هزینه رزرو</h2>
				<hr className="border-gray-300 mt-3" />
				<div className="mt-2 text-sm text-[#868686] text-right">
					<div className="text-[#138F96] font-bold text-right dir-rtl pb-3">
						<div className="flex flex-row-reverse gap-1">
							<span>۱۰۰,۰۰۰</span>
							<span>تومان</span>
						</div>
					</div>

					<p className="text-[#1B1D1D]">
						برای نهایی شدن رزرو، مبلغ ,۱۰۰۰۰۰ تومان به‌عنوان پیش‌پرداخت دریافت
						می‌شود. پس از پرداخت، میز به نام شما ثبت خواهد شد
					</p>
				</div>
			</div>

			{/* دکمه‌ها */}
			<div className="px-4 py-4 flex flex-col gap-4">
				<button
					onClick={completeReservation}
					className="flex-1 bg-[#138F96] text-white font-bold py-2 rounded-4xl"
				>
					تکمیل رزرو
				</button>
				<div
					className="flex-1 text-center text-[#BB995B] rounded-lg"
					onClick={() => navigate("/reserve")}
				>
					بازگشت
				</div>
			</div>
		</div>
	);
}

export default TableDetail;
