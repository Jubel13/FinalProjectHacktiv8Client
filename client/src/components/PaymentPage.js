import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { apiClient, core } from "../API/midtrans"
import serverApi from '../API/serverApi'

export default function PaymentPage() {
  const [carDetail, setCarDetail] = useState({})

  const [quantity, setQuantity] = useState(1)
  const [buyerId, setBuyerId] = useState(1)
  const [notes, setNotes] = useState('')

  const [cardNumber, setCardNumber] = useState(0)
  const [cardExpMonth, setCardExpMonth] = useState(0)
  const [cardExpYear, setCardExpYear] = useState(0)
  const [cvv,setCvv] = useState(0)

  const [paymentMethod, setPaymentMethod] = useState('cash')

  const {carId} = useParams()

  const changeNote = (event) => {
    setNotes(event.target.value)
  }
 
  const changePaymentMethod = (event) => {
    // console.log(event.target.value);
    setPaymentMethod(event.target.value)
  }

  const changeCardNumber = (event) => {
    setCardNumber(event.target.value)
  }

  const changeCardExpMonth = (event) => {
    setCardExpMonth(event.target.value)
  }

  const changeCardExpYear = (event) => {
    setCardExpYear(event.target.value)
  }

  const changeCvv = (event) => {
    setCvv(event.target.value)
  }


  useEffect(() => {
    serverApi.get(`/cars/${carId}`)
      .then(res => {
        setCarDetail(res.data)
      })
      .catch(err => console.log(err))
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


  const submitPaymentCash = () => {
    serverApi.post('/payments', {
      quantity,
      carId,
      notes
    }, {
      headers: {access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImlydmFuIiwiZW1haWwiOiJpcnZhbmpucjEwQGdtYWlsLmNvbSIsInBob25lTnVtYmVyIjoiMDg1Njc2Nzg4NjgiLCJhZGRyZXNzIjoiVGFuZ2VyYW5nIiwiaWF0IjoxNjQ3ODY0MDc1fQ.c837qSUbhghKGNHnOBlxsmIHKq0FxeOs2FqoVkyUA1I"}
    })
    .then(res => {
      console.log(res.data);
      window.snap.pay(res.data.token, {
        onSuccess: function(result){
          alert("payment success!"); console.log(result);
          apiClient.transaction.status('59c22bce-b428-472c-a52e-8b33677cda85')
            .then((resp) => {

              if (resp.transaction_status === 'settlement' || resp.transaction_status === 'capture') {
                serverApi.get('/payments/status?BuyerId='+buyerId)
                 .then(resp => console.log(resp,'====================get status'))
              }
              console.log(resp, '<<<<< STATUS >>>>>')
              
            })
            .catch(err => console.log(err.ApiResponse, '<<<<< ERROR STATUS >>>>>'))

         
          /* You may add your own implementation here /
          alert("payment success!"); console.log(result);
        },
        onPending: function(result){
          / You may add your own implementation here /
          alert("wating your payment!"); console.log(result);
        },
        onError: function(result){
          / You may add your own implementation here /
          alert("payment failed!"); console.log(result);
        },
        onClose: function(){
          / You may add your own implementation here */
          alert('you closed the popup without finishing the payment');
        }
      })
    })
    .catch(err => console.log(err))
  }

  const payload = {
    client_key: 'SB-Mid-client-yD7_B8N68TSAEE2y',
    card_number: '5211111111111117',
    card_cvv: '123',
    card_exp_month: '12',
    card_exp_year: '2025'
  }
  core.cardToken(payload)
  .then(resp => console.log(resp, '<<<<< CARD >>>>>'))
  .catch(err => console.log(err.ApiResponse, '<<<<< CARD ERROR >>>>>'))

  const submitPaymentCredit = () => {
    
  }

  return (
    <>
      <h1 className="font-bold text-xl my-5">Payment Page</h1>
      <div className="flex flex-row justify-center mx-32">
        <div className="w-2/6 my-4">
          <select className="select select-bordered w-full" onChange={changePaymentMethod} value={paymentMethod} defaultValue={paymentMethod}>
            <option value="cash">Cash</option>
            <option value="credit">Credit</option>
          </select>

          {
            paymentMethod === 'cash' ? 
              <div className="rounded-lg mt-10 bg-gray-100 p-3">
                  <span className="flex justify-start font-bold">Payment Method (CASH)</span>
                  <div className="flex flex-col items-start mt-10 mb-5">
                    <label className="font-semibold">Quantity <span className="text-red-600">*</span></label>
                    <input type="number" placeholder="Type here"  value="1" className="cash input input-sm input-bordered w-full max-w-xs" />
                  </div>
                  <hr />
                  <div className="flex flex-col items-start mb-5">
                    <label className="font-semibold">Car Id<span className="text-red-600">*</span></label>
                    <input type="number" placeholder="Type here" value={carId} className="cash input input-sm input-bordered w-full max-w-xs" />
                  </div>
                  <hr />
                  <div className="flex flex-col items-start mb-5">
                    <label className="font-semibold">Notes</label>
                    <textarea type="text" placeholder="Optional" onChange={changeNote} value={notes} className="cash textarea textarea-sm textarea-bordered w-full max-w-xs" />
                  </div>
                  <button onClick={() => submitPaymentCash()} className="btn btn-sm w-full my-5">Sumbit</button>
              </div> :

              <div className="rounded-lg mt-10 bg-gray-100 p-3">
                  <span className="flex justify-start font-bold">Payment Method (CREDIT)</span>
                  <div className="flex flex-col items-start mt-10 mb-5">
                    <label className="font-semibold">Card Number <span className="text-red-600">*</span></label>
                    <input onChange={changeCardNumber} value={cardNumber} type="number" placeholder="Type here" className="credit input input-sm input-bordered w-full" />
                  </div>
                  <hr />
                  <div className="flex flex-col items-start mb-5">
                    <label className="font-semibold">Card Expiry Month <span className="text-red-600">*</span></label>
                    <input onChange={changeCardExpMonth} value={cardExpMonth} type="number" placeholder="Type here"  className="credit input input-sm input-bordered w-full" />
                  </div>
                  <hr />
                  <div className="flex flex-col items-start mb-5">
                    <label className="font-semibold">Card Expiry Year <span className="text-red-600">*</span></label>
                    <input onChange={changeCardExpYear} value={cardExpYear} type="number" placeholder="Type here" className="credit input input-sm input-bordered w-full" />
                  </div>
                  <hr />
                  <div className="flex flex-col items-start mb-5">
                    <label className="font-semibold">Card Code(CVV) <span className="text-red-600">*</span></label>
                    <input onChange={changeCvv} value={cvv} type="number" placeholder="Type here" className="credit input input-sm input-bordered w-full" />
                  </div>
                  <button onClick={() => submitPaymentCredit()} className="btn btn-sm w-full my-5">Sumbit</button>
              </div>
          }

          
        </div>
      </div>
    </>
  )
}