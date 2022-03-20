export default function FullReportPage() {
  return (
    <>
      <div className="flex justify-center bg-gray-100">
        <div className="bg-white m-20 w-5/6 rounded-md">
          <div className="flex flex-row justify-between p-4">
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
      </div>
    </>
  )
}