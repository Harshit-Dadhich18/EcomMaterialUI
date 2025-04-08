import { Box, Button, IconButton, styled } from "@mui/material";
import { Colors } from "../theme";
import { slideInBottom, slideInRight } from "../../animation";

export const Products = styled(Box)(({theme}) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
        position: 'relative',
    }
}));

export const ProductImage = styled('img')(({src, theme}) => ({
    src: `url(${src})`,
    width: '100%',
    background: "#E9E9E9",
    padding: '10px',
    [theme.breakpoints.down('md')]: {
        width: '80%',
        padding: '24px'
    }
}));

export const ProductActionButton = styled(IconButton)(()=>({
    background: Colors.white,
    margin: 4,
    position: 'relative',
}));

export const ProductFavButton = styled(ProductActionButton, {
    shouldForwardProp: (prop) => prop !== 'isFav'
})(({isFav, theme})=>({
    color: isFav ? "#950606" : Colors.light,
    [theme.breakpoints.up('md')] :{
        position: "absolute",
        right: 0,
        top: 0,
    }
}));

export const ProductAddToCard = styled(Button, {
    shouldForwardProp: (prop) => prop !== 'show'
})(({show, theme})=>({
    width: '120px',
    fontSize: '12px',
    [theme.breakpoints.up('md')]: {
        position: 'absolute',
        bottom: '2%',
        width: '300px',
        padding: '10px 5px',
        animation: 
        show && `${slideInBottom} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`
    },
    background: Colors.secondary,
    opacity: 0.9,
    '&:hover': {
        background: Colors.primary,
        opacity: 1,
        cursor: 'pointer',
    },
}));

export const ProductMetaWrapper = styled(Box)(({theme})=>({
    padding: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
}));

export const ProductActionWrapper = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'show'
})(({show, theme})=>({
    [theme.breakpoints.up('md')]: {
        display: show ? 'flex':'none',
        position: "absolute",
        right: 0,
        top: '20%',
        animation:
        show &&
        `${slideInRight} 0.5s cubic-bezier(0.250, 0.460,0.450, 0.940) both`,
    }
}));