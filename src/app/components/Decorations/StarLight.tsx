import { PiStarFourFill } from "react-icons/pi";
import { Light } from "./Light";

interface StarLightProps {
    className?: string;
}

export function StarLight({className} : StarLightProps) {
    return (
        <div className={`absolute flex items-center justify-center w-fit h-fit ${className}`}>
            <Light className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
            <PiStarFourFill color="#025CA4" />
        </div>
    )
}