import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box'; 
import { useTranslation } from "react-i18next";
import "./Buyerviewcard.css"
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import FmdGoodOutlined from '@mui/icons-material/FmdGoodOutlined';
export default function Buyerviewcard() {
  const { i18n, t } = useTranslation();
  return (
    <div>
    <Card sx={{height: "401px",width: 345, borderRadius: '20px' }}>
      <CardMedia
        sx={{ height: "232px" }}
        image="https://s3-alpha-sig.figma.com/img/6b2e/9daa/06164afd507999fdbc45e1f76299bca6?Expires=1696809600&Signature=p2jaZqFcYqsAB1DB3wHF4COHrjcsnLKG0NR0Fd2qJ5aJjXd8DjtlxfZ81LztQXE1sVuLA0XdPF2p54~QPcGw0C6ex1Y2TzHyzoMEaEP4S11uM5YGEh1Ebdaf7OGooM5SeUrmhpRDaLsA7VFUvbFHkK7J7W49kzmPSSKqMz53UZYghoVGtygl8cUb0F8b-OHuIIQ-MyIe~cu2ib3bZxa3Vciuzb3DP3i3LjrcDXKw6AXnr4naJR4m~ft27t9PRE4p8GGBqSaj54M9clAfGyHmfSUbo-9Ws3fN5OU-~hoimSgal03wq8bnyoaRBLxvLIcSLUhEydtn-knROuq2KoZjPQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
        title="green iguana"
      >
        <Box
      sx={{
        width: '85px',
        height: '19px',
        flexShrink: 0,
        borderRadius: '4px',
        background: 'rgba(0, 0, 0, 0.40)',
        position: 'relative', 
        top: '1.5rem',
        left: '1rem',
      }}
    >
      <Typography
        sx={{
          color: '#FFF',
          fontFamily: 'Inter',
          fontSize: '12px',
          fontStyle: 'normal',
          fontWeight: 600,
          lineHeight: 'normal',
          position: 'absolute',
          top: '1px',
          left: '7px',
        }}
      >{t("commercial")}
      </Typography>
    </Box>
        </CardMedia>
      <CardContent>
      <div className='left-align'>
        <Typography className='font-ui'  sx={{fontSize:"20px"}} component="div">
          RSVC Overleg Hofmanweg 1 Haarlem
        </Typography>
      
      <div className='avtr'>
       <FmdGoodOutlined sx={{width:"30px", height:"30px" ,marginRight: '8px' }} className='icon-buyer-view-card'/>
        <Typography color={"#8B8B8B"}>Taylorweg 102, Veges </Typography>
        </div>
        
       <div className='avtr'>
        <Avatar sx={{width:"30px", height:"30px",marginRight: '8px' }} alt="Remy Sharp" src="https://s3-alpha-sig.figma.com/img/a3b2/2f9c/9d55d92d7b1b04f8c72abda291bb5ff2?Expires=1696809600&Signature=T2UkbJnr-8unfCP~7K~tPIcvnp1sYlpnmYGSPu~XaKPe0A9NPj-vG-4K6FO9ZMqFLnSELTiTXxUXqirjnwrvnjZjx3EW8Q~P40fBJnuf0ZOXirtn1X3ickcyXcqj~82lUuJrjs5W4iRh3AeG82702ni1IB3sQz78Q92woR5c6mIz~rVsxYpgOriHMYM3aYa3LtRnIKD7ns-mQjGTjGaEHQYvwg~aNRA6BCpqFZaXkvf48FPpx2Hm0XnFsCfLAJsr0j19soJhQl57v54XQCQvSUo9gNgxrez8C6~1xqJ0W~h5gESEJpuUjkMu~i-nPjJC2Df3E1a2XbInrHQbnGDEgQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
        <Typography color={"#8B8B8B"}>{t("sellerNameComesHere")} </Typography>
        </div>
       </div>
        </CardContent>
    </Card>
    </div>







  );
}



