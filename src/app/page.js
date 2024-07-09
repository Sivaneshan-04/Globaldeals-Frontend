import Header from "../../components/header/Header";
import Homepage from "../../components/home/Homepage";
import TopDeals from "../../components/topDeals/Deals";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-slate-100">
      <Header />
      <h2 className="mr-auto ml-8 my-4 items-start font-bold text-2xl">Top Deals</h2>
      <TopDeals />
      <Homepage />
    </main>
  );
}
