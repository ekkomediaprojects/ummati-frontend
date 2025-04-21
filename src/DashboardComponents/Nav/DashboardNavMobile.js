"use client"

import { useState } from "react"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import DashboardNavItem from "./DashboardNavItem"

const DashboardNavMobile = ({ session }) => {
  const [expanded, setExpanded] = useState(false)

  // Close the accordion
  const handleClose = () => setExpanded(false)

  return (
    <div className="md:hidden mb-4">
      <Accordion
        expanded={expanded}
        onChange={() => setExpanded(!expanded)}
        className="bg-themeblack rounded-xl shadow-lg transition-all duration-300"
        sx={{
          "&.MuiPaper-root": {
            borderRadius: "12px",
            backgroundColor: "#1f1f1f",
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className="text-white" />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          className="!bg-themeblack"
          sx={{
            px: 2,
            py: 1,
            "&.Mui-expanded": {
              borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          <Typography sx={{ fontWeight: 600 }} className="text-white text-base">
            Account
          </Typography>
        </AccordionSummary>

        <AccordionDetails
          sx={{
            px: 2,
            py: 1.5,
            backgroundColor: "#1f1f1f",
          }}
        >
          <div className="flex flex-col space-y-2 border-l border-gray-700 pl-3 ml-1">
            <DashboardNavItem text="Account Details" href="/dashboard/accountdetails" onClick={handleClose} />

            {true && (
              <>
                <DashboardNavItem text="Event Management" href="/dashboard/eventmanagement" onClick={handleClose} />
                <DashboardNavItem text="Event Categories" href="/dashboard/eventcategories" onClick={handleClose} />
                <DashboardNavItem text="Event Locations" href="/dashboard/eventlocations" onClick={handleClose} />
                <DashboardNavItem text="User List" href="/dashboard/userlist" onClick={handleClose} />
                <DashboardNavItem text="Bookings" href="/dashboard/bookings" onClick={handleClose} />
                <DashboardNavItem text="Membership Management" href="/dashboard/membershipmanagement" onClick={handleClose} />
                <DashboardNavItem text="Support Chat" href="/dashboard/adminsupport" onClick={handleClose} />
              </>
            )}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default DashboardNavMobile
