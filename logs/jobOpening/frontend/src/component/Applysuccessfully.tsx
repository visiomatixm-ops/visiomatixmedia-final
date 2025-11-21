import { FaRegCheckCircle, } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const Applysuccessfully = ({onClose}) => {
    return (
        <div className="flex items-center justify-center border rounded-xl shadow-xl shadow-gray-500 bg-gray-50">
            <div className="p-8 w-full max-w-md text-center">
                <button className="absolute top-3 right-3 text-gray-500 hover:text-red-800 transition-all"
                        onClick={onClose}
                >
                    <IoMdClose className="text-3xl" />
                </button>
                <FaRegCheckCircle className="text-green-500 text-7xl mx-auto mb-4" />

                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Application Submitted Successfully
                </h2>

                <p className="text-gray-600">
                    Thank you for applying! We’ll review your application and get back to you soon.
                </p>
            </div>
         </div>
    );
};

export default Applysuccessfully;
