import {
	FaBars,
	FaCalendarAlt,
	FaClock,
	FaUser,
	FaCheckCircle,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import icon from "../assets/images/logo.png";
import { MdMenuBook } from "react-icons/md";

function ConfirmationSuccess() {
	const { state } = useLocation();
	const { reservationData, selectedTable } = state || {};
	const navigate = useNavigate();

	return (
		<div className="flex flex-col h-screen bg-[#FBFBFB]">
			{/* نوار ناوبری */}
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

			{/* متن مسیر */}
			<div className="px-4 py-2 text-xs text-[#868686] text-right">
				رزرو میز / جستجو / اطلاعات میز / تکمیل رزرو / پرداخت موفق
			</div>

			{/* فیلترهای انتخابی */}
			<div className="px-4 py-4 bg-white mx-4 mt-4 rounded-lg">
				<h2 className="text-sm text-[#BB995B] text-center">:اطلاعات رزرو</h2>
				<hr className="border-gray-300 mt-3" />
				<p className="text-[#138F96] text-right pt-3 font-bold">
					{selectedTable?.name}
				</p>
				<div className="mt-2 text-xs text-[#868686] flex justify-end p-2 gap-3">
					<div className="flex items-center gap-1 bg-[#BB995B0F] p-1 rounded-lg text-[#BB995B]">
						<span>نفر</span>
						<span>{reservationData?.people} </span>
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

			{/* آیکون و پیام موفقیت */}
			<div className="flex flex-col items-center mt-8">
				<FaCheckCircle className="text-[#138F96] text-6xl" />
				<h2 className="text-lg mt-4">!رزرو با موفقیت انجام شد</h2>
				<p className="text-sm text-[#868686] mt-2 text-center px-4">
					میز مورد نظر برای شما ثبت شده و منتظر حضور شما هستیم. در صورت نیاز، از
					طریق شماره واردشده با شما تماس خواهیم گرفت.
				</p>
			</div>

			{/* دکمه و متن زیر آن */}
			<div className="px-4 py-4 mt-8">
				<div>
					<button
						onClick={() => navigate("/menu")}
						className="w-full border border-[#BB995B] text-[#BB995B] font-bold py-2 rounded-4xl flex justify-center items-center gap-2"
					>
						مشاهده منو
					<MdMenuBook className="text-[#BB995B] text-2xl" />
					</button>
				</div>
				<p className="text-xs text-[#868686] text-center mt-4">
					جهت هماهنگی‌های بیشتر، لطفاً با پشتیبانی رستوران به شماره ۰۷۱۳۳۳۳۳۳۳۳
					تماس بگیرید.
				</p>
			</div>
		</div>
	);
}

export default ConfirmationSuccess;
