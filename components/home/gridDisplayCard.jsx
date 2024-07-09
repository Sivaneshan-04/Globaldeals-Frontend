'use client';
import {
  SfButton,
  SfRating,
  SfCounter,
  SfLink,
  SfIconShoppingCart,
  SfIconFavorite,
  SfIconThumbUp,
  SfIconFavoriteFilled,
  SfIconUnfoldMore,
} from "@storefront-ui/react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function GridDisplay({ prod, isLogin }) {
  const [like,setLike] = useState(false);

  const wishListHandler = () => {
    if(!isLogin) return toast.error("Please login to add to wishlist");
    setLike(!like);
    if(like) return toast.success("Removed from wishlist");
    toast.success("Added to wishlist");
  }

  return (
    <div
      key={prod._id}
      className="border bg-white border-neutral-200 rounded-md hover:shadow-lg max-w-[280px]"
    >
      <div className="relative my-1">
        <SfLink href={prod.url} className="block">
          <img
            src={prod.imageUrl}
            alt={prod.Shop}
            className="object-cover h-auto mx-auto rounded-md aspect-square"
            width="250"
            height="250"
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
      </div>
      <div className="p-4 border-t border-neutral-200">
        <SfLink href={prod.url} variant="secondary" className="no-underline">
          {prod.title.length > 100
            ? prod.title.substring(0, prod.title.lastIndexOf(" ", 100)) + "..."
            : prod.title}
        </SfLink>
          <div className="flex items-center my-1">
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
          <div className="flex gap-2 my-1">
            <span className="block font-bold typography-text-lg">
              {prod.price}
            </span>
            <span className="line-through typography">
              {prod.originalPrice}
            </span>
            <span>
                <SfCounter size="xl" className="text-red-400 font-bold">
                  {prod.discount}
                </SfCounter>
              </span>
          </div>
        <div className="flex flex-row justify-between mt-2">
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
        </div>
      </div>
    </div>
  );
}
