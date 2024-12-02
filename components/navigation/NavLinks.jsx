import Link from "next/link";

const Links = [
  { href: "/home", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const NavLinks = () => {
  return (
    <ul className="flex space-x-4">
      {" "}
      {/* Adjust the spacing as needed */}
      {Links.map((link) => (
        <li key={link.href} className="list-none">
          <Link href={link.href}>
            <span className="cursor-pointer text-blue-500 hover:text-blue-600 transition duration-200">
              {link.label}
            </span>{" "}
            {/* Link styling applied to span */}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;

