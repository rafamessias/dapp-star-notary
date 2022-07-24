import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import CreateStar from "./CreateStar";
import InfoStar from "./InfoStar";
import Swap from "./Swap";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ py: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

export default function Index() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        pt: 3,
        display: "flex",
        justifyContent: "center",
      }}>
      <Box sx={{ width: { xs: "340px", sm: "480px" } }}>
        <Box>
          <Box>
            <Tabs value={value} onChange={handleChange} centered>
              <Tab label="Register" {...a11yProps(0)} />
              <Tab label="Infos" {...a11yProps(1)} />
              <Tab label="Swap" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <CreateStar />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <InfoStar />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Swap />
          </TabPanel>
        </Box>
      </Box>
    </Box>
  );
}
