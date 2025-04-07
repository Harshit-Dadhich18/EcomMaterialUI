import {
    Button,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    DialogContentText
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Colors } from '../../src/styles/theme/index.js'
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState, useEffect } from "react";
import { fetchProducts } from "../../src/utils/APIRoutes.js";
// Mock data
// const products = [{
//     _id: '459873',
//     name: 'bag1',
//     price: 99.99,
//     quantity: 1,
//     description: 'coolbag',
//     imageURL: ''
// }];

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    price: Yup.number().required('Price is required').positive('Price must be positive'),
    quantity: Yup.number().required('Quantity is required'),
    description: Yup.string().required('Description is required'),
    image: Yup.mixed().required('Product image is required')
});

export default function Product() {
    const [open, setOpen] = useState(false);
    const [deleteBox, setDeleteBox] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [initialValues, setIntialValues] = useState({
        _id: -1,
        name: '',
        price: '',
        quantity: '',
        description: '',
        image: null // This will hold file data
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [products, setProducts] = useState([]);

    // Fetch products from the server
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(fetchProducts);
                const result = await response.json();
                if (result.success) {
                    setProducts(result.products); // Assuming the response contains a 'products' array
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);
    // console.log("Fetched Products",products)

    const handleAddProduct = () => {
        setIntialValues({
            _id: -1,
            name: '',
            price: '',
            quantity: '',
            description: '',
            image: null
        });
        setImagePreview(null); // Reset image preview when adding new product
        setOpen(true);
    };

    const handleProductEdit = (product) => {
        setIntialValues(product);
        setImagePreview(product.imageURL); // Set the preview to the existing image
        setOpen(true);
    };

    const handleProductDelete = (product) => {
        console.log("Delete", product);
        setProductToDelete(product);
        setDeleteBox(true);
    };

    const confirmDelete = async () => {
        if (!productToDelete) return;
        try {
            const response = await fetch(`http://localhost:3000/api/products/${productToDelete._id}`, {
                method: 'DELETE',
            });

            const result = await response.json();
            if (result.success) {
                // Remove the deleted product from the list
                setProducts((prevProducts) => prevProducts.filter((p) => p._id !== productToDelete._id));
                setDeleteBox(false); // Close the dialog after success
            } else {
                alert('Failed to delete the product');
            }
        } catch (error) {
            console.error("Error deleting product:", error);
            alert('Error deleting product');
        }
    };

    const handleClose = () => {
        setDeleteBox(false);
    };

    const handleSubmit = async (values) => {
        console.log(values);
    
        // Create form data
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("price", values.price);
        formData.append("quantity", values.quantity);
        formData.append("description", values.description);
        if (values.image) {
            formData.append("image", values.image);  // New image
        } else {
            formData.append("image", initialValues.image);  // No new image, send null
        }
    
        try {
            let response;
            let result;
    
            if (initialValues._id !== -1) {
                // Editing an existing product
                response = await fetch(`http://localhost:3000/api/products/${initialValues._id}`, {
                    method: 'PUT', // Use PUT to update existing product
                    body: formData
                });
                result = await response.json();
    
                if (result.success) {
                    // Update the product in the list with the updated information
                    setProducts((prevProducts) =>
                        prevProducts.map((product) =>
                            product._id === initialValues._id ? result.product : product
                        )
                    );
                    // alert("Product updated successfully!");
                }
            } else {
                // Creating a new product
                response = await fetch('http://localhost:3000/api/products', {
                    method: 'POST', // Use POST to create a new product
                    body: formData
                });
                result = await response.json();
    
                if (result.success) {
                    // Add the new product to the list
                    setProducts([...products, result.product]);
                    // alert("Product added successfully!");
                }
            }
    
            // Close the modal after successful operation
            setOpen(false);
    
        } catch (error) {
            console.error("Error saving product:", error);
            alert('Error saving product');
        }
    };
    

return (
    <>
        <Typography sx={{ mb: 1,mt: 6 }} variant="h4">Products</Typography>
        <Button startIcon={<AddIcon />} variant="contained" onClick={handleAddProduct}>Add Products</Button>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Qty</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map(p =>
                        <TableRow key={p._id}>
                            <TableCell>{p.name}</TableCell>
                            <TableCell>{p.price}</TableCell>
                            <TableCell>{p.quantity}</TableCell>
                            <TableCell>{p.description}</TableCell>
                            <TableCell>
                                <IconButton onClick={() => handleProductEdit(p)}>
                                    <EditIcon sx={{ color: "blue" }} />
                                </IconButton>
                                <IconButton onClick={() => handleProductDelete(p)}>
                                    <DeleteForeverIcon sx={{ color: Colors.danger }} />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>

        <Dialog open={open} fullWidth maxWidth="lg">
            <DialogTitle>{"Add Products"}</DialogTitle>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}>
                {({ dirty, isValid, setFieldValue }) => (
                    <Form>
                        <DialogContent>
                            <Grid container spacing={3}> {/* Apply spacing here */}
                                <Grid item xs={12}>
                                    <Field as={TextField} name="name" label="Name" required fullWidth />
                                    <ErrorMessage name="name">{(message) => <Typography color={'red'}>{message}</Typography>}</ErrorMessage>
                                </Grid>
                                <Grid item xs={12}>
                                    <Field as={TextField} name="price" label="Price" required fullWidth />
                                    <ErrorMessage name="price">{(message) => <Typography color={'red'}>{message}</Typography>}</ErrorMessage>
                                </Grid>
                                <Grid item xs={12}>
                                    <Field as={TextField} name="quantity" label="Quantity" required fullWidth />
                                    <ErrorMessage name="quantity">{(message) => <Typography color={'red'}>{message}</Typography>}</ErrorMessage>
                                </Grid>
                                <Grid item xs={12}>
                                    <Field as={TextField} name="description" label="Description" required fullWidth />
                                    <ErrorMessage name="description">{(message) => <Typography color={'red'}>{message}</Typography>}</ErrorMessage>
                                </Grid>

                                {/* Image upload */}
                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        sx={{
                                            backgroundColor: Colors.primary,
                                            '&:hover': { backgroundColor: Colors.primaryDark },
                                            padding: '10px 20px',
                                            borderRadius: '8px',
                                            fontSize: '16px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            textTransform: 'none', // prevents text from being capitalized
                                        }}
                                    >
                                        <Typography sx={{ marginRight: 1 }}>Upload Image</Typography>
                                        <AddIcon />

                                        {/* Hidden file input */}
                                        <input
                                            type="file"
                                            name="image"
                                            accept="image/*"
                                            onChange={(event) => {
                                                const file = event.target.files[0];
                                                setFieldValue("image", file);

                                                // Create a preview URL for the selected image
                                                setImagePreview(URL.createObjectURL(file));
                                            }}
                                            style={{ display: 'none' }}
                                        />
                                    </Button>

                                    <ErrorMessage name="image">{(message) => <Typography color={'red'}>{message}</Typography>}</ErrorMessage>

                                    {/* Image preview */}
                                    {imagePreview && (
                                        <div style={{ marginTop: '10px' }}>
                                            <img
                                                src={imagePreview}
                                                alt="Image Preview"
                                                style={{ maxWidth: '100%', maxHeight: '200px' }}
                                            />
                                        </div>
                                    )}
                                </Grid>
                            </Grid>
                        </DialogContent>

                        <DialogActions>
                            <Button disabled={!dirty || !isValid} type="submit" variant="contained">
                                {initialValues._id !== -1 ? "Save Edit" : "Save"}
                            </Button>
                            <Button autoFocus onClick={() => setOpen(false)}>Cancel</Button>
                        </DialogActions>
                    </Form>
                )}
            </Formik>
        </Dialog>
        {deleteBox && <Dialog
        open={deleteBox}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you Sure"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={confirmDelete}>OK</Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>}
    </>
);
}
