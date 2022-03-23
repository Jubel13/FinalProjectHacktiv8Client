import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { apiClient } from "../API/midtrans";
import serverApi from "../API/serverApi";
import picoModal from "picomodal";

export default function PaymentPage() {
  const [carDetail, setCarDetail] = useState({});

  const [quantity, setQuantity] = useState(1);
  const [buyerId, setBuyerId] = useState(1);
  const [notes, setNotes] = useState("");

  const [cardNumber, setCardNumber] = useState(0);
  const [cardExpMonth, setCardExpMonth] = useState(0);
  const [cardExpYear, setCardExpYear] = useState(0);
  const [cvv, setCvv] = useState(0);

  const [paymentMethod, setPaymentMethod] = useState("cash");

  const { carId } = useParams();

  const changeNote = (event) => {
    setNotes(event.target.value);
  };

  const changePaymentMethod = (event) => {
    // console.log(event.target.value);
    setPaymentMethod(event.target.value);
  };

  const changeCardNumber = (event) => {
    setCardNumber(event.target.value);
  };

  const changeCardExpMonth = (event) => {
    setCardExpMonth(event.target.value);
  };

  const changeCardExpYear = (event) => {
    setCardExpYear(event.target.value);
  };

  const changeCvv = (event) => {
    setCvv(event.target.value);
  };

  useEffect(() => {
    serverApi
      .get(`/cars/${carId}`)
      .then((res) => {
        setCarDetail(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = "SB-Mid-client-yD7_B8N68TSAEE2y";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const submitPaymentCash = () => {
    serverApi
      .post(
        "/payments",
        {
          quantity,
          carId,
          notes,
        },
        {
          headers: {
            access_token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImJ1eWVyIiwiZW1haWwiOiJidXllckBtYWlsLmNvbSIsInBob25lTnVtYmVyIjoiMDgxMjM0NTY3NDMzIiwiYWRkcmVzcyI6InNvbWVhZGRyZXNzIiwiaWF0IjoxNjQ4MDAyNzUyfQ.6hwhC2yJlx5wW3A1Crs6jSKeQpPdsZUo_1gqNqIbU2c",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        window.snap.pay(res.data.token, {
          onSuccess: function (result) {
            alert("payment success!");
            console.log(result);
            apiClient.transaction
              .status("59c22bce-b428-472c-a52e-8b33677cda85")
              .then((resp) => {
                if (
                  resp.transaction_status === "settlement" ||
                  resp.transaction_status === "capture"
                ) {
                  serverApi
                    .get("/payments/status?BuyerId=" + buyerId)
                    .then((resp) =>
                      console.log(resp, "====================get status")
                    );
                }
                console.log(resp, "<<<<< STATUS >>>>>");
              })
              .catch((err) =>
                console.log(err.ApiResponse, "<<<<< ERROR STATUS >>>>>")
              );

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
            alert("you closed the popup without finishing the payment");
          },
        });
      })
      .catch((err) => console.log(err));
  };

  const submitPaymentCredit = () => {
    const payload = {
      card_number: cardNumber.toString(),
      card_cvv: cvv.toString(),
      card_exp_month: cardExpMonth.toString(),
      card_exp_year: cardExpYear.toString(),
    };

    serverApi
      .post("/payments/token", payload)
      .then((resp) => {
        console.log(resp);
        const params = {
          token_id: resp.data.token_id,
          term: 3,
          dp: 50000000,
        };
        return serverApi.post("/payments/credits/" + carId, params, {
          headers: {
            access_token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImlydmFuIiwiZW1haWwiOiJpcnZhbmpucjEwQGdtYWlsLmNvbSIsInBob25lTnVtYmVyIjoiMDg1Njc2Nzg4NjgiLCJhZGRyZXNzIjoiVGFuZ2VyYW5nIiwiaWF0IjoxNjQ3OTc5NzI1fQ.XlEk1rtkuYkLF80OLVKvose8OgmJxvhgVhBQKi6_QsI",
          },
        });
      })
      .then((resp) => {
        console.log(resp, "<<<<< NEXT CARD >>>>>");
        var popupModal = (function () {
          var modal = null;
          return {
            openPopup(url) {
              modal = picoModal({
                content:
                  '<iframe frameborder="0" style="height:90vh; width:100%;" src="' +
                  resp.data.paymentUrl +
                  '"></iframe>',
                width: "75%",
                closeButton: false,
                overlayClose: false,
                escCloses: false,
              }).show();
            },
            closePopup() {
              try {
                modal.close();
              } catch (e) {}
            },
          };
        })();
        popupModal();
      })
      .catch((err) => console.log(err.ApiResponse, "<<<<< CARD ERROR >>>>>"));
  };

  return (
    <>
      <h1 className='flex justify-center font-bold text-xl my-3'>
        Payment Page
      </h1>
      <div className='flex flex-row justify-center mx-32'>
        <div className='w-2/6 my-4'>
          <select
            className='select select-bordered w-full'
            onChange={changePaymentMethod}
            value={paymentMethod}
            defaultValue={paymentMethod}
          >
            <option value='cash'>Cash</option>
            <option value='credit'>Credit</option>
          </select>

          {paymentMethod === "cash" ? (
            <div className='rounded-lg mt-6 bg-gray-100 p-4 relative'>
              <span className='flex justify-start font-bold'>
                Payment Method (CASH)
              </span>
              <div className='flex flex-col items-start mt-10 mb-5'>
                <label className='font-semibold my-3'>Car Name</label>
                <label>{carDetail.name}</label>
              </div>
              <hr />
              <div className='flex flex-col items-start mb-5'>
                <label className='font-semibold my-3'>Quantity</label>
                <span>{quantity}</span>
              </div>
              <hr />
              <div className='flex flex-col items-start mb-5'>
                <label className='font-semibold my-3'>Total Price</label>
                <span>
                  Rp.{" "}
                  {carDetail.price
                    ? carDetail.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                    : carDetail.price}
                </span>
              </div>
              <hr />
              <div className='flex flex-col items-start mb-5'>
                <label className='font-semibold my-3'>Notes (optional)</label>
                <textarea
                  type='text'
                  placeholder='Type here'
                  onChange={changeNote}
                  value={notes}
                  className='cash textarea textarea-sm textarea-bordered w-full'
                />
              </div>
              <button
                onClick={() => submitPaymentCash()}
                className='btn btn-sm w-full my-2'
              >
                Submit
              </button>
              <Link
                to={`/detail/${carDetail.id}`}
                className='btn btn-sm btn-error w-full md-5'
              >
                Cancel
              </Link>
            </div>
          ) : (
            <div className='rounded-lg mt-10 bg-gray-100 p-3'>
              <span className='flex justify-start font-bold'>
                Payment Method (CREDIT)
              </span>
              <div className='flex flex-col items-start mt-10 mb-5'>
                <label className='font-semibold'>
                  Card Number <span className='text-red-600'>*</span>
                </label>
                <input
                  onChange={changeCardNumber}
                  value={cardNumber}
                  type='number'
                  placeholder='Type here'
                  className='credit input input-sm input-bordered w-full'
                />
              </div>
              <hr />
              <div className='flex flex-col items-start mb-5'>
                <label className='font-semibold'>
                  Card Expiry Month <span className='text-red-600'>*</span>
                </label>
                <input
                  onChange={changeCardExpMonth}
                  value={cardExpMonth}
                  type='number'
                  placeholder='Type here'
                  className='credit input input-sm input-bordered w-full'
                />
              </div>
              <hr />
              <div className='flex flex-col items-start mb-5'>
                <label className='font-semibold'>
                  Card Expiry Year <span className='text-red-600'>*</span>
                </label>
                <input
                  onChange={changeCardExpYear}
                  value={cardExpYear}
                  type='number'
                  placeholder='Type here'
                  className='credit input input-sm input-bordered w-full'
                />
              </div>
              <hr />
              <div className='flex flex-col items-start mb-5'>
                <label className='font-semibold'>
                  Card Code(CVV) <span className='text-red-600'>*</span>
                </label>
                <input
                  onChange={changeCvv}
                  value={cvv}
                  type='number'
                  placeholder='Type here'
                  className='credit input input-sm input-bordered w-full'
                />
              </div>
              <button
                onClick={() => submitPaymentCredit()}
                className='btn btn-sm w-full my-2'
              >
                Submit
              </button>
              <Link
                to={`/detail/${carDetail.id}`}
                className='btn btn-sm btn-error w-full md-5'
              >
                Cancel
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
