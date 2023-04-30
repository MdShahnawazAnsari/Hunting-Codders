import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "@/styles/globals.css";
import NewsLetter from "@/components/NewsLetter";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <NewsLetter />
      <Footer />
    </>
  );
}
