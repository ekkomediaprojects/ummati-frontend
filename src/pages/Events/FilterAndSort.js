import React, { useState } from "react";
import { Box, Button, Drawer, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // Close icon

import CheckTwoToneIcon from "@mui/icons-material/CheckTwoTone";

const FilterAndSort = ({ onFilterChange, onSortingChange }) => {
  const [isSortingOpen, setSortingOpen] = useState(false);
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedSort, setSelectedSort] = useState(['all-events']);

  const toggleFilterDrawer = (open) => () => {
    setFilterOpen(open);
  };
  const toggleSortingDrawer = (open) => () => {
    setSortingOpen(open);
  };

  const handleSortSelect = (slug) => {
   
    setSelectedSort([slug]);  
    onSortingChange(slug); 
  };
  
  const handleFilterSelect = (filter) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = prevFilters.includes(filter)? prevFilters.filter((item) => item !== filter) : [...prevFilters, filter];
      onFilterChange(updatedFilters);
      return updatedFilters;
    });
  };

  return (
    <>
      {/* Buttons */}
      <Box
        sx={{
          width: { xs: "100%", md: "80%" },
          backgroundColor: "white",
          display: "flex",
          height: "50px",
          justifyContent: "space-between",
        }}
      >
        <Button
          sx={{
            fontFamily: "Quicksand",
            fontWeight: "700",
            backgroundColor: "#FFF",
            color: "#000",
            textTransform: "none",
            width: "250px",
            fontSize: "14px",
            borderRight: "1px solid #C4BAA2",
            borderRadius: "0",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
          onClick={toggleFilterDrawer(true)}
        >
          Filter
        </Button>
        <Button
          sx={{
            fontFamily: "Quicksand",
            fontWeight: "700",
            backgroundColor: "#FFF",
            color: "#000",
            textTransform: "none",
            width: "250px",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
          onClick={toggleSortingDrawer(true)}
        >
          Sort By
        </Button>
      </Box>

      {/* Filter Drawer */}
      <Drawer
        anchor="bottom"
        open={isFilterOpen}
        onClose={toggleFilterDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            height: "207px",
            backgroundColor: "#F7F5EF",
            border: "1px solid #C4BAA2",
          },
        }}
      >
        {/* Header with title and close icon */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Quicksand",
              fontWeight: "700",
              fontSize: "20px",
              textAlign: "center",
              lineHeight: "25px",
              marginLeft: "20px",
              flex: 1,
            }}
          >
            Filters
          </Typography>
          <IconButton onClick={toggleFilterDrawer(false)}>
            <CloseIcon sx={{ fontSize: "20px" }} />
          </IconButton>
        </Box>

        {/* Divider line */}
        <Box
          sx={{
            borderBottom: "1px solid #C4BAA2",
            marginBottom: "5px",
          }}
        />

        {/* Filter List (Column layout) */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2px",
            height: "100%",
          }}
        >
          {[
            { slug: "little-rock-ar", key: "Little Rock, AR" },
            { slug: "fort-worth-tx", key: "Fort Worth, TX" },
            { slug: "houston-tx", key: "Houston, TX" },
            { slug: "dallas-tx", key: "Dallas, TX" },
          ].map((filter) => (
            <Box
              key={filter.slug} // Use slug as the unique key
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                gap: "20px",
                marginBottom: "10px",
              }}
              onClick={() => handleFilterSelect(filter.slug)} // Use slug for selection
            >
              <Typography
                sx={{
                  fontFamily: "Quicksand",
                  fontWeight: "700",
                  fontSize: "14px",
                }}
              >
                {filter.key} {/* Use the key for display */}
              </Typography>
              {selectedFilters.includes(filter.slug) && (
                <CheckTwoToneIcon
                  sx={{
                    fontSize: "16px",
                    color: "black",
                  }}
                />
              )}
            </Box>
          ))}
        </Box>
      </Drawer>

      <Drawer
        anchor="bottom"
        open={isSortingOpen}
        onClose={toggleSortingDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            height: "227px",
            backgroundColor: "#F7F5EF",
            border: "1px solid #C4BAA2",
          },
        }}
      >
        {/* Header with title and close icon */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Quicksand",
              fontWeight: "700",
              fontSize: "20px",
              textAlign: "center",
              lineHeight: "25px",
              marginLeft: "20px",
              flex: 1,
            }}
          >
            Filters
          </Typography>
          <IconButton onClick={toggleSortingDrawer(false)}>
            <CloseIcon sx={{ fontSize: "20px" }} />
          </IconButton>
        </Box>

        {/* Divider line */}
        <Box
          sx={{
            borderBottom: "1px solid #C4BAA2",
            marginBottom: "5px",
          }}
        />

        {/* Filter List (Column layout) */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2px",
            height: "100%",
          }}
        >
          {[
            { slug: "date-new-to-old", key: "Date, New to Old" },
            { slug: "date-old-to-new", key: "Date, Old to New" },
            { slug: "upcoming-events", key: "Upcoming Events" },
            { slug: "past-events", key: "Past Events" },
            { slug: "all-events", key: "All Events" },
          ].map((filter) => (
            <Box
              key={filter.slug}
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                gap: "20px",
                marginBottom: "10px",
              }}
              onClick={() => handleSortSelect(filter.slug)} // Handle selection
            >
              <Typography
                sx={{
                  fontFamily: "Quicksand",
                  fontWeight: "700",
                  fontSize: "14px",
                }}
              >
                {filter.key}
              </Typography>
              {selectedSort.includes(filter.slug) && (
                <CheckTwoToneIcon
                  sx={{
                    fontSize: "16px",
                    color: "black",
                  }}
                />
              )}
            </Box>
          ))}
        </Box>
      </Drawer>

      {/* // Sorting */}
    </>
  );
};

export default FilterAndSort;
