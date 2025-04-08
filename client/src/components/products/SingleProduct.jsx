import { Stack } from "@mui/material";
import { ProductActionButton, ProductActionWrapper, ProductAddToCard, ProductFavButton, ProductImage, Products } from "../../styles/Products";
import ProductMeta from "./ProductMeta";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareTwoToneIcon from '@mui/icons-material/ShareTwoTone';
import FitScreenTwoToneIcon from '@mui/icons-material/FitScreenTwoTone';
import { useUIContext } from "../context/ui";
import {useCart} from '../../hooks/useCart';


export default function SingleProduct({ product, matches }) {
    const { setOpenDialog, setProductDetails } = useUIContext();
    const {addToCart, addToCartText} = useCart(product);
    function handleDialog() {
        setOpenDialog(true);
        setProductDetails({
            image: product.image,
            name: product.name,
            price: product.price,
            quantity: product.quantity,
        })
    }
    
    return (
        <>
            <Products>
                <ProductImage src={product.image} />
                <ProductMeta product={product} matches={matches} />
                <ProductActionWrapper>
                    <Stack direction="row">
                        <ProductFavButton isFav={1}>
                            <FavoriteIcon />
                        </ProductFavButton>
                        <ProductActionButton>
                            <ShareTwoToneIcon color="primary" />
                        </ProductActionButton>
                        <ProductActionButton onClick={handleDialog} >
                            <FitScreenTwoToneIcon color="primary"/>
                        </ProductActionButton>
                    </Stack>
                </ProductActionWrapper>
            </Products>
            <ProductAddToCard onClick={addToCart} variant="contained">
                {addToCartText}
            </ProductAddToCard>
        </>
    )
}