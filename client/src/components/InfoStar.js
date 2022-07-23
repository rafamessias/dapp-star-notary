import {
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useEth } from "../contexts/EthContext";
import ReturnMsg from "./utils/ReturnMsg";

export default function InfoStar() {
  const [starId, setStarId] = useState(0);
  const [tokenIdToStarInfoResult, setTokenIdToStarInfoResult] = useState("");
  const [tokenIdToStarInfoError, setTokenIdToStarInfoError] = useState("");

  const [starsForSaleResult, setStarsForSaleResult] = useState("");
  const [starsForSaleError, setStarsForSaleError] = useState("");

  const [ownerOfResult, setOwnerOfResult] = useState("");
  const [ownerOfError, setOwnerOfError] = useState("");

  //get contract and accounts to perform the transactions
  const {
    connectWallet,
    state: { contract, web3 },
  } = useEth();

  const tokenIdToStarInfo = async (_starId) => {
    //if wallet not connected, go and request the connection
    if (!contract) {
      connectWallet();
      return;
    }

    try {
      const starIdEnc = web3.utils.toBN(_starId);
      const transaction = await contract.methods
        .tokenIdToStarInfo(starIdEnc.toString())
        .call();

      setTokenIdToStarInfoResult(`Star Name: ${transaction}`);
    } catch (error) {
      setTokenIdToStarInfoError(error.message);
    }
  };

  const starsForSale = async (_starId) => {
    //if wallet not connected, go and request the connection
    if (!contract) {
      connectWallet();
      return;
    }

    try {
      const starIdEnc = web3.utils.toBN(_starId);
      const transaction = await contract.methods
        .starsForSale(starIdEnc.toString())
        .call();

      console.log(web3.utils.fromWei(transaction, "ether"));

      setStarsForSaleResult(
        transaction !== "0"
          ? `Star Price: ${web3.utils.fromWei(transaction, "ether")} ETH`
          : "Star not for Sale"
      );
    } catch (error) {
      setStarsForSaleError(error.message);
    }
  };

  const ownerOf = async (_starId) => {
    //if wallet not connected, go and request the connection
    if (!contract) {
      connectWallet();
      return;
    }

    try {
      const starIdEnc = web3.utils.toBN(_starId);
      const transaction = await contract.methods
        .ownerOf(starIdEnc.toString())
        .call();

      setOwnerOfResult(
        transaction !== "0" ? `Owner: ${transaction}` : "Star not for Sale"
      );
    } catch (error) {
      setOwnerOfError(error.message);
    }
  };

  return (
    <Paper elevation={2} sx={{ py: 2, px: 4 }}>
      <Box>
        <Typography variant="h4" sx={{ color: "white" }}>
          Get Star info by Token ID
        </Typography>

        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Star Id"
              value={starId}
              type="number"
              onChange={(e) => setStarId(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={() => tokenIdToStarInfo(starId)}>
              Get info
            </Button>
          </Grid>
          <Grid item sx={{ mt: 1, minHeight: "45px" }}>
            <ReturnMsg
              trxError={tokenIdToStarInfoError}
              trxResult={tokenIdToStarInfoResult}
              funcType="call"
            />
          </Grid>
        </Grid>
      </Box>
      <Divider sx={{ my: 2 }} />

      <Box>
        <Typography variant="h4" sx={{ color: "white" }}>
          Get Stars For Sale
        </Typography>

        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Star Id"
              value={starId}
              type="number"
              onChange={(e) => setStarId(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={() => starsForSale(starId)}>
              Is for Sale?
            </Button>
          </Grid>
          <Grid item sx={{ mt: 1, minHeight: "45px" }}>
            <ReturnMsg
              trxError={starsForSaleError}
              trxResult={starsForSaleResult}
              funcType="call"
            />
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box>
        <Typography variant="h4" sx={{ color: "white" }}>
          Owner Of
        </Typography>

        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Star Id"
              value={starId}
              type="number"
              onChange={(e) => setStarId(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={() => ownerOf(starId)}>
              who's the owner?
            </Button>
          </Grid>
          <Grid item sx={{ mt: 1, minHeight: "45px", height: "45px" }}>
            <ReturnMsg
              trxError={ownerOfError}
              trxResult={ownerOfResult}
              funcType="call"
            />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
