"use client";
import {
  SfButton,
  SfIconRemove,
  SfLink,
  SfIconAdd,
  SfIconSell,
  SfIconDelete,
  SfIconFavorite,
  SfRating,
  SfCounter,
  SfIconThumbUp,
  SfIconFavoriteFilled,
  SfIconUnfoldMore,
} from "@storefront-ui/react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function HoriDisplay({ prod,isLogin }) {
  const [like, setLike] = useState(false);

  const wishListHandler = () => {
    if (!isLogin) return toast.error("Please login to add to wishlist");
    setLike(!like);
    if (like) return toast.success("Removed from wishlist");
    toast.success("Added to wishlist");
  };

  return (
    <div
      key={prod._id}
      className="relative flex border-b-[1px] border-neutral-200 bg-white rounded-md hover:shadow-lg min-w-[320px] max-w-[640px] p-4"
    >
      <div className="relative overflow-hidden rounded-md max-w-[280px] max-h-[280px] sm:w-[176px]">
        <SfLink href={prod.url}>
          <img
            className="w-full h-auto border rounded-md border-neutral-200"
            src={prod.imageUrl}
            alt={prod.Shop}
            width="300"
            height="300"
          />
        </SfLink>
        <SfButton
          variant="tertiary"
          size="sm"
          square
          onClick={wishListHandler}
          className="absolute bottom-0 right-0 mr-2 mb-2 bg-white ring-1 ring-inset ring-neutral-200 !rounded-full"
          aria-label="Add to wishlist"
        >
         {like? <SfIconFavoriteFilled size="sm" color="red" /> : <SfIconFavorite size="sm" color="red"/>}
        </SfButton>
        <div className="absolute top-0 left-0 text-white bg-secondary-600 py-1 pl-1.5 pr-2 text-xs font-medium">
          <SfIconSell size="xs" className="mr-1" />
          Sale
        </div>
      </div>
      <div className="flex flex-col justify-between pl-4 min-w-[180px] flex-1">
        <SfLink
          href={prod.url}
          variant="secondary"
          className="no-underline typography-text-sm sm:typography-text-lg"
        >
          {prod.title.length > 100
            ? prod.title.substring(0, prod.title.lastIndexOf(" ", 100)) + "..."
            : prod.title}
        </SfLink>

        <div className="flex sm:flex-row items-center justify-between mt-4 sm:mt-0">
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

        <div className="flex flex-row justify-around">
          <SfButton
            disabled={!isLogin}
            size="sm"
            slotPrefix={<SfIconThumbUp size="sm" />}
          >
           Like
          </SfButton>
          <SfButton
            disabled={!isLogin}
            size="sm"
            slotPrefix={<SfIconUnfoldMore size="sm" />}
          >
            Comment
          </SfButton>
          <SfButton as="a" href={prod.url}>
              Buy Now
          </SfButton>
        </div>
      </div>
    </div>
  );
}
