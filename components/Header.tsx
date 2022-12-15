import Link from "next/link";

const Header = () => {
  return (
    <header>
      <nav className="px-2 py-4 container mx-auto">
        <a
          href="/"
          className={`no-underline 
            text-2xl lg:text-4xl
             text-teal-500 hover:text-teal-400
            text-center font-bold
            `}
        >
          yuta0709
        </a>
      </nav>
    </header>
  );
};

export default Header;
