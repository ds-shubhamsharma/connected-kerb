import * as React from "react";
import { useState, useEffect } from "react";
import {
  ecoMovementToken,
  ecoMovementApiUrl,
  Cross,
} from "../../../sites-global/global";
import Modal from "react-modal";
import { StaticData } from "../../../sites-global/staticData";
import charging from "../../images/charging-station.svg";
import ok from "../../images/okStatus.svg";
const ChargeStatus = (props: any) => {

  const { id } = props;
  const [evsesData, setEvsesData] = useState([]);
  const [evsesAvailableData, setEvsesAvailableData] = useState([]);
  const [callInterval, setCallInterval] = useState(1);
  useEffect(() => {
    const interval = setInterval(() => {
      getChargeStatus(id).then((res) => {
        if (res.status_code == 1000) {
          // console.log(res.data.evses, "done");
          setEvsesData(res.data.evses);

          let availables: any = [];
          res.data.evses?.forEach((item: any, i: Number) => {
            if (item.status == "AVAILABLE") {
              availables.push(item);
            }
          });
          setEvsesAvailableData(availables);
        } else {
        }
      });
    }, callInterval);
    setCallInterval(5000);
    return () => {
      clearInterval(interval);
    };
  });




  function getChargeStatus(id: any) {

    let url = ecoMovementApiUrl + id + "?limit=1&offset=0";

    return fetch(url, {
      headers: {
        Authorization: "Token " + ecoMovementToken + "",
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data,'data')
        return data;
      })
      .catch((error) => { });
  }

  const evsesDivs = evsesData?.map((item: any, i: Number) => {
    return (
      <>
        <li className="px-6 py-2 border-b border-gray-200 last:border-b-0 w-full rounded-t-lg">
          <span>{StaticData.chargerId}</span> - <span>{item.uid}</span>
          <br />
          <span>{StaticData.Status}</span> - <span>{item.status}</span>
          <br />
          {/* <span>Capabilities</span> - <span>{item.capabilities?.join()} </span> */}
        </li>
      </>
    );
  });

  // function opentime(e: any) {
  //   let closethis = e.target.closest(".evses-divs");
  //   if (closethis.querySelector(".evses-ul").classList.contains("hidden")) {
  //     closethis.querySelector(".evses-ul").classList.remove("hidden");
  //   } else {
  //     closethis.querySelector(".evses-ul").classList.add("hidden");
  //   }
  // }



  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    document.body.classList.add("overflow-hidden");
    setIsOpen(true);
  }
  function closeModal() {
    document.body.classList.remove("overflow-hidden");
    setIsOpen(false);
  }

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  return (
    <>
      <div className="flex flex-col evses-divs">

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
            <span>{StaticData.chargerId}</span> - <span>01 </span>
            <br />
            <span>{StaticData.Status}</span> - <span>charging</span>
          <a
            onClick={closeModal}
            type="button"
            id="closeButton"
            className="closeButton bg-closeIcon bg-no-repeat bg-center w-7 h-7 bg-[length:48px]"
          >
            <div dangerouslySetInnerHTML={{ __html: Cross }} />
          </a>


          

        </Modal>

        <div onClick={openModal} className="flex items-center">
          <div className="icon">
            <img
              className="pr-2"
              src={charging}
              width="34"
              height="34"
              alt=""
            />
          </div>
          {evsesAvailableData.length > 0 ? (
            <>
              <span>
                {evsesAvailableData.length} {StaticData.Availability}
              </span>
              <img src={ok} className="px-2" alt="" />
            </>
          ) : (
            <>{StaticData.Unavailable}</>
          )}
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer ml-1"
            width="9.585"
            height="4.793"
            viewBox="0 0 9.585 4.793"
          >
            <path
              d="M9,13.5l4.793,4.793L18.585,13.5Z"
              transform="translate(-9 -13.5)"
            ></path>
          </svg> */}
        </div>
        <ul className="bg-white rounded-lg border border-gray-200 w-full text-gray-900 hidden evses-ul mt-1.5">
          {evsesDivs}
        </ul>
      </div>
    </>
  );
};

export default ChargeStatus;
