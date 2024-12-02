import { FaLaptop } from "react-icons/fa";
import ThemeToggle from "@/components/toggle/ThemeToggle";
import Link from "next/link";
const SidebarHeader = () => {
  return (
    <div>
      <Link
        href="#"
        className="flex items-center mb-4 gap-4 px-4 text-2xl font-bold text-blue-500 hover:text-blue-600 transition duration-200"
      >
        <FaLaptop className="text-blue-500 hover:text-blue-600 h-8 w-8 transition duration-200" />
        <div className="ml-24">
          <ThemeToggle />
        </div>
      </Link>
    </div>
  );
};

export default SidebarHeader;
