"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fetchData } from "../../utils/fetchData";
import {
  SfButton,
  SfCounter,
  SfIconChevronLeft,
  SfIconChevronRight,
  SfLink,
  SfRating,
} from "@storefront-ui/react";
import Link from "next/link";

const ScrollableComponent = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [deal, setDeals] = useState([]);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const resp = await fetchData(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/top-deals`
        );
        console.log(resp, "these are the deals");
        setDeals(resp);
      } catch (e) {
        console.log(e);
        toast.error("Error fetching deals");
      }
    };
    fetchDeals();
  }, []);

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < deal.length - 3) {
      setActiveIndex(activeIndex + 1);
    }
  };

  return (
    <div className="relative w-full overflow-hidden">
      {activeIndex !== 0 && (
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10">
          <SfButton onClick={handlePrev} className="p-2 rounded-full shadow-md">
            <SfIconChevronLeft />
          </SfButton>
        </div>
      )}
      {activeIndex < deal.length - 3 && (
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10">
          <SfButton
            onClick={handleNext}
            className="p-2 ml-4 rounded-full shadow-md"
          >
            <SfIconChevronRight />
          </SfButton>
        </div>
      )}
      <div
        className="flex transition-transform duration-300"
        style={{ transform: `translateX(-${activeIndex * 33.33}%)` }}
      >
        {deal.map((prod, index) => (
          <Link href={prod.url} key={prod._id} className="w-1/3 bg-white flex-shrink-0 p-2 mr-4">
            {/* Render your prod here */}
            <div className="p-4 rounded-lg">
              <img
                src={prod.imageUrl}
                alt={prod.title}
                className="w-full h-40 object-cover mb-2"
              />
              <h3 className="text-lg font-semibold">{prod.title}</h3>
              <div className="flex items-center">
              <SfRating size="xs" value={prod.reviews} max={5} />
              {prod.totalBuyers && (
                <SfLink
                  href="#"
                  variant="secondary"
                  className="pl-1 no-underline"
                >
                  <SfCounter size="xs">{prod.totalBuyers}</SfCounter>
                </SfLink>
              )}
            </div>
              <div className="flex mr-5">
                <span className="block font-bold typography-text-lg mr-2">
                  {prod.price}
                </span>
                <span className="line-through typography mr-2 text-gray-500">
                  {prod.originalPrice}
                </span>
                <span>
                  <SfCounter size="xl" className="text-red-400 font-bold">
                    {prod.discount}
                  </SfCounter>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ScrollableComponent;
