import AccountSecurityForm from "../../DashboardComponents/AccountSecurity/AccountSecurityForm";
// import { authOptions } from "@/components/Helper/nextAuthConst";
// import { getServerSession } from "next-auth";

// async function getData() {
//   const session = await getServerSession(authOptions);
//   return {
//     session: session,
//   };
// }
export default function AccountSecurity() {
  const  session  = true

  return (
    session != null && (
      <div className=" text-themeblack md:w-3/4 mb-3">
        <div className="text-base font-medium">Account Security</div>
        <hr className="mt-1" />
        <AccountSecurityForm session={session} />
      </div>
    )
  );
}
