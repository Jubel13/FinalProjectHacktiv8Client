import React, { useEffect, useState } from "react";
import Card from "../components/CarList/templates/Card";
import { carsApi } from "../API";
import { useSearchParams } from "react-router-dom";

export default function CarList() {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let [searchParams, setSearchParams] = useSearchParams();
  let brandQuery = searchParams.get("brand")?.toLowerCase();

  const fetchCars = async () => {
    const response = await carsApi.get();
    // console.log(response.data);
    setIsLoading(false);
    if (brandQuery) {
      let cars = response.data.filter((car) => {
        return car.Type.Brand.name.toLowerCase() === brandQuery;
      });
      console.log(cars);
      setCars(cars);
    } else {
      setCars(response.data);
    }
  };
  useEffect(() => {
    fetchCars();
  }, [brandQuery]);

  return (
    <div className="h-full w-full mt-8 px-48 flex flex-col gap-y-12">
      <div className="h-full w-full flex flex-wrap gap-y-8 items-center justify-center">
        {isLoading
          ? Array.from(Array(15).keys()).map((el) => {
              return (
                <div className="w-80 h-96 mx-8 overflow-hidden bg-white rounded-xl shadow-lg border ease-in-out transition-all duration-50 cursor-default">
                  <div className="h-48 w-full overflow-hidden bg-slate-400 animate-pulse flex justify-center items-center"></div>
                  <div className="mt-4 py-2 px-4 w-full h-12">
                    <div className="rounded-full w-full h-full bg-slate-400 animate-pulse"></div>
                  </div>
                  <div className="h-12 w-full py-2 px-4 grid grid-cols-2 gap-x-2">
                    <div className="w-full h-full rounded-full bg-slate-400 animate-pulse"></div>
                    <div className="w-full h-full rounded-full bg-slate-400 animate-pulse"></div>
                  </div>
                  <div className="mt-4 h-12 w-full flex justify-end py-2 px-4">
                    <div className="w-1/2 h-full rounded-lg bg-slate-400 animate-pulse"></div>
                  </div>
                </div>
              );
            })
          : cars.map((car, index) => {
              return <Card key={index} car={car} />;
            })}
      </div>
    </div>
  );
}
