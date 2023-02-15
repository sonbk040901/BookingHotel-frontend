import React from "react";
import { FaCheck } from "react-icons/fa";
import { useState } from "react";
import "./RoomDetailModal.css";
import { toast } from "react-toastify";
const RoomDetailModal = (props) => {
  const [checkinDate, setCheckinDate] = useState();
  const [checkoutDate, setCheckoutDate] = useState();

  const showSuccessMessage = (message) => {
    toast.success(`${message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const showErrorMessage = (message) => {
    toast.error(`${message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const closeModalHandler = () => {
    console.log(props.roomInfo);
    props.onClose();
  };
  const checkinDateHandler = (e) => {
    setCheckinDate(e.target.value);
  };

  const checkoutDateHandler = (e) => {
    setCheckoutDate(e.target.value);
  };

  const bookRoomHandler = (e) => {
    e.preventDefault();
    const checkIn = checkinDate;
    const checkOut = checkoutDate;
    if (!localStorage.getItem("token")) {
      showErrorMessage("You need to login to perform this action!");
    }

    fetch(`http://localhost:5000/api/booking/${props.roomInfo._id}`, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },

      body: JSON.stringify({
        checkIn,
        checkOut,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          showSuccessMessage("Booking successfully");
          console.log(data.data);
          window.setTimeout(function () {
            window.location.href = "/booking-history";
          }, 2000);
        } else {
          console.log(data.message);
          showErrorMessage("An error occured! Booking failed");
        }
      });
  };

  return (
    <React.Fragment>
      <div className="modal">
        <button className="close-modal" onClick={closeModalHandler}>
          &times;
        </button>

        <img
          src={
            props.roomInfo.image
              ? props.roomInfo.image
              : require("../../img/double-room.jpg")
          }
          alt="room-img"
          className="room-preview"
        />

        <div className="room-detail-container">
          <h2 className="room-detail-title">{props.roomInfo.name}</h2>
          <div className="room-detail-info-container">
            <p className="room-description-paragraph">
              {props.roomInfo.description}
            </p>
            <div>
              <div className="people-number-detail-div">
                <p>
                  <strong>Max. number of persons: </strong>
                </p>
                <p className="adult-children-number">
                  {props.roomInfo.peopleAmount.adults} adults
                </p>
                <p className="adult-children-number">
                  {props.roomInfo.peopleAmount.child} children
                </p>
              </div>
              <div className="room-price-div">
                <p>
                  <strong>Price: </strong>
                </p>
                <p className="adult-children-number">
                  {props.roomInfo.price} VND
                </p>
              </div>
            </div>
          </div>
          <hr />
        </div>

        <div className="room-detail-container">
          <h2 className="room-detail-title">Special Services</h2>
          <div className="service-info-container">
            <p className="service-paragraph">
              <FaCheck />
              {"  "}King size beds x1
            </p>
            <p className="service-paragraph">
              <FaCheck /> {"  "}
              Extra bed in room for adult on request
            </p>
          </div>
        </div>
        <div
          className="checkin-checkout-container"
          id="modal--checkin-checkout-container"
        >
          <div className="checkin-checkout-wrapper">
            <label for="checkin">Checkin: </label>
            <input
              type="date"
              id="checkin"
              name="checkin"
              className="checkin-out-input"
              value={checkinDate}
              onChange={checkinDateHandler}
            />
          </div>
          <div className="checkin-checkout-wrapper">
            <label for="checkout">Checkout: </label>
            <input
              type="date"
              id="checkout"
              name="checkout"
              className="checkin-out-input"
              value={checkoutDate}
              onChange={checkoutDateHandler}
            />
          </div>
        </div>
        <div className="order-room-button-container">
          <button
            className="btn btn--green span-all-rows"
            id="order-room-button"
            onClick={bookRoomHandler}
          >
            Book now!
          </button>
        </div>
      </div>
      <div className="overlay" onClick={closeModalHandler}></div>
    </React.Fragment>
  );
};

export default RoomDetailModal;
