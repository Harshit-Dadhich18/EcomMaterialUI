import { Typography,TableContainer,TableCell,Table,TableHead,TableRow,TableBody } from "@mui/material"
import { useEffect, useState } from "react"

export default function Customers(){
    const [customers,setCustomers] = useState();
    useEffect(() => {
            const fetchProducts = async () => {
                try {
                    const response = await fetch('http://localhost:3000/api/customers');
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
            <Typography sx={{ mb: 1,mt: 6 }} variant="h4">Customers</Typography>
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
                                        <TableCell sx={{textTransform:'uppercase', fontWeight:'bold'}}>{p.username}</TableCell>
                                        <TableCell>{p.email}</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>)}
                        </Table>
                    </TableContainer>
        </>
    )
}