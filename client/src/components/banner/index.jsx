import { useTheme } from "@emotion/react";
import { Typography, useMediaQuery } from "@mui/material";
import { BannerContainer, BannerContent, BannerDescription, BannerImage, BannerShopButton, BannerTitle } from "../../styles/banner";

export default function Banner(){
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <BannerContainer>
            <BannerImage src="/banner/banner.png"/>
            <BannerContent>
                <Typography variant="h6" sx={{
                    fontFamily: "Playwrite VN",
                    fontWeight: '800'
                }}>
                    Huge Collection
                </Typography>
                <BannerTitle>
                    New Bags
                </BannerTitle>
                <BannerDescription variant="subtitle">
                Effortlessly chic. Our new bag collection is designed for your everyday adventures.
                </BannerDescription>
                <BannerShopButton color="primary">Shop Now</BannerShopButton>
            </BannerContent>
        </BannerContainer>
    )
}