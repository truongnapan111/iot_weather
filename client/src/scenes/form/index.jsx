import { Avatar, Box, Stack, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <Box m="30px">
      <Header title="ADMIN USER" subtitle="My profile" />
      <Box p="30px" sx={{borderRadius: '16px',bgcolor: '#f5f5f5'}}>

        <Box
          display="grid"
          gap="40px"
          gridTemplateColumns="repeat(3, minmax(0, 33%))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          <Stack direction="row" sx={{ gridColumn: "span 1" }} >
            <Avatar alt="truongnapan" src="./assets/user.jpg" sx={{ width: 310, height: 310 }} /> 
          </Stack>
          <Box
            margin="10px"
            sx={{ gridColumn: "span 1" }}
          >               
            <Typography variant="h4" fontWeight="800">Fullname:</Typography>
            <Typography variant="h3" color="#616161">
              Nguyen Truong
            </Typography>
            <Typography variant="h4" fontWeight="800" marginTop="50px">Phone:</Typography>
            <Typography variant="h3" color="#616161">
              0988686868
            </Typography>
            <Typography variant="h4" fontWeight="800" marginTop="50px">Address:</Typography>
            <Typography variant="h3" color="#616161">
              Trieu Khuc, Tan Trieu, Thanh Tri, Ha Noi
            </Typography>
          </Box>
          <Box
            margin="10px"
            sx={{ gridColumn: "span 1" }}
          >               
            <Typography variant="h4" fontWeight="800">Mail:</Typography>
            <Typography variant="h3" color="#616161">
              truongnapan111@gmail.com
            </Typography>
            <Typography variant="h4" fontWeight="800" marginTop="50px">Fax:</Typography>
            <Typography variant="h3" color="#616161">
              +(84) 1900 8198
            </Typography>
            <Typography variant="h4" fontWeight="800" marginTop="50px">Ig:</Typography>
            <Typography variant="h3" color="#616161">
              truongnapan
            </Typography>
          </Box>
          
        </Box>  
      </Box>
    </Box>
  );
};



export default Form;
