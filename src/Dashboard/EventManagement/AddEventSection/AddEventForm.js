"use client";
import Button from "../../../components/Button";
import { Switch } from "@headlessui/react";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useNavigate } from "react-router-dom";
import { FormEvent, SetStateAction, useEffect, useState } from "react";
// import "react-datetime/css/react-datetime.css";
const AddEventForm = ({
  cities,
  states,
  eventTypes,
  setIsLoading,
}) => {
  const router = useNavigate();
  const [dateTime, setDateTime] = useState(dayjs(new Date()));
  const [name, setName] = useState("");
  const [eventLink, setEventLink] = useState("");
  const [mapLink, setMapLink] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(1);
  const [eventType, setEventType] = useState(eventTypes[0].id);
  const [active, setActive] = useState(true);
  const [image, setImage] = useState(null);
  const [city, setCity] = useState("");
  const [stateSelector, setstateSelector] = useState(cities[0].state.id);
  const [cityList, setCityList] = useState(cities);
  const [stateList, setStateList] = useState(states);
  const inputProps = {
    placeholder: "Date and time of event",
  };
  function replaceSpecialCharsAndSpaces(inputString) {
    // Replace special characters with blanks
    const stringWithoutSpecialChars = inputString.replace(/[^\w\s-]/g, " ");

    // Replace spaces with hyphens
    const stringWithHyphens = stringWithoutSpecialChars.replace(/\s+/g, "-");

    return stringWithHyphens.toLowerCase();
  }
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (dateTime === null) {
    //   setError("Please Enter a Date and Time");
    //   return;
    // } else {
    //   setError("");

    //   const slug = replaceSpecialCharsAndSpaces(name);
    //   let imgUrl = "";
    //   if (image) {
    //     // imgUrl = await uploadImage(image);
    //   } else {
    //     imgUrl = "";
    //   }
    //   if (imgUrl != "") {
    //     const event = await createEvent(
    //       slug,
    //       city,
    //       eventLink,
    //       mapLink,
    //       name,
    //       description,
    //       quantity,
    //       price,
    //       imgUrl,
    //       dateTime.toDate(),
    //       eventType
    //     );
    //     if (event === null) {
    //       setError("There was an issue creating the Event");
    //       setisLoading(false);
    //       return;
    //     } else {
    //       console.log("event.slug", event.slug);
    //       setisLoading(false);
    //       router.push("/events/" + event.slug);
    //     }
    //   } else {
    //     setError("There was an error uploading an image");
    //     setIsLoading(false);
    //   }
    // }
  };

  useEffect(() => {
    let newStateList= [];
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
      let newCityList= [];
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

  return (
    <div className="mt-3">
      {/* <PageLoader isLoading={isLoading} /> */}
      <form
        onSubmit={(e) => {
          // setisLoading(true);
          setIsLoading(true);
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
            onChange={(e) => setstateSelector(e.currentTarget.value)}
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
            {cityList.map((cityItem, index) => (
              <option key={index} value={cityItem.id}>
                {cityItem.name}
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
          <label htmlFor="image">Image</label>
          <input
            type="file"
            name="image"
            id=""
            required
            onChange={(e) =>
              setImage(e.currentTarget.files ? e.currentTarget.files[0] : null)
            }
          />
        </div>
        {error != "" && <div className="text-red-600">{error}</div>}
        <Button type="submit" className="mb-10 mt-4 rounded-full font-bold">
          Add Event
        </Button>
      </form>
    </div>
  );
};
export default AddEventForm;
