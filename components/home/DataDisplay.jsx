import React, { useEffect, useState } from "react";
import GridDisplay from "./gridDisplayCard";
import HoriDisplay from "./horiDisplayCard";

const DataDisplay = ({grid,data,isLogin}) => {

  if (data.length === 0) {
    return <div className="flex justify-center items-center h-screen">
      <h1 className="text-2xl bg-green-400">No Data Available</h1>
    </div>
  }


  return <div className="gap-2">
    <div className= {`m-8 grid  ${ !grid? 'lg:grid-cols-2 lg:gap-6 md:grid-cols-1 md:gap-4 sm:grid-cols-1 sm:gap-3 grid-rows-1 gap-3' : 'lg:grid-cols-4 lg:gap-6 md:grid-cols-3 md:gap-4 sm:grid-cols-2 sm:gap-3 grid-rows-1 gap-3'}` }>
    {data.map((prod) => {
        return grid ? <GridDisplay prod={prod} isLogin={isLogin} /> : <HoriDisplay prod={prod} isLogin={isLogin} />
    })}
    </div>
  </div>

//   return <div>{grid ? <GridDisplay prod={data} /> : <HoriDisplay prod={data}/>}</div>;
};

export default DataDisplay;
