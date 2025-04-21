import Button from "../../components/Button";
import { Tooltip } from "@mui/material";
import { SketchPicker } from "react-color";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import axios from "axios";

const EventCategoryItem = ({
  eventType,
  setError,
  refreshEventTypeList,
}) => {
  const [color, setColor] = useState(eventType.color);
  const deleteEventCategory = async (id) => {
    const response = await axios.post("/api/eventtype/delete", {
      id: id,
    });
    switch (response.data.status) {
      case 200:
        setError("");
        setTimeout(() => {
          refreshEventTypeList();
        }, 300);
        // refreshEventTypeList();
        return;
      case 402:
        setError("Invalid Event");
        return;
      case 401:
        setError("Invalid Event");
        return;
      default:
        setError("There was an error deleting the type");
        return;
    }
  };
  const [showColorPicker, setShowColorPicker] = useState(false);
  useEffect(() => {
    changeEventCategoryColor(eventType.id, color);
  }, [color]);

  const changeEventCategoryColor = async (id, color) => {
    const response = await axios.post("/api/eventtype/changecolor", {
      id: id,
      color: color,
    });
    switch (response.data.status) {
      case 200:
        setError("");
        refreshEventTypeList();
        setTimeout(() => {
          refreshEventTypeList();
        }, 300);
        // refreshEventTypeList();
        return;
      case 402:
        setError("Invalid Event");
        return;
      case 401:
        setError("Invalid Event");
        return;
      default:
        setError("There was an error deleting the type");
        return;
    }
  };
  return (
    <div className="w-full h-full bg-[#ffff] py-3 flex flex-col justify-center items-center text-center font-bold rounded-lg border-primary border-[1.5px] shadow-md">
      <div>{eventType.name}</div>
      <div className=" relative flex gap-1 items-center border-[1px] p-1 rounded-md">
        <button
          className="flex items-center"
          onClick={() => setShowColorPicker(!showColorPicker)}
        >
          <div
            style={{ backgroundColor: eventType.color }}
            className="w-4 h-4 rounded-full"
          ></div>
          <div className="text-sm font-normal flex gap-1 items-center">
            {" "}
            {eventType.color}
            <div className="border-[1px] rounded-full p-1">edit</div>
          </div>
        </button>

        {showColorPicker && (
          <SketchPicker
            color={color}
            onChange={(p) => {
              setColor(p.hex);
            }}
            className="absolute top-10 left-0"
          />
        )}
      </div>
      <Button
        type="button"
        className=" bg-transparent mt-3"
        onClick={() => {
          deleteEventCategory(eventType.id);
        }}
      >
        <Tooltip title="Delete" className="text-red-600">
          <DeleteIcon />
        </Tooltip>
      </Button>
    </div>
  );
};
export default EventCategoryItem;
