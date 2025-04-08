"use client";
import { useState } from "react";
import DashboardNavItem from "./DashboardNavItem";
import {Accordion,AccordionDetails,AccordionSummary,Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const DashboardNavMobile = ({ session }) => {
  const [expanded, setExpanded] = useState(false);

  // if (session != null) {
    return (
      <div className="md:hidden">
        <Accordion
          expanded={expanded}
          onChange={() => setExpanded(!expanded)}
          className="bg-themeblack mb-7"
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className="text-white" />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            className="!bg-themeblack"
          >
            <Typography
              sx={{ width: "33%", flexShrink: 0 }}
              className="bg-themeblack text-white"
            >
              Account
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="flex flex-col">
              <DashboardNavItem
                text="Account Details"
                href="/dashboard/accountdetails"
              />
              <DashboardNavItem
                text="Account Security"
                href="/dashboard/accountsecuirty"
              />
              <DashboardNavItem text="Address" href="/dashboard/address" />

              <DashboardNavItem
                text="Membership Details"
                href="/dashboard/membershipdetails"
              />
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
          </AccordionDetails>
        </Accordion>
      </div>
    );
  // } else {
  //   return <div className="h-screen">Access Denied</div>;
  // }
};
export default DashboardNavMobile;
