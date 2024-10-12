import React from "react";
import { Box, Typography, Button } from "@mui/material";

const CountryCard = ({ countryName, countryIcon, price, link }) => {
  return (
    <Box
      sx={{
        p: "2px",
        overflow: "hidden",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
        },
        backgroundColor: "#fff",
      }}
    >
      <Box sx={{ padding: "16px" }}>
        <Box display="flex" alignItems="center" mb={2}>
          <Box
            sx={{
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              backgroundColor: "#f0f4f8",
              marginRight: "16px",
            }}
          >
            <img src={countryIcon} alt={`${countryName} Icon`} width="30px" />
          </Box>
          <Typography variant="h6" fontWeight="bold">
            {countryName}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body1" fontWeight="bold" color="textSecondary">
            Price starting from
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            {price}
          </Typography>
        </Box>
        <Button
          href={link}
          sx={{
            mt: 2,
            textTransform: "none",
            color: "#3f51b5",
            fontWeight: "bold",
          }}
        >
          View Details
        </Button>
      </Box>
    </Box>
  );
};

export default CountryCard;
