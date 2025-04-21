
import Button from "../../components/Button";
import { Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditCity from "./EditCity";

const CityItem = ({
  city,
  deleteCity,
  refreshEventLocationsList,
  states,
}) => {
  return (
    <div className="relative w-full h-full bg-[#ffff] py-3 flex flex-col justify-center items-center text-center font-bold rounded-lg border-primary border-[1.5px] shadow-md">
      <div>
        {city?.name}, {city?.state?.symbol}
      </div>
      <Button
        type="button"
        className=" bg-transparent mt-3"
        onClick={() => {
          deleteCity(city?.id);
        }}
      >
        <Tooltip title="Delete" className="text-red-600">
          <DeleteIcon />
        </Tooltip>
      </Button>
      <EditCity
        cityData={city}
        stateList={states}
        refreshEventLocationsList={refreshEventLocationsList}
        className="bg-transparent absolute top-2 right-2 w-3 h-3"
      />
    </div>
  );
};
export default CityItem;
