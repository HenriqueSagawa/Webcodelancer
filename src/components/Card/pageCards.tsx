import { MdMonitor, MdDesktopWindows, MdMode, MdOutlinePhoneAndroid, MdRocketLaunch  } from "react-icons/md";
import { FaDatabase } from "react-icons/fa";

export const color = "#48cae4";


const pageCards = [
    { icon: <MdMonitor color={color} size={70} />, title: "Fron End", href: "/projetos" },
    { icon: <MdDesktopWindows color={color} size={70} />, title: "Back End", href: "/projetos" },
    { icon: <MdMode color={color} size={70} />, title: "Prototipagem", href: "/projetos" },
    { icon: <MdOutlinePhoneAndroid color={color} size={70} />, title: "Responsividade", href: "/projetos" },
    { icon: <FaDatabase color={color} size={70} />, title: "Análise de Dados", href: "/projetos" },
    { icon: <MdRocketLaunch color={color} size={70} />, title: "Otimização", href: "/projetos" },
];

export default pageCards;
