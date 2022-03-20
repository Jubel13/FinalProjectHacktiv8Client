import { useEffect, useState } from "react";
import { useNavigate, useParams} from "react-router-dom";
import axios from "axios"


export default function Detail() {
  const [carsDetail, setCarsDetail] = useState({});
  const navigate = useNavigate()
  const { id } = useParams()
  useEffect(() => {
    axios.get(`http://localhost:3000/cars/${id}`)
    .then(res => {
      setCarsDetail(res.data)
    })
  }, [])

  const fetchMap = (id) =>{
    navigate(`/map-navigation/${id}`)
  }

  const goToPaymentPage = () => {
    navigate('/payments')
  }
  const getFullReport = (idInspection) => {
    navigate(`/full-report/${idInspection}`)
  }

  return (
    <div className="containerDetail">
      {/* image and maps navigasi */}
      <div className="flex flex-row">
        <div className="w-4/6 h-5/6">
          <img className="w-full h-full" src="https://prod-carsome-id.imgix.net/B2C/55e0354e-6fa0-4a0a-a6aa-f0c48f54868b.jpg" alt="" />
        </div>
        <div className="w-2/6 h-5/6 p-4">
          <h1 className="flex items-start font-bold text-2xl mt-1.5">{carsDetail.name}</h1>
          <h4 className="flex items-start text-sm mt-4">{carsDetail.mileage} km</h4>
          <h2 className="flex items-start font-bold text-xl text-red-600">Rp. {carsDetail.price} (cash)</h2>
          <div className="flex items-start flex-row rounded-md mt-4 p-3 bg-slate-100">
            <i className="flex justify-center mt-1 fa-solid fa-location-dot text-red-600 mr-4" />
            <button className="flex justify-center font-semibold text-sky-600" onClick={() => fetchMap(carsDetail.id)}>Check Dealer Location</button>
          </div>

          {/* modal pembayaran */}
          <div className="flex flex-row">
            <button onClick={() => goToPaymentPage()} className="flex btn items-center justify-center mt-12 font-bold w-5/6 h-12 rounded-md">Buy Now</button>
            <a href="https://api.whatsapp.com/send/?phone=6281355538777" className="flex btn items-center justify-center mt-12 ml-3 rounded-md bg-gray-700 h-12 "><i className="fa-brands fa-whatsapp text-4xl text-green-400 px-3"></i></a>
          </div>
        </div>
      </div>

      {/* detail mobil */}

      <div className="my-12">
        <h1 className="font-bold text-slate-900 text-4xl">Car Detail</h1>
        <h1 className="font-semibold text-slate-900 text-lg mt-3">ID : {carsDetail.id}</h1>
      </div>
      
      <hr className="mb-4 mx-16"/>

      <div className="flex justify-around mb-10">
        <div className="w-2/5 h-auto">
          <div className="flex justify-between w-full mb-4 ">
            <span>Fuel Type</span>
            <span>{carsDetail.fuel}</span>
          </div>
          <hr className="mb-4"/>
          <div className="flex justify-between w-full mb-4">
            <span>Number Of Seat</span>
            <span>{carsDetail.seats}</span>
          </div>
          <hr className="mb-4"/>
          <div className="flex justify-between w-full mb-4">
            <span>Year Made</span>
            <span>{carsDetail.yearMade}</span>
          </div>
        </div>

        <div className="w-2/5 h-auto">
          <div className="flex justify-between w-full mb-4">
            <span>Color</span>
            <span>{carsDetail.color}</span>
          </div>
          <hr className="mb-4"/>
          <div className="flex justify-between w-full mb-4">
            <span>Inspection</span>

          </div>
          <hr className="mb-4"/>
          <div className="flex justify-between w-full mb-4">
            <span>Current Mileage</span>
            <span>{carsDetail.mileage} km</span>
          </div>
        </div>
      </div>

      {/* card inspeksi */}

      <div className="flex justify-center bg-gray-100">
          <div className="flex flex-row  w-3/4 my-32">
              <div className="shadow-lg shadow-slate-600 rounded-l-lg w-3/6 bg-blue-900">
                <div className="p-10">
                  <h1 className="font-bold text-lg text-white">Mobil Bekas Berkualitas</h1>
                  <p className="font-semibold text-white">Proses inspeksi ketat 175 titik dan rekondisi memastikan Anda mendapatkan standar tertinggi. Hanya 3 dari 100 mobil yang mendapatkan persetujuan Otosic Certified.</p>
                </div>
              </div>
              <div className="shadow-lg shadow-slate-400 rounded-r-lg w-3/6 bg-white">
                <div className="flex flex-row justify-between m-5">
                  <span>Eksterior</span>
                  <span>6 Terdeteksi / 56</span>
                </div>
                <div className="flex content-start m-5">
                  <h1 className="text-left text-sm">Bamper Depan Baret, Pintu Depan Kanan gores dan lesung, Atap lecet, Gril Depan lecet, Spion Kiri Bocel, Kondisi Velg Depan Kiri Lecet</h1>
                </div>
                <hr className="mx-5"/>
                <div className="flex flex-row justify-between m-5">
                  <h1>Interior</h1>
                  <span>84 Lulus</span>
                </div>
                <hr className="mx-5"/>
                <div className="flex flex-row justify-between m-5">
                  <h1>Tes Jalan</h1>
                  <span>15 Lulus</span>
                </div>
                <hr className="mx-5"/>
                <div className="flex flex-row justify-between m-5">
                  <h1>Bagian Kolong</h1>
                  <span>23 Lulus</span>
                </div>
                <div className="flex flex-row justify-center m-5">
                  <button onClick={() => getFullReport(carsDetail.Inspection.id)} className="btn btn-outline my-3">Get Full Report</button>
                </div>
              </div>
          </div>
      </div>
    </div>
  )
}