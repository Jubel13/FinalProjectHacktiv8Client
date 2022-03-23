import React, { useEffect, useState } from "react";
import Card from "../components/CarList/templates/Card";
import { carsApi } from "../API";
import { useSearchParams } from "react-router-dom";

export default function CarList() {
  const [cars, setCars] = useState([]);
  let [searchParams, setSearchParams] = useSearchParams();
  let brandQuery = searchParams.get("brand")?.toLowerCase();

  const fetchCars = async () => {
    const response = await carsApi.get();
    // console.log(response.data);
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
    <div className='h-full w-full mt-8 px-36 flex flex-col gap-y-12'>
      {/* <div className="h-24 w-full z-50 bg-slate-600 flex flex-col justify-center items-center sticky top-0">
        Search
      </div> */}
      <div className='h-full w-full flex flex-wrap gap-y-8 items-center justify-center'>
        {cars.map((car, index) => {
          return <Card key={index} car={car} />;
        })}
      </div>
    </div>
  );
}
