import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

export default function FullReportPage() {
  const [inspection, setInspection] = useState({})
  const {idInspection} = useParams()
  

  useEffect(() => {
    axios.get(`http://localhost:3000/inspections/${idInspection}`)
      .then(res => {
        console.log(res.data);
        setInspection(res.data)
      })
      .catch(err => console.log(err)  )
  }, [])
  return (
    <>
      <div className="flex flex-col justify-center bg-gray-100">
        <div className="bg-white mx-20 mt-20 w-5/6 rounded-md">
          <div className="flex flex-row justify-between p-3">
            <span>Main Inspection</span>
            <span>Graduated</span>
          </div>
          <div className="flex flex-row justify-center p-4"> 
            <div className="flex w-2/4">
              <img className="rounded-l-md" src="https://www.carsome.id/_nuxt/img/r-no-0.720afe1.jpg" alt="" />
            </div>
            <div className="flex flex-col items-start rounded-r-md text-left w-2/4 bg-slate-200 p-4">
              <span>Inspection standard</span>
              <p className="mb-3 text-slate-500">1) The main structural components of the car including the front inner wheelhouse, roof panel reinforcement, inner front pillar, center pillar, inner rear pillar, front chassis member, rear chassis member and chassis frame are assessed to ensure there are no signs of different from Repair or replacement on each weld joint mark.</p>
              <p className="text-slate-500">2) Signs of seat belt replacement will be identified by comparing the year of manufacture of the belt with the year of manufacture of the vehicle. The seat belt is a safety feature designed to work effectively only once. Seat belts and airbags in cars involved in major collisions are usually replaced. Once the seat belt webbing is subjected to an impact force, the belt will stretch permanently and lose its vital elasticity.</p>
            </div>
          </div>
        </div>

        <div className="bg-white mx-20 my-10 w-5/6 rounded-md">
          <div className="flex flex-row justify-between p-4">
            <span>Exterior</span>
            <span>Graduated</span>
          </div>
          <div className="flex flex-row justify-center p-4"> 
            <div className="flex w-2/4">
              <img className="rounded-l-md" src="https://www.carsome.id/_nuxt/img/r-1.52ab45b.jpg" alt="" />
            </div>
            <div className="flex flex-col items-start rounded-r-md text-left w-2/4 bg-slate-200 p-4">
              <span>Inspection standard</span>
              <p className="mb-3 text-slate-500">The inspector team ensures all parts that are outside the vehicle such as, bumper and grille, tires, hood, fenders, doors, body side panels, trunk lid, roof, glass, head lamp, stop lamp, mirrors and report according to conditions such as repainting , scratches, dimples, torn dents and putty</p>
            </div>
          </div>
          <div className="flex flex-row p-4">
            <div className="flex flex-col w-2/4 mr-3">
              <div className="flex flex-row items-center justify-between w-full my-3">
                  <span>Bamper</span>
                  {
                    inspection.bamper === true ? <i className="fa-solid fa-check text-green-500"></i> : <i className="fa-solid fa-x text-red-600"></i> 
                  }
              </div>
              <hr />
              <div className="flex flex-row items-center justify-between w-full my-3">
                  <span>Chasis</span>
                  {
                    inspection.chasis === true ? <i className="fa-solid fa-check text-green-500"></i> : <i className="fa-solid fa-x text-red-600"></i> 
                  }
              </div>
              <hr />
              <div className="flex flex-row items-center justify-between w-full my-3">
                  <span>Kaca Belakang</span>
                  {
                    inspection.kacaBelakang === true ? <i className="fa-solid fa-check text-green-500"></i> : <i className="fa-solid fa-x text-red-600"></i> 
                  }
              </div>
              <hr />
              <div className="flex flex-row items-center justify-between w-full my-3">
                  <span>Kaca Samping</span>
                  {
                    inspection.kacaSamping === true ? <i className="fa-solid fa-check text-green-500"></i> : <i className="fa-solid fa-x text-red-600"></i> 
                  }
              </div>
            </div>
            <div className="flex flex-col w-2/4">
              <div className="flex flex-row items-center justify-between w-full my-3">
                  <span>Lights</span>
                  {
                    inspection.lights === true ? <i className="fa-solid fa-check text-green-500"></i> : <i className="fa-solid fa-x text-red-600"></i> 
                  }
              </div>
              <hr />
              <div className="flex flex-row items-center justify-between w-full my-3">
                  <span>Roof</span>
                  {
                    inspection.roof === true ? <i className="fa-solid fa-check text-green-500"></i> : <i className="fa-solid fa-x text-red-600"></i> 
                  }
                  
              </div>
              <hr />
              <div className="flex flex-row items-center content-center justify-between w-full my-3">
                  <span>Spion</span>
                  {
                    inspection.spion === true ? <i className="fa-solid fa-check text-green-500"></i> : <i className="fa-solid fa-x text-red-600"></i> 
                  }
              </div>
              <hr />
              <div className="flex flex-row items-center justify-between w-full my-3">
                  <span>Tire</span>
                  {
                    inspection.tire === true ? <i className="fa-solid fa-check text-green-500"></i> : <i className="fa-solid fa-x text-red-600"></i> 
                  }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}