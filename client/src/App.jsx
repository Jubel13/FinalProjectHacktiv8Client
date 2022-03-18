import Dropdown from "./components/navbar/organisms/Dropdown"

export default function App() {
  return (
    <div className="App">
      <div className="w-full min-h-screen px-36 bg-slate-100">
        {/* NAVBAR */}
        <div className="w-full h-16 flex flex-row justify-between text-slate-900">
          <div className="w-1/4 h-full font-bold font-open-sans text-xl flex justify-start items-center">
            LOGO
          </div>
          <div className="w-1/2 h-full flex flex-row gap-x-8 justify-center items-center text-xl">
            <button className="h-full font-bold font-open-sans hover:border-b hover:border-orange-600">
              Home
            </button>
            <button className="h-full font-bold font-open-sans hover:border-b hover:border-orange-600">
              Browse Car
            </button>
            <button className="h-full font-bold font-open-sans hover:border-b hover:border-orange-600">
              Sell Car
            </button>
          </div>
          <div className="h-full w-1/4 flex flex-row gap-x-8 justify-end items-center text-xl">
            <button className="h-full font-bold font-open-sans hover:border-b hover:border-orange-600">
              Login
            </button>
            <button className="h-full font-bold font-open-sans hover:border-b hover:border-orange-600">
              register
            </button>
            <Dropdown />
          </div>
        </div>
        {/* END NAVBAR */}
        {/* DASHBOARD */}
        <div className="my-12 h-[40rem] w-fu flex flex-row relative z-0">
          <div className="h-full w-1/2 flex flex-col text-left font-open-sans">
            <p className="mt-24 text-6xl">The best classic car</p>
            <p className="text-6xl font-bold">All in one place</p>
            <div className="w-full z-50 mt-12 h-16 rounded-xl ml-36 drop-shadow-2xl">
              <form className="w-full h-full flex flex-row rounded-xl">
                <input
                  type="text"
                  className="w-9/12 h-full text-xl pl-6 bg-white rounded-l-xl"
                  placeholder="Search by brand/model"
                />
                <button className="w-3/12 h-full bg-orange-600 hover:bg-orange-500 rounded-r-xl text-xl text-white font-open-sans font-bold">
                  Submit
                </button>
              </form>
            </div>
          </div>
          <div className="h-full w-1/2 flex justify-center items-center">
            <img src="https://hips.hearstapps.com/toc.h-cdn.co/assets/16/14/3200x1600/landscape-1459816624-1954-mercedes-300sl-gullwing-a.jpg?resize=980:*" alt="homeScreen" className="object-cover h-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
