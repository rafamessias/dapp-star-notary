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

export default function Swap() {
  const [starPrice, setStarPrice] = useState(0);
  const [starId, setStarId] = useState(0);
  const [putStarUpForSaleResult, setPutStarUpForSaleResult] = useState("");
  const [putStarUpForSaleError, setPutStarUpForSaleError] = useState("");

  const [buyStarResult, setBuyStarResult] = useState("");
  const [buyStarError, setBuyStarError] = useState("");

  //get contract and accounts to perform the transactions
  const {
    connectWallet,
    state: { contract, accounts, web3 },
  } = useEth();

  const account = !accounts ? "" : accounts[0];

  const putStarUpForSale = async (_starId, _starPrice) => {
    //if wallet not connected, go and request the connection
    if (!contract) {
      connectWallet();
      return;
    }

    try {
      const starIdEnc = web3.utils.toBN(_starId);
      const starPriceEnc = web3.utils.toWei(_starPrice, "ether");
      const transaction = await contract.methods
        .putStarUpForSale(starIdEnc.toString(), starPriceEnc.toString())
        .send({ from: account });

      setPutStarUpForSaleResult(transaction.transactionHash);
    } catch (error) {
      setPutStarUpForSaleError(error.message);
    }
  };

  const buyStar = async (_starId, _starPrice) => {
    //if wallet not connected, go and request the connection
    if (!contract) {
      connectWallet();
      return;
    }

    try {
      const starIdEnc = web3.utils.toBN(_starId);
      const starPriceEnc = web3.utils.toWei(_starPrice, "ether");
      const transaction = await contract.methods
        .buyStar(starIdEnc.toString())
        .send({ from: account, value: starPriceEnc.toString() });

      setBuyStarResult(transaction.transactionHash);
    } catch (error) {
      setBuyStarError(error.message);
    }
  };

  return (
    <Paper elevation={2} sx={{ py: 2, px: 4 }}>
      <Box>
        <Typography variant="h4" sx={{ color: "white" }}>
          Put Star for Sale
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
            <TextField
              fullWidth
              label="Price in Ether - e.g.: 0.001"
              value={starPrice}
              type="number"
              onChange={(e) => setStarPrice(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={() => putStarUpForSale(starId, starPrice)}>
              Let's Sell it!
            </Button>
          </Grid>
          <Grid item sx={{ mt: 2, minHeight: "45px" }}>
            <ReturnMsg
              trxError={putStarUpForSaleError}
              trxResult={putStarUpForSaleResult}
              funcType="send"
            />
          </Grid>
        </Grid>
      </Box>
      <Divider sx={{ my: 2 }} />

      <Box>
        <Typography variant="h4" sx={{ color: "white" }}>
          Buy Star
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
            <TextField
              fullWidth
              label="Price in Ether - e.g.: 0.001"
              value={starPrice}
              type="number"
              onChange={(e) => setStarPrice(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={() => buyStar(starId, starPrice)}>
              Buy Now!
            </Button>
          </Grid>
          <Grid item sx={{ mt: 2, minHeight: "45px" }}>
            <ReturnMsg
              trxError={buyStarError}
              trxResult={buyStarResult}
              funcType="send"
            />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
