import Link from "next/link";

const links = [
    { href: "/best-laptops", label: "Best Laptops" },
    { href: "/about", label: "About" },
    { href: "/posts", label: "Posts" },
    { href: "/authors", label: "Authors" },
    { href: "/contact", label: "Contact" },
];

const SidebarLinks = () => {
    return (
        <ul className="flex flex-col space-y-4">
            {links.map((link) => (
                <li key={link.href} className="list-none">
                    <Link href={link.href}>
                        <span className="cursor-pointer text-blue-500 hover:text-blue-600 transition duration-200">
                            {link.label}
                        </span>
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default SidebarLinks;