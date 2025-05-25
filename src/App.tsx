// import { FaChair } from "react-icons/fa";
// import { MdMenuBook } from "react-icons/md";
// import { Link } from "react-router-dom";
// import "./App.css";
// import youtaabImage from "./assets/images/home.png";
// import log0 from "./assets/images/logo.png";
// import "./index.css";

// function App() {
// 	return (
// 		<div className="flex flex-col h-screen bg-[#FBFBFB]">
// 			<div className="h-1/2 w-full">
// 				<img
// 					src={youtaabImage}
// 					alt="Restaurant"
// 					className="h-full w-full object-cover"
// 				/>
// 				<img
// 					src={log0}
// 					alt="Overlay"
// 					className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24"
// 					style={{ width: "300px", height: "auto" }}
// 				/>
// 			</div>

// 			<div className="text-lg text-center" style={{ marginTop: "7rem" }}>
// 				.به رستوران هتل یوتاب خوش آمدید
// 			</div>

// 			<div className="h-1/2 flex flex-row gap-6">
// 				<Link
// 					to="/reserve"
// 					className="w-1/2 flex items-center justify-center ml-10 mt-6"
// 					style={{
// 						border: "1px solid #BB995B",
// 						borderRadius: "16px",
// 						height: "120px",
// 					}}
// 				>
// 					<div className="flex flex-col items-center justify-center gap-3">
// 						<FaChair className="text-[#BB995B] text-4xl" />
// 						<span className="font-bold" style={{ color: "#BB995B" }}>
// 							رزرو میز
// 						</span>
// 					</div>
// 				</Link>

// 				<Link
// 					to="/menu"
// 					className="w-1/2 flex items-center justify-center mr-10 mt-6"
// 					style={{
// 						border: "1px solid #BB995B",
// 						borderRadius: "16px",
// 						height: "120px",
// 					}}
// 				>
// 					<div className="flex flex-col items-center justify-center gap-3">
// 						<MdMenuBook className="text-[#BB995B] text-4xl" />
// 						<span className="font-bold" style={{ color: "#BB995B" }}>
// 							مشاهده منو
// 						</span>
// 					</div>
// 				</Link>
// 			</div>
// 		</div>
// 	);
// }

// export default App;

import { FaChair } from "react-icons/fa";
import { MdMenuBook } from "react-icons/md";
import { Link } from "react-router-dom";
import "./App.css";
import youtaabImage from "./assets/images/home.png";
import log0 from "./assets/images/logo.png";
import "./index.css";

function App() {
  return (
    <div className="min-h-screen bg-[#FBFBFB] sm:bg-white flex justify-center">
      <div className="w-full sm:max-w-[640px] flex flex-col h-screen sm:h-auto sm:my-8">
        <div className="relative w-full h-[50vh] min-h-[200px]">
          <img
            src={youtaabImage}
            alt="Restaurant"
            className="h-full w-full object-cover"
          />
          <img
            src={log0}
            alt="Youtaab Restaurant Logo"
            className="absolute left-1/2 bottom-0 translate-x-[-50%] translate-y-[50%] w-[300px] sm:w-[300px] h-auto z-10"
          />
        </div>

        <div className="h-[50vh] flex flex-col gap-6 px-10 mt-6">
          <div className="text-lg text-center" style={{ marginTop: "7rem" }}>
            .به رستوران هتل یوتاب خوش آمدید
          </div>
          <div>
			<div className="flex flex-row sm:flex-row gap-6">
            <Link
              to="/reserve"
              className="w-1/2 flex flex-row items-center justify-center"
              style={{
                border: "1px solid #BB995B",
                borderRadius: "16px",
                height: "120px",
              }}
            >
              <div className="flex flex-col items-center justify-center gap-3">
                <FaChair className="text-[#BB995B] text-4xl" />
                <span className="font-bold" style={{ color: "#BB995B" }}>
                  رزرو میز
                </span>
              </div>
            </Link>

            <Link
              to="/menu"
              className="w-1/2 flex items-center justify-center"
              style={{
                border: "1px solid #BB995B",
                borderRadius: "16px",
                height: "120px",
              }}
            >
              <div className="flex flex-col items-center justify-center gap-3">
                <MdMenuBook className="text-[#BB995B] text-4xl" />
                <span className="font-bold" style={{ color: "#BB995B" }}>
                  مشاهده منو
                </span>
              </div>
            </Link>
          </div>
		  </div>
        </div>
      </div>
    </div>
  );
}

export default App;
