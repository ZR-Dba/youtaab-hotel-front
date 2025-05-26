import { FaChair } from "react-icons/fa";
import { MdMenuBook } from "react-icons/md";
import { Link } from "react-router-dom";
import "./App.css";
import youtaabImage from "./assets/images/home.png";
import log0 from "./assets/images/logo.png";
import "./index.css";

function App() {
	
	const primaryColor = import.meta.env.VITE_PRIMARY_COLOR;
	const homeImage = import.meta.env.VITE_HOME_IMAGE;

	console.log("color", primaryColor);

	return (
		<div className="min-h-screen bg-[#FBFBFB] sm:bg-white flex justify-center">
			<div className="w-full sm:max-w-[640px] flex flex-col h-screen sm:h-auto sm:my-8">
				<div className="h-1/2 w-full">
					<img
						src={homeImage}
						alt="Restaurant"
						className="h-full w-full object-cover"
					/>

					<img
						src={log0}
						alt="Youtaab Restaurant Logo"
						className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-auto"
					/>
				</div>

				<div
					className="text-lg text-center font-vazir"
					style={{ marginTop: "7rem" }}
				>
					.به رستوران هتل یوتاب خوش آمدید
				</div>

				<div className="h-1/2 flex flex-row gap-6 px-10 mt-6">
					<Link
						to="/reserve"
						className="w-1/2 flex items-center justify-center"
						style={{
							// border: "1px solid #BB995B",
							border: `1px solid ${primaryColor}`,
							borderRadius: "16px",
							height: "120px",
						}}
					>
						<div className="flex flex-col items-center justify-center gap-3">
							<FaChair className="text-4xl" style={{ color: primaryColor }} />
							<span className="font-bold" style={{ color: primaryColor }}>
								رزرو میز
							</span>
						</div>
					</Link>

					<Link
						to="/menu"
						className="w-1/2 flex items-center justify-center"
						style={{
							// border: "1px solid #BB995B",
							border: `1px solid ${primaryColor}`,
							borderRadius: "16px",
							height: "120px",
						}}
					>
						<div className="flex flex-col items-center justify-center gap-3">
							<MdMenuBook
								className="text-4xl"
								style={{ color: primaryColor }}
							/>
							<span className="font-bold" style={{ color: primaryColor }}>
								مشاهده منو
							</span>
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default App;
