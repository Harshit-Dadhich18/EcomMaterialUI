import { Stack } from "@mui/material";
import { ProductActionButton, ProductActionWrapper, ProductAddToCard, ProductFavButton, ProductImage, Products } from "../../styles/Products";
import ProductMeta from "./ProductMeta";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import FitScreenIcon from '@mui/icons-material/FitScreen';
import { useState } from "react";
import { useUIContext } from "../context/ui";
import {useCart} from '../../hooks/useCart';

export default function SingleProductDesktop({ product, matches }) {
    const { setOpenDialog, setProductDetails } = useUIContext();
    const [showOptions, setShowOptions] = useState(false);
    const handleMouseEnter = () => setShowOptions(true);
    const handleMouseLeave = () => setShowOptions(false);

    const {addToCart, addToCartText} = useCart(product);
    // console.log("product",product);

    function handleDialog() {
        setOpenDialog(true);
        setProductDetails({
            image: product.image,
            name: product.name,
            price: product.price,
            quantity: product.quantity,
            orderQuantity: product.orderQuantity,
        })
    }
    
    // console.log("productDetails",product)

    return (
        <>
            <Products onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                
                <ProductImage src={product.image} />
                <ProductFavButton isFav={0} className="fav">
                    <FavoriteIcon />
                </ProductFavButton>
                {showOptions && <ProductAddToCard onClick={addToCart} show={showOptions} variant="contained">
                    {addToCartText}
                </ProductAddToCard>}
                <ProductActionWrapper show={showOptions}>
                    <Stack direction="column">
                        <ProductActionButton>
                            <ShareIcon color="primary" />
                        </ProductActionButton>
                        <ProductActionButton onClick={handleDialog}>
                            <FitScreenIcon color="primary"  />
                        </ProductActionButton>
                    </Stack>
                </ProductActionWrapper>
            </Products>
            <ProductMeta product={product} matches={matches} />
        </>
    )
}