import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className="flex flex-col min-h-screen font-sans">
        <Header />
        <Component {...pageProps} />
        <footer className="text-center text-gray-500">
          &copy; 2022 yuta0709
        </footer>
      </div>
    </>
  );
}

export default MyApp;
