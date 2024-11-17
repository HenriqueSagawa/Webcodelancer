import { FaArrowRight } from "react-icons/fa6";

interface ArrowProps {
    className?: string;
}

export function Arrow({className}: ArrowProps) {
    return (
        <div className={className}>
            <FaArrowRight />
        </div>
    )
}