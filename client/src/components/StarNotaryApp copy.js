import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useEth } from "../../contexts/EthContext";

export default function Index() {
  const [starName, setStarName] = useState("");
  const [starId, setStarId] = useState(0);
  const [generalInfo, setGeneralInfo] = useState("");

  const {
    state: { contract, accounts, web3 },
  } = useEth();

  const createStar = async (_starName, _starId) => {
    console.log(_starName, _starId);
    console.log(accounts);

    await contract.methods
      .createStar(_starName, _starId)
      .send({ from: accounts[0] });
  };

  const putUpForSale = async (_starId) => {
    console.log(_starId);
    await contract.methods
      .putStarUpForSale(_starId, web3.utils.toWei("0.002", "ether"))
      .send({ from: accounts[0] });
  };

  const generalInfoCall = async (_function, _value) => {
    console.log(_function, _value);
    switch (_function) {
      case "tokenIdToStarInfo":
        const tokenInfo = await contract.methods
          .tokenIdToStarInfo(_value)
          .call();
        console.log(tokenInfo);
        setGeneralInfo(tokenInfo);
        break;
      case "starsForSale":
        const value = await contract.methods.starsForSale(_value).call();
        console.log(value);
        setGeneralInfo(value);
        break;
      case "buyStar":
        await contract.methods
          .buyStar(_value)
          .send({ from: accounts[0], value: web3.utils.toWei("0.1", "ether") });
        break;
      default:
        break;
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}>
        <Typography variant="h2">Star Notary App</Typography>
        <Button variant="contained" sx={{ display: "none" }}>
          Connect Wallet
        </Button>
      </Box>

      <Paper elevation={2} sx={{ py: 2, px: 4, mt: 4 }}>
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <Typography>Create a New Star</Typography>
            <Grid container spacing={1} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  label="Star Name"
                  value={starName}
                  onChange={(e) => setStarName(e.target.value)}
                />
                <TextField
                  label="Star Id"
                  value={starId}
                  onChange={(e) => setStarId(e.target.value)}
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={() => createStar(starName, starId)}>
                  Create
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography>Put up a star for sale</Typography>
            <Grid container spacing={1} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Star ID"
                  value={starId}
                  onChange={(e) => setStarId(e.target.value)}
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={() => putUpForSale(starId)}>
                  Sale
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography>General info:</Typography>
            <Grid container spacing={1} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="info returned from actions below"
                  value={generalInfo}
                  onChange={(e) => setGeneralInfo(e.target.value)}
                />
              </Grid>
              <Grid item container columnSpacing={1}>
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={() =>
                      generalInfoCall("tokenIdToStarInfo", generalInfo)
                    }>
                    tokenIdToStarInfo
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={() =>
                      generalInfoCall("starsForSale", generalInfo)
                    }>
                    starsForSale
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={() => generalInfoCall("buyStar", generalInfo)}>
                    buyStar
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
