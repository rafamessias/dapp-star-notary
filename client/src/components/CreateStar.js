import { Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useEth } from "../contexts/EthContext";

export default function CreateStar() {
  const [starName, setStarName] = useState("");
  const [starId, setStarId] = useState(0);

  const {
    state: { contract, accounts },
  } = useEth();

  const createStar = async (_starName, _starId) => {
    console.log(_starName, _starId);
    console.log(accounts);

    await contract.methods
      .createStar(_starName, _starId)
      .send({ from: accounts[0] });
  };

  return (
    <>
      <Typography>Create a New Stary</Typography>
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
    </>
  );
}
