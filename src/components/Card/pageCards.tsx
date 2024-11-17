import { MdMonitor, MdDesktopWindows, MdMode, MdOutlinePhoneAndroid, MdRocketLaunch  } from "react-icons/md";
import { FaDatabase } from "react-icons/fa";

export const color = "#48cae4";


const pageCards = [
    { icon: <MdMonitor color={color} size={70} />, title: "Fron End", href: "#" },
    { icon: <MdDesktopWindows color={color} size={70} />, title: "Back End", href: "#" },
    { icon: <MdMode color={color} size={70} />, title: "Prototipagem", href: "#" },
    { icon: <MdOutlinePhoneAndroid color={color} size={70} />, title: "Responsividade", href: "#" },
    { icon: <FaDatabase color={color} size={70} />, title: "Análise de Dados", href: "#" },
    { icon: <MdRocketLaunch color={color} size={70} />, title: "Otimização", href: "#" },
];

export default pageCards;
