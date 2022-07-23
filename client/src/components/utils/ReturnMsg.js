import { Link, Tooltip, Typography } from "@mui/material";

export default function ReturnMsg(props) {
  const { trxError, trxResult, funcType } = props;

  return (
    <>
      {trxError !== "" && (
        <Tooltip title={trxError} placement="top">
          <Typography
            color="error.main"
            sx={{
              width: { xs: "280px", sm: "330px" },
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}>
            {trxError}
          </Typography>
        </Tooltip>
      )}
      {trxResult !== "" && (
        <Tooltip title={trxResult} placement="top">
          <Typography
            sx={{
              width: { xs: "280px", sm: "330px" },
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}>
            {funcType === "send" ? (
              <>
                TRX Hash:{" "}
                <Link
                  href={`https://rinkeby.etherscan.io/tx/${trxResult}`}
                  rel="noreferrer"
                  target="_blank">
                  {trxResult}
                </Link>
              </>
            ) : (
              <>{trxResult}</>
            )}
          </Typography>
        </Tooltip>
      )}
    </>
  );
}
