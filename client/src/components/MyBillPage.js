import { useEffect, useState } from "react";
import serverApi from '../API/serverApi';
import {  TailSpin } from 'react-loader-spinner';

export default function MyBill() {
  const [boughtHistory, setBoughtHistory] = useState([]);

  const userId = localStorage.id
  useEffect(() => {
    serverApi.get(`/payments/status?BuyerId=${userId}`, {
      headers: {access_token: localStorage.access_token}
    })
      .then(res => {
        setBoughtHistory(res.data)
      })
      .catch(err => {
        console.log(err.response);
      })
  }, [])


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
        <div class="flex flex-col card bg-base-100 shadow-lg m-5 w-full mx-24">
          {
            boughtHistory.length ? boughtHistory.map(el => {
              return (
                <>
                  <div class="card-body mx-20">
                    <h2 className="card-title font-bold text-gray-800 mb-5">{el.carName}</h2>
                    <div className="flex flex-row justify-between w-full">
                      <span className="font-semibold text-slate-500">Submission Time</span>
                      <span className="font-bold text-slate-700">{el.boughtDate}</span>
                    </div>
                    <div className="flex flex-row justify-between w-full">
                      <span className="font-semibold text-slate-500">Total Installment</span>
                      <span className="font-bold text-slate-700">{el.totalInstallment}</span>
                    </div>
                    <div className="flex flex-row justify-between w-full">
                      <span className="font-semibold text-slate-500">Current Installment</span>
                      <span className="font-bold text-slate-700">{el.currentInstallment}</span>
                    </div>
                    <div className="flex flex-row justify-between w-full">
                      <span className="font-semibold text-slate-500">Status</span>
                      {
                        el.paidOff === true ? <span className="font-semibold bg-green-600 text-white rounded-md px-2">Already Paid</span> : <span className="font-semibold bg-red-600 text-white rounded-md px-2">Not Paid</span> 
                      }
                    </div>
                    <div className="flex flex-row justify-between w-full">
                      <span className="font-semibold text-slate-500">Order Id</span>
                      <span className="font-bold text-slate-700">{el.orderId}</span>
                    </div>
                  </div>
                  <hr />
                </>
              )
            }): <div className="flex justify-center"><TailSpin  color="#00BFFF" height={80} width={80} /></div>
          }
          <div className="flex justify-end m-8">
            <button onClick={() => nextPayment()} className="btn btn-sm">Next Payment</button>
          </div>
        </div>
      </div>
    </>
  )
}