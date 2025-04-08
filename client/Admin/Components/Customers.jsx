import { Typography, TableContainer, TableCell, Table, TableHead, TableRow, TableBody } from "@mui/material"
import { useEffect, useState } from "react";
import { fetchUsers } from "../../src/utils/APIRoutes";
import { Colors } from '../../src/styles/theme/index.js'


export default function Customers() {
    const [customers, setCustomers] = useState();
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(fetchUsers);
                const result = await response.json();
                if (result.success) {
                    setCustomers(result.user); // Assuming the response contains a 'products' array
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);
    // console.log("Fetched customers",customers)
    return (
        <>
            <Typography
                color={Colors.primary}
                sx={{
                    mb: 3, // Add bottom margin
                    mt: 6, // Add top margin
                    textAlign: 'center', // Center the title
                    fontWeight: 'bold', // Make the text bold
                    fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }, // Make the font size responsive
                    textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', // Add subtle text shadow
                    letterSpacing: 2, // Add spacing between letters for style
                }}
                variant="h4"
            >
                Customers
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>UserName</TableCell>
                            <TableCell>
                                Email
                            </TableCell>

                        </TableRow>
                    </TableHead>
                    {customers && (<TableBody>
                        {customers.map(p =>
                            <TableRow key={p._id}>
                                <TableCell sx={{ textTransform: 'uppercase', fontWeight: 'bold' }}>{p.username}</TableCell>
                                <TableCell>{p.email}</TableCell>
                            </TableRow>
                        )}
                    </TableBody>)}
                </Table>
            </TableContainer>
        </>
    )
}