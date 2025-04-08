
import EventMangementSection from "../../Dashboard/EventManagement/EventMangementSection";

 function getData() {
  const session = {
    user: {
      id: "admin123",
      name: "Admin User",
      email: "admin@example.com",
      role: "admin",
    },
  };
  const events = [
    {
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
      eventType: {
        id: "1",
        name: "Conference",
        color: "#3788d8",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    },
    {
      id: "2",
      slug: "music-festival-2025",
      eventLink: "https://example.com/events/music-festival-2025",
      mapLink: "https://google.com/maps/abc",
      name: "Music Festival 2025",
      description: "A weekend full of live music, food, and fun.",
      quantity: 2000,
      price: 99.99,
      imageUrl: "https://example.com/music-festival.jpg",
      isActive: true,
      eventDate: new Date("2025-08-10T14:00:00.000Z"),
      createdAt: new Date(),
      updatedAt: new Date(),
      eventTypeId: "2",
      locationId: "2",
      cityId: "2",
      eventType: {
        id: "2",
        name: "Festival",
        color: "#ff5733",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    },
  ];
  
  // const session = await getServerSession(authOptions);
  // const events = await getAllEvents();
  return {
    session: session,
    events : events 
  };
}
export default function EventMangement() {
  const { session, events } = getData();
  console.log("events---" , events)
  return <EventMangementSection eventsData={events} />;
}
