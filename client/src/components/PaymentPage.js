export default function PaymentPage(params) {
  return (
    <>
      <h1 className="font-bold text-xl my-10">Payment Page</h1>
      <div className="flex flex-row justify-around mx-32">
        <div className="w-2/4 my-4">
          <h1 className="flex justify-start font-bold mb-5 text-gray-900">Billing Details</h1>
          <div className="flex flex-row mb-5 w-full">
            <div className="mr-20">
              <label className="flex justify-start">First Name <span className="text-red-600">*</span></label>
              <input type="text" placeholder="Type here" className="input input-sm input-bordered w-full" />
            </div >
            <div>
              <label className="flex justify-start">Last Name <span className="text-red-600">*</span></label>
              <input type="text" placeholder="Type here" className="input input-sm input-bordered w-full" />
            </div>
          </div>
          <div className="flex flex-col items-start mt-10 mb-5 ">
            <label className="font-semibold">Country <span className="text-red-600">*</span></label>
            <input type="text" placeholder="Type here" className="input input-sm input-bordered w-full" />
          </div>
          <div className="flex flex-col items-start mt-10 mb-5 ">
            <label className="font-semibold">Address <span className="text-red-600">*</span></label>
            <input type="text" placeholder="Type here" className="input input-sm input-bordered w-full" />
          </div>
          <div className="flex flex-col items-start mt-10 mb-5 ">
            <label className="font-semibold">Poscode <span className="text-red-600">*</span></label>
            <input type="number" placeholder="Type here" className="input input-sm input-bordered w-full" />
          </div>
          <div className="flex flex-col items-start mt-10 mb-5">
            <label className="font-semibold">Email Address <span className="text-red-600">*</span></label>
            <input type="email" placeholder="Type here" className="input input-sm input-bordered w-full" />
          </div>
          <div className="flex flex-col items-start mt-10 mb-5">
            <h1 className="font-semibold">Other Notes</h1>
            <textarea className="textarea textarea-bordered w-full" placeholder="Type her"></textarea>
          </div>
        </div>


        <div className="w-2/6 my-4">
          <h1 className="flex justify-start font-bold mb-4 text-gray-900">Your Order</h1>
          <div className="bg-gray-400 rounded-lg text-white font-bold">
            <div className="flex flex-row justify-between p-4">
              <span>Subtotal</span>
              <span>366.000.000</span>
            </div>
            <hr />
            <div className="flex flex-row justify-between p-4">
              <span>Promo</span>
              <span>10%</span>
            </div>
            <hr />
            <div className="flex flex-row justify-between p-4">
              <span>Total</span>
              <span>350.500.000</span>
            </div>
          </div>

          <div className="rounded-lg mt-10 bg-gray-100 p-3">
              <span className="flex justify-start font-bold">* Credit/Debit Card</span>
              <p className="flex justify-start">Once your order is complete, you will .....</p>
              <div className="flex flex-col items-start mt-10 mb-5">
                <label className="font-semibold">Card Number <span className="text-red-600">*</span></label>
                <input type="number" placeholder="Type here" className="input input-sm input-bordered w-full max-w-xs" />
              </div>
              <div className="flex flex-row justify-between mb-5">
                <div>
                  <label className="flex justify-start">Expiry Date <span className="text-red-600">*</span></label>
                  <input type="date" placeholder="Type here" className="input input-sm input-bordered w-full max-w-xs" />
                </div>
                <div>
                  <label className="flex justify-start">Card Code (CVC) <span className="text-red-600">*</span></label>
                  <input type="number" placeholder="Type here" className="input input-sm input-bordered w-full max-w-xs" />
                </div>
              </div>
              <hr />
              <div className="flex flex-row justify-between my-5">
                <i className="fa-solid fa-building-columns ml-5"></i>
                <a className="font-extrabold text-blue-600">BCA</a>
              </div>
              <hr />
              <button className="btn btn-sm w-full my-5">Sumbit</button>
          </div>
        </div>
      </div>
    </>
  )
}