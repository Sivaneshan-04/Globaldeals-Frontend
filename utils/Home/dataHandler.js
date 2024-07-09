import { fetchData } from "../fetchData";
import { getJWTokens } from "../getCookies";

export const dataHandler = async (setData, setLogin, selectedPage) => {
    try {
      const user = await getJWTokens();
    if (user) setLogin(true);
    const response = await fetchData(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${selectedPage}`
    );
    console.log(response, "this is data");
    setData(response);
  } catch (err) {
    console.log(err);
    throw new Error("Error fetching data");
  }
};

export const countFetch = async (setCount) => {
  try {
    const response = await fetchData(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/count`
    );
    console.log(response, "count");
    setCount(response.count);
  } catch (e) {
    throw new Error("Error fetching count");
  }
};

export const filterHandler = async (setData,filter,company,selectedPage,setCount) => {

  try {
    const response = await fetchData(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/filter/filt=${filter}&comp=${company}&page=${selectedPage}`
    );
    console.log(response, "this is data");
    setData(response.data);
    setCount(response.count);
  } catch (err) {
    console.log(err);
    throw new Error("Error fetching data");
  }
};


export const handleResize = (setGrid,setHidden) => {
  if (window.innerWidth < 640) {
    // Tailwind's sm breakpoint is 640px
    setGrid(true);
    setHidden(false);
  } else {
    setHidden(true);
  }
};