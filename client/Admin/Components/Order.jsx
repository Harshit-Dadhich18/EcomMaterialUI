import { Typography, TableContainer, TableCell, Table, TableHead, TableRow, TableBody, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchOrders,updateOrders } from "../../src/utils/APIRoutes";

export default function Order() {
    const [allOrders, setAllOrders] = useState([]);
    const [status, setStatus] = useState('pending'); // Default status

    // Function to handle status update
    const updateOrderStatus = async (orderId, productId, newStatus, statusType) => {
        try {
            // Send the updated status to the backend
            const response = await fetch(updateOrders, {
                method: 'PUT', // Use PUT request for updating
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    orderId,
                    productId,
                    newStatus,
                    statusType, // Type of status being updated: order or payment
                }),
            });

            const data = await response.json();
            if (data.success) {
                // If status update is successful, update the local state
                setAllOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order._id === orderId
                            ? {
                                ...order,
                                orderDetails: order.orderDetails.map((item) =>
                                    item._id === productId
                                        ? { ...item, [statusType]: newStatus } // Dynamically update the field (either orderStatus or paymentStatus)
                                        : item
                                ),
                            }
                            : order
                    )
                );
                console.log(`${statusType} updated successfully`);
            } else {
                console.log("Failed to update status");
            }
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    useEffect(() => {
        const fetchAllOrderData = async () => {
            try {
                const response = await fetch(fetchOrders);
                const data = await response.json();
                console.log("data", data.orders);

                if (data.success) {
                    setAllOrders(data.orders); // Set the fetched orders to state
                    console.log("Data successfully fetched");
                } else {
                    console.log("No orders found");
                }
            } catch (error) {
                console.log("Failed to fetch order data", error);
            }
        };

        fetchAllOrderData();
    }, []);

    // If no orders are found, show a message
    

    return (
        <>
            <Typography sx={{ mb: 1, mt: 6 }} variant="h4">
                Orders
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>User Name</TableCell>
                            <TableCell>Product Name</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Order Status</TableCell>
                            <TableCell>Payment Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allOrders.map((order) => {
                            const { userId, orderDetails } = order;
                            const userName = userId?.username || 'Unknown User';

                            return orderDetails.map((item, index) => (
                                <TableRow key={`${order._id}-${index}`}>
                                    <TableCell sx={{ textTransform: 'capitalize' }}>{userName}</TableCell>
                                    <TableCell sx={{ textTransform: 'uppercase', fontWeight: 'bold' }}>
                                        {item.name}
                                    </TableCell>
                                    <TableCell>{item.orderQuantity}</TableCell>
                                    <TableCell>${item.price}</TableCell>

                                    {/* Order Status Dropdown */}
                                    <TableCell>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                            <Select
                                            labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={status}
                                                label="Status"
                                                onChange={(e) =>
                                                    setStatus(e.target.value)
                                                }
                                            >
                                                <MenuItem value="pending">Pending</MenuItem>
                                                <MenuItem value="shipped">Shipped</MenuItem>
                                                <MenuItem value="completed">Completed</MenuItem>
                                                <MenuItem value="canceled">Canceled</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </TableCell>

                                    {/* Payment Status Dropdown */}
                                    <TableCell>
                                        <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Payment</InputLabel>
                                            <Select
                                            labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={item.paymentStatus}
                                                label="Payment"
                                                onChange={(e) =>
                                                    updateOrderStatus(order._id, item._id, e.target.value, 'paymentStatus')
                                                }
                                            >
                                                <MenuItem value="pending">Pending</MenuItem>
                                                <MenuItem value="paid">Paid</MenuItem>
                                                <MenuItem value="failed">Failed</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </TableCell>

                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => {
                                                console.log("Action triggered for", item.name);
                                            }}
                                        >
                                            Save Changes
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ));
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
