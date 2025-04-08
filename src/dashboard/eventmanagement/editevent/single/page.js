import EditEventSection from "../../../../Dashboard/EventManagement/EditEventSection/EditEventSection";
// import { authOptions } from "@/components/Helper/nextAuthConst";
// import NotFoundPage from "@/components/NotFoundPage";
// import { getAllCities } from "@/prisma/city";
// import { getEventByID } from "@/prisma/event";
// import { getAllEventLocations } from "@/prisma/eventlocation";
// import { getAllEventTypes } from "@/prisma/eventtype";
// import { getAllStates } from "@/prisma/state";

// import { getServerSession } from "next-auth";/

async function getData() {
  const session = {
    user: {
      id: "admin123",
      name: "Admin User",
      email: "admin@example.com",
      role: "admin",
    },
  };
  const eventLocations = [
    {
      id: "1",
      name: "Conference Hall A",
      createdAt: new Date(),
      cityId: "1",
      city: {
        id: "1",
        name: "New York",
        stateId: "1",
        state: {
          id: "1",
          name: "New York",
          symbol: "NY",
          createdAt: new Date(),
        },
      },
    },
    {
      id: "2",
      name: "Event Space B",
      createdAt: new Date(),
      cityId: "2",
      city: {
        id: "2",
        name: "San Francisco",
        stateId: "2",
        state: {
          id: "2",
          name: "California",
          symbol: "CA",
          createdAt: new Date(),
        },
      },
    },
  ];

  const eventTypes = [
    {
      id: "1",
      name: "Conference",
      color: "#3788d8",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      name: "Workshop",
      color: "#ff5733",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const event = {
    id: "1",
    slug: "tech-conference-2025",
    eventLink: "https://example.com/events/tech-conference-2025",
    mapLink: "https://google.com/maps/xyz",
    name: "Tech Conference 2025",
    description: "A tech conference showcasing the latest innovations in the tech world.",
    quantity: 500,
    price: 199.99,
    imageUrl: "https://example.com/image.jpg",
    isActive: true,
    eventDate: new Date("2025-06-15T10:00:00.000Z"),
    createdAt: new Date(),
    updatedAt: new Date(),
    eventTypeId: "1",
    locationId: "1",
    cityId: "1",
    eventType: eventTypes[0],
    location: eventLocations[0],
    city: eventLocations[0].city,
  };
  
  const cities = [
    {
      id: "1",
      name: "New York",
      createdAt: new Date(),
      stateId: "1",
      state: {
        id: "1",
        name: "New York",
        symbol: "NY",
        createdAt: new Date(),
      },
    },
    {
      id: "2",
      name: "San Francisco",
      createdAt: new Date(),
      stateId: "2",
      state: {
        id: "2",
        name: "California",
        symbol: "CA",
        createdAt: new Date(),
      },
    },
  ];

  const states = [
    {
      id: "1",
      name: "New York",
      symbol: "NY",
      createdAt: new Date(),
    },
    {
      id: "2",
      name: "California",
      symbol: "CA",
      createdAt: new Date(),
    },
  ];
  
  
  
  // const session = await getServerSession(authOptions);
  // const eventLocations = await getAllEventLocations();
  // const cities = await getAllCities();
  // const states = await getAllStates();
  // const eventTypes = await getAllEventTypes();
  // const event = await getEventByID(eventid);
  return {
    session,
    eventLocations: eventLocations,
    eventTypes: eventTypes,
    event,
    cities,
    states,
  };
}
export default function EditEvent({
  params,
}) {
  const { session, eventLocations, eventTypes, event, cities, states } =
     getData(params.eventid);
  // return session != null && event != null ? (
   return <EditEventSection
      event={event}
      eventLocations={eventLocations}
      eventTypes={eventTypes}
      cities={cities}
      states={states}
    />
  // ) : (
  //   // <NotFoundPage />
  // );
}
