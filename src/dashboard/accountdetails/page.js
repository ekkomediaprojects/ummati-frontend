import AccountDetailsForm from "../../Dashboard/AccountDetails/AccountDetailsForm";
// import { authOptions } from "@/components/Helper/nextAuthConst";
// import { getServerSession } from "next-auth";
import React,{ FormEvent } from "react";

// async function getData() {
//   const session = await getServerSession(authOptions);
//   return {
//     session: session,
//   };
// }
export default function AccountDetails() {
  const session = true
  // await getData();

  return (
    session != null && (
      <div className=" text-themeblack md:w-3/4">
        <div className="text-base font-medium">Account Details</div>
        <hr className="mt-1" />
        <AccountDetailsForm session={session} />
      </div>
    )
  );
}
