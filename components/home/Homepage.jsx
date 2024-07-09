"use client";
import React, { useEffect, useState } from "react";
import DataDisplay from "./DataDisplay";
import {
  SfButton,
  SfLoaderCircular,
  SfSelect,
  usePagination,
} from "@storefront-ui/react";
import { Pagination } from "./Pagination";
import { toast } from "react-hot-toast";
import {
  countFetch,
  dataHandler,
  filterHandler,
} from "../../utils/Home/dataHandler";
import { handleResize } from "../../utils/Home/dataHandler";
import { getUserCookies } from "../../utils/getCookies";

const Homepage = () => {
  const [grid, setGrid] = useState(false);
  const [data, setData] = useState([]);
  const [hidden, setHidden] = useState(true);
  const [islogin, setLogin] = useState(false);
  const [count, setCount] = useState(10);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("Most");
  const [company, setCompany] = useState("All");

  const {
    totalPages,
    pages,
    selectedPage,
    startPage,
    endPage,
    next,
    prev,
    setPage,
    maxVisiblePages,
  } = usePagination({
    totalItems: count,
    currentPage: 1,
    pageSize: 20,
    maxPages: 1,
  });

  //to fetch the total count for pagination
  // useEffect(() => {
  //   setLoading(true);
  //   try {
  //     countFetch(setCount);
  //   } catch (err) {
  //     toast.error("Error fetching data");
  //   }
  //   setLoading(false);
  // }, []);
  useEffect(() => {
    const checkLogin = async () => {
      const user = await getUserCookies();
      if (user) setLogin(true);
    };
    checkLogin();
  }, []);

  useEffect(() => {
    setLoading(true);
    try {
      filterHandler(setData, filter, company, selectedPage, setCount);
    } catch (err) {
      toast.error("Error fetching data");
    }
    setLoading(false);
  }, [filter, company, selectedPage]);

  //to handle respoonsiveness
  useEffect(() => {
    window.addEventListener("resize", () => handleResize(setGrid, setHidden));
    return () =>
      window.removeEventListener("resize", () =>
        handleResize(setGrid, setHidden)
      );
  }, [window]);

  //to fetch data
  // useEffect(() => {
  //   setLoading(true);
  //   try {
  //     dataHandler(setData, setLogin, selectedPage);
  //   } catch (err) {
  //     toast.error("Error fetching data");
  //   }
  //   setLoading(false);
  // }, [selectedPage]);

  return (
    <div className="mt-6">
      <div className="flex flex-row ">
        <h2 className="my-4 items-start font-bold text-2xl">Popular Offers</h2>
        <div className="flex flex-row gap-4 mr-7 ml-auto ">
          {hidden && (
            <SfButton onClick={() => setGrid(!grid)} size="lg" className="my-auto">
              {grid ? "Switch to Horizontal" : "Switch to Grid"}
            </SfButton>
          )}

          <label className="my-auto w-1/4">
            <SfSelect
              placeholder="Choose the Platform"
              size="sm"
              onChange={(e) => setCompany(e.target.value)}
            >
              {/* {options.map((opt) => (
              <option value={opt} key={opt}>
              {opt}
              </option>
              ))} */}
              <option value="All">All</option>
              <option value="Amazon">Amazon</option>
              <option value="Flipkart">Flipkart</option>
              {/* <option value="Myntra">Myntra</option> */}
              <option value="Ajio">Ajio</option>
            </SfSelect>
          </label>
          <label className="my-auto w-1/3">
            <SfSelect
              placeholder="Fiter criteria"
              size="sm"
              onChange={(e) => setFilter(e.target.value)}
            >
              {/* {options.map((opt) => (
              <option value={opt} key={opt}>
              {opt}
              </option>
            ))} */}
              <option value="Most">Most Purchase</option>
              <option value="Price">Price</option>
              <option value="offer">Offer</option>
              <option value="Rating">Rating</option>
            </SfSelect>
          </label>
        </div>
      </div>
      {loading && <SfLoaderCircular />}
      {!loading && <DataDisplay grid={grid} data={data} isLogin={islogin} />}
      <Pagination
        totalPages={totalPages}
        pages={pages}
        selectedPage={selectedPage}
        setPage={setPage}
        startPage={startPage}
        endPage={endPage}
        next={next}
        prev={prev}
        maxVisiblePages={maxVisiblePages}
      />
    </div>
  );
};

export default Homepage;
