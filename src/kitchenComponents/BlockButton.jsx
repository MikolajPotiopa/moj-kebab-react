import { FaRectangleXmark } from "react-icons/fa6";

export default function BlockButton({onOpen}){


    return(
        <div onClick={onOpen} className="openBtnBlockedProducts">
            <FaRectangleXmark />
        </div>
    );
}