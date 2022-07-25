import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useEth } from "../../contexts/EthContext";
import truncateEthAddress from "truncate-eth-address";

export default function Header() {
  const {
    connectWallet,
    state: { accounts },
  } = useEth();

  const [account, setAccount] = useState();

  const getAccounts = useCallback(() => {
    if (accounts != null || accounts?.length > 0)
      return setAccount(truncateEthAddress(accounts[0]));
    return setAccount(null);
  }, [accounts]);

  useEffect(() => {
    if (window !== undefined) {
      if (window.ethereum.isConnected()) getAccounts();
    }
  }, [accounts, getAccounts]);

  return (
    <AppBar position="static" sx={{ height: "65px", px: 2 }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "inherit",
        }}>
        <Box
          sx={{
            minWidth: "280px",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <Typography variant="h3" component="div">
            Star Notary Daap
          </Typography>
          {account ? (
            <Button variant="outlined" size="small">
              {account}
            </Button>
          ) : (
            <Button
              variant="contained"
              size="small"
              onClick={() => connectWallet()}>
              Connect Wallet
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
