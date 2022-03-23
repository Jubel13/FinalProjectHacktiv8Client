import { useEffect } from "react";
import serverApi from '../API/serverApi';

export default function MyBill() {


  useEffect(() => {
    serverApi.get('/payments/status', {
      headers: {access_token: localStorage.access_token}
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err.response);
      })
  })


  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js'; 
    //change this according to your client-key
    const myMidtransClientKey = 'SB-Mid-client-yD7_B8N68TSAEE2y'; 
   
    let scriptTag = document.createElement('script');
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute('data-client-key', myMidtransClientKey);
   
    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    }
  }, []);

  const nextPayment = () => {
    serverApi.post('/payments/credits/cars', {
      CarId: 1
    }, {
      headers: {access_token: localStorage.access_token}
    })
    .then(res => {
      console.log(res.data);
      window.snap.pay(res.data.token, {
        onSuccess: function(result){
          alert("payment success!"); console.log(result);
          alert('you closed the popup without finishing the payment');
        }
      })
    })
    .catch( err => {
      console.log(err.response);
    })
  }


  return (
    <>
      <div className="flex justify-center bg-slate-100">
        <div class="card lg:card-side bg-base-100 shadow-lg m-5 w-full mx-24">
          <div class="card-body mx-20">
            <h2 className="card-title mb-5">Car Name</h2>
            <div className="flex flex-row justify-between w-full">
              <span>Submission Time</span>
              <span>2022-03-23</span>
            </div>
            <div className="flex flex-row justify-between w-full">
              <span>Total Installment</span>
              <span>3 Month</span>
            </div>
            <div className="flex flex-row justify-between w-full">
              <span>Current Installment</span>
              <span>2</span>
            </div>
            <div className="flex flex-row justify-between w-full">
              <span>Order Id</span>
              <span>xxxxxxxxxxxxxxx</span>
            </div>
            <div className="flex flex-row justify-end w-full my-8">
              <button onClick={() => nextPayment()} className="btn btn-sm btn-outline">Next Payment</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}