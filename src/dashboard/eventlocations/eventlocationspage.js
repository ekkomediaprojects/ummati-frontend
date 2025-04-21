import EventLocationSection from "../../DashboardComponents/EventLocations/EventLocationSection";
// import { authOptions } from "@/components/Helper/nextAuthConst";
// import { getAllCities } from "@/prisma/city";
// import { getAllStates } from "@/prisma/state";

 function getData() {
  // const session = await getServerSession(authOptions);
  // const cities = await getAllCities();
  // const states = await getAllStates();
  return {
    session: true,
    cities : [],
    states : [{id : "1", name :"texas"}],
  };
}
export default function EventLocations() {
  const { session, cities, states } = getData();
  return (
     <EventLocationSection cities={cities} states={states} />
  );
}
