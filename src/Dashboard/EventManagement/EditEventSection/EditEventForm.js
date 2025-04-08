"use client";
import React, { FormEvent, useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import {useNavigate} from 'react-router-dom';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { Switch } from "@headlessui/react";
import Button from "../../../components/Button";
import {Link} from "@mui/material";

import axios from "axios";


const EditEventForm = ({
  eventData,
  eventLocations,
  eventTypes,
  cities,
  states,
}) => {
  const [cityList, setCityList] = useState(cities);
  const [stateSelector, setStateSelector] = useState(cities[0].state.id);
  const [stateList, setStateList] = useState(states);
  const [event, setEvent] = useState(eventData);
  const [dateTime, setDateTime] = useState(
    dayjs(eventData.eventDate)
  );
  const [name, setName] = useState(eventData.name);
  const [eventLink, setEventLink] = useState(eventData.eventLink);
  const [mapLink, setMapLink] = useState(eventData.mapLink);
  const [description, setDescription] = useState(eventData.description);
  const [quantity, setQuantity] = useState(
    eventData.quantity ? eventData.quantity : 0
  );
  const [price, setPrice] = useState(eventData.price);
  const [eventType, setEventType] = useState(eventData.eventTypeId);
  const [city, setCity] = useState(eventData.cityId);
  const [active, setActive] = useState(eventData.isActive);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const inputProps = {
    placeholder: "Date and time of event",
  };
  const navigate = useNavigate();

  const getEventData = async () => {
    // const event = await getEventById(eventData.id);
    // if (event != null) {
    //   setEvent(event);
    // }
  };
  useEffect(() => {
    getEventData();
    let newStateList = [];
    cities.map((cityItem) => {
      let alreadyAdded = false;
      newStateList.map((newState) => {
        if (newState.id === cityItem.state.id) {
          alreadyAdded = true;
        }
      });
      if (!alreadyAdded) {
        newStateList.push(cityItem.state);
      }
    });
    setStateList(newStateList);
  }, []);

  useEffect(() => {
    if (stateSelector === "") {
      setCityList(cities);
    } else {
      let newCityList = [];
      cityList.map((cityitem) => {
        if (cityitem.stateId === stateSelector) {
          newCityList.push(cityitem);
        }
      });
      if (newCityList.length <= 0) {
        setCity("");
      }
      setCityList(newCityList);
    }
  }, [stateSelector]);

  useEffect(() => {
    if (event) {
      setDateTime(dayjs(event.eventDate));
      setName(event.name);
      setEventLink(event.eventLink);
      setMapLink(event.mapLink);
      setDescription(event.description);
      setQuantity(event.quantity ? event.quantity : 0);
      setPrice(event.price);
      setEventType(event.eventTypeId);
      setCity(event.cityId);
      setActive(event.isActive);
    }
  }, [event]);

  async function handleSubmit(e) {
    e.preventDefault();
    // if (dateTime === null) {
    //   setError("Please Enter a Date and Time");
    //   return;
    // } else {
    //   setError("");
    // }
    // if (city === "") {
    //   setError("Please select a valid city");
    //   return;
    // } else {
    //   setError("");
    // }

    // const slug = replaceSpecialCharsAndSpaces(name);
    // if (!event) {
    //   setError("There was an issue updating the event");
    //   return;
    // } else {
    //   let imgUrl = event.imageUrl || "";
    //   if (image) {
    //     // imgUrl = await uploadImage(image);
    //   }

    //   if (imgUrl !== "") {
    //     const updatedEvent = await updateEvent(
    //       event.id, // Pass the event ID for updating the specific event
    //       slug,
    //       city,
    //       eventLink,
    //       mapLink,
    //       name,
    //       description,
    //       quantity,
    //       price,
    //       // imgUrl,
    //       dateTime.toDate(),
    //       eventType,
    //       active
    //     );

    //     if (updatedEvent === null) {
    //       setError("There was an issue updating the Event");
    //       setIsLoading(false);
    //     } else {
    //       console.log("event.slug", updatedEvent.slug);
    //       setIsLoading(false);
    //       navigate("/dashboard/eventmanagement");
         
    //     }
    //   } else {
    //     setError("There was an error uploading an image");
    //   }
    // }
  }

  async function handleDeleteEvent(id) {
    const resp = await axios.get("/api/events/delete/" + id);
    if (resp.data.status === 200) {
      setIsLoading(false);
      navigate("/dashboard/eventmanagement");
    } else {
      setError("Could Not delete");
      setIsLoading(false);
    }
  }

  // Function to replace special characters and spaces
  function replaceSpecialCharsAndSpaces(inputString) {
    // Replace special characters with blanks
    const stringWithoutSpecialChars = inputString.replace(/[^\w\s-]/g, " ");

    // Replace spaces with hyphens
    const stringWithHyphens = stringWithoutSpecialChars.replace(/\s+/g, "-");

    return stringWithHyphens.toLowerCase();
  }

  return (
    <div className="mt-3">
      {/* <PageLoader isLoading={isLoading} /> */}
      <form
        onSubmit={(e) => {
          // setisLoading(true);
          handleSubmit(e);
        }}
        action=""
        className="grid grid-cols-2 gap-4"
      >
        <div>
          <p className="mb-2">Date and Time</p>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              value={dateTime}
              onChange={(value) => setDateTime(value)}
              // inputProps={inputProps}
            />
          </LocalizationProvider>
        </div>
        <div className="col-span-2">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id=""
            value={name}
            required
            onChange={(e) => setName(e.currentTarget.value)}
          />
        </div>
        <div>
          <label htmlFor="eventLink">Event Link</label>
          <input
            type="text"
            name="eventLink"
            id=""
            required
            value={eventLink}
            onChange={(e) => setEventLink(e.currentTarget.value)}
          />
        </div>
        <div>
          <label htmlFor="mapLink">Map Link</label>
          <input
            type="text"
            name="mapLink"
            id=""
            required
            value={mapLink}
            onChange={(e) => setMapLink(e.currentTarget.value)}
          />
        </div>
        <div className="col-span-2">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id=""
            required
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}
          />
        </div>
        <div>
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            name="quantity"
            id=""
            required
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.currentTarget.value))}
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            required
            id=""
            value={price}
            onChange={(e) => setPrice(parseFloat(e.currentTarget.value))}
          />
        </div>
        <div>
          <label htmlFor="eventType">Event Type</label>
          <select
            name="eventType"
            id=""
            required
            value={eventType}
            onChange={(e) => setEventType(e.currentTarget.value)}
            className="w-full border-[#e4e6eb] border-[1px] py-3 mt-2 focus:border-black px-2"
          >
            {eventTypes.map((type, index) => (
              <option key={index} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="state">State</label>
          <select
            name="state"
            id=""
            required
            value={stateSelector}
            onChange={(e) => setStateSelector(e.currentTarget.value)}
            className="w-full border-[#e4e6eb] border-[1px] py-3 mt-2 focus:border-black px-2"
          >
            {stateList.map((state, index) => (
              <option key={index} value={state.id}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="city">City</label>
          <select
            name="city"
            id=""
            required
            value={city}
            onChange={(e) => setCity(e.currentTarget.value)}
            className="w-full border-[#e4e6eb] border-[1px] py-3 mt-2 focus:border-black px-2"
          >
            {cityList.map((location, index) => (
              <option key={index} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-2 flex gap-2">
          <div>Active?</div>
          <Switch
            checked={active}
            onChange={setActive}
            className={`${active ? "bg-[#00acac]" : "bg-gray-600"}
          relative inline-flex h-[25px] w-[50px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <span className="sr-only">Active</span>
            <span
              aria-hidden="true"
              className={`${active ? "translate-x-[25px]" : "translate-x-0"}
            pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>
        </div>
        <div className="col-span-2 mb-2">
          <label htmlFor="image">
            Image : <Link href={event.imageUrl}>Original Image</Link>
          </label>
          <input
            type="file"
            name="image"
            id=""
            onChange={(e) =>
              setImage(e.currentTarget.files ? e.currentTarget.files[0] : null)
            }
          />
        </div>
        {error != "" && <div className="text-red-600">{error}</div>}
        <Button type="submit" className="mb-10 mt-4 rounded-full font-bold">
          Update Event
        </Button>
        <Button
          type="button"
          className="mb-10 mt-4 !bg-red-600 !text-white rounded-full font-bold"
          onClick={() => {
            setIsLoading(true);
            handleDeleteEvent(event.id);
          }}
        >
          Delete Event
        </Button>
      </form>
    </div>
  );
};

export default EditEventForm;
