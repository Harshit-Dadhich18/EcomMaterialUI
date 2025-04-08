import { useTheme } from "@mui/material/styles"
import { Container, Grid2, useMediaQuery } from "@mui/material"
// import { products } from "../../data";
import SingleProduct from "./SingleProduct";
import Grid from '@mui/material/Grid2';
import SingleProductDesktop from "./SingleProductDesktop";
import { useEffect, useState } from "react";
import Pagination from '@mui/material/Pagination';
import { fetchProducts } from "../../utils/APIRoutes";

export default function Products() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;
    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await fetch(fetchProducts);
                const result = await response.json();
                if (result.success) {
                    const products = result.products.map(product => ({
                        ...product, // Spread the existing product properties
                        orderQuantity: 1 // Add the new field with default value of 1
                    }));

                    setProducts(products);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        getProducts();

    }, []);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    // console.log("currentProducts", currentProducts);
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };
    return (
        <Container>
            <Grid
                container
                spacing={{ xs: 3, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
                justifyContent={"center"}
                sx={{ margin: '20px 4px 10px 4px' }}
            >
                {currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                        <Grid key={product._id} size={{ xs: 2, sm: 4, md: 4 }} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                            {matches ? (
                                <SingleProduct product={product} matches={matches} />
                            ) : (
                                <SingleProductDesktop product={product} matches={matches} />
                            )}
                        </Grid>))) : (
                    <Grid xs={12}>
                        <img src="/GrowingFlower.gif" alt="No products found" />
                    </Grid>
                )}
            </Grid>
            {/* Pagination Controls */}
            <Grid
                container
                justifyContent="center"
                sx={{ marginTop: 3, marginBottom: 3 }}
            >
                <Pagination
                    count={Math.ceil(products.length / productsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Grid>
        </Container>
    )
}