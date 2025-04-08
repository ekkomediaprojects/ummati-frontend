import React from 'react';
import DashboardNavItem from "./DashboardNavItem";

const DashboardNavBar = () => {
  return (
    <div className="hidden md:block w-full h-fit md:w-1/4 bg-[#1f1f1f] md:mx-7 pb-2 rounded-xl text-white px-6 pt-6 mb-3">
      <div className="text-xl p-4">Account</div>
      <hr />
      <div className="flex flex-col">
        <DashboardNavItem
          text="Account Details"
          href="/dashboard/accountdetails"
        />
        <DashboardNavItem
          text="Account Security"
          href="/dashboard/accountsecurity" 
        />
        
        <DashboardNavItem
          text="Membership Details"
          href="/dashboard/membershipdetails"
        />

        {/* Admin-only links */}
        {true && (
          <>
             <DashboardNavItem
                    text="Event Management"
                    href="/dashboard/eventmanagement"
                  />
                  <DashboardNavItem
                    text="Event Categories"
                    href="/dashboard/eventcategories"
                  />
                  <DashboardNavItem
                    text="Event Locations"
                    href="/dashboard/eventlocations"
                  />
                  <DashboardNavItem
                    text="User List"
                    href="/dashboard/userlist"
                  />
                  <DashboardNavItem
                    text="Bookings"
                    href="/dashboard/bookings"
                  />
                  <DashboardNavItem
                    text="Membership Management"
                    href="/dashboard/membershipmanagement"
                  />
                  <DashboardNavItem
                    text="Support Chat"
                    href="/dashboard/adminsupport"
                  />
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardNavBar;