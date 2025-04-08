import AddEventSection from "../../../Dashboard/EventManagement/AddEventSection/AddEventSection";
// import { authOptions } from "@/components/Helper/nextAuthConst";
// import { getAllCities } from "@/prisma/city";
// import { getAllEventLocations } from "@/prisma/eventlocation";
// import { getAllEventTypes } from "@/prisma/eventtype";
// import { getAllStates } from "@/prisma/state";

// import { getServerSession } from "next-auth";

function getData() {
  // const session = await getServerSession(authOptions);
  // const cities = await getAllCities();
  // const states = await getAllStates();
  // const eventTypes = await getAllEventTypes();
  // return {
  //   session: session,
  //   eventTypes: eventTypes,
  //   cities,
  //   states,
  // };
  const session = {
    user: {
      id: "admin123",
      name: "Admin User",
      email: "admin@example.com",
      role: "admin",
    },
  };
  
  return {
    session,
    eventTypes: [
      {
        "id": "65a1b2c3d4e5f6a7b8c9d0e1",
        "name": "Conference",
        "color": "#3788d8",
        "createdAt": "2023-05-15T10:00:00Z",
        "updatedAt": "2023-05-15T10:00:00Z"
      },
      {
        "id": "65a1b2c3d4e5f6a7b8c9d0e2",
        "name": "Workshop",
        "color": "#ff5722",
        "createdAt": "2023-05-16T11:00:00Z",
        "updatedAt": "2023-05-16T11:00:00Z"
      },
      {
        "id": "65a1b2c3d4e5f6a7b8c9d0e3",
        "name": "Concert",
        "color": "#9c27b0",
        "createdAt": "2023-05-17T12:00:00Z",
        "updatedAt": "2023-05-17T12:00:00Z"
      }
    ],
    states: [
      {
        "id": "75b2c3d4e5f6a7b8c9d0e1f2",
        "name": "California",
        "symbol": "CA",
        "createdAt": "2023-01-10T09:00:00Z"
      },
      {
        "id": "75b2c3d4e5f6a7b8c9d0e1f3",
        "name": "New York",
        "symbol": "NY",
        "createdAt": "2023-01-11T10:00:00Z"
      },
      {
        "id": "75b2c3d4e5f6a7b8c9d0e1f4",
        "name": "Texas",
        "symbol": "TX",
        "createdAt": "2023-01-12T11:00:00Z"
      }
    ],
    cities: [
      {
        "id": "85c3d4e5f6a7b8c9d0e1f2g3",
        "name": "Los Angeles",
        "createdAt": "2023-02-01T12:00:00Z",
        "state": {
          id : "75b2c3d4e5f6a7br8c9d0e1f4"
        }  // California
      },
      {
        "id": "85c3d4e5f6a7b8c9d0e1f2g4",
        "name": "San Francisco",
        "createdAt": "2023-02-02T13:00:00Z",
        "state":{
          id : "75b2c3d4e5f6a47b8c9d0e1f4"
        },
      },
      {
        "id": "85c3d4e5f6a7b68c9d0e1f2g5",
        "name": "New York City",
        "createdAt": "2023-02-03T14:00:00Z",
        "state":{
          id : "75b2c3d4e5f06a7b8c9d0e1f4"
        },
      },
      {
        "id": "85c3d4e5f6a70b8c9d0e1f2g6",
        "name": "Austin",
        "createdAt": "2023-02-04T15:00:00Z",
        "state": {
          id : "75b2c3d4e5f06a7b8c9d0e1f4"
        } // Texas
      }
    ]
  }
}
export default  function AddEvent() {
  const { session, cities, states, eventTypes } = getData();
  console.log("eventTypes",eventTypes)
  return (
        <AddEventSection
          eventTypes={eventTypes}
          cities={cities}
          states={states}
        />
  );
}
