import Link from "next/link";

const Header = () => {
  return (
    <header>
      <nav className="px-2 sm:px-4 md:py-5 container mx-auto">
        <a
          href="/"
          className="no-underline text-xl md:text-2xl lg:text-4xl text-slate-900 hover:text-slate-700"
        >
          yuta0709
        </a>
      </nav>
    </header>
  );
};

export default Header;
