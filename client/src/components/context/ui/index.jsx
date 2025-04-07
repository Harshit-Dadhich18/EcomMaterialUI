import { createContext, useContext, useReducer, useState } from "react";

export const UIContext = createContext();
export const useUIContext = () => useContext(UIContext);

// Initial state for user details
const initialUserState = {};

function userReducer(state, action) {
    switch (action.type) {
      case 'USER_DETAILS':
        return {
          _id: action.payload._id,
          name: action.payload.name,
          email: action.payload.email,
        };
      default:
        return state;
    }
}



export const UIProvider = ({children}) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [showSearchBox, setShowSearchBox] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [isAdmin,setIsAdmin] = useState(false);
    const [productDetails, setProductDetails] = useState({
        image: '',
        name: '',
        price: '',
    });
    const [cart,setCart] = useState([]);
    const [showCart,setShowCart] = useState(false);
    const [orderSummaryArray, setOrderSummaryArray] = useState('');
    const [contactUs, setContactUs] = useState(false);
    const [notifications, setNotifications] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [notificationColor, setNotificationColor] = useState('#4CAF50');

    // useReducer for user details
  const [userDetails, dispatch] = useReducer(userReducer, initialUserState);

  const setUserDetails = (_id, name, email) => {
    dispatch({
      type: 'USER_DETAILS',
      payload: { _id, name, email },
    });
  };

    const value = {
        drawerOpen,
        setDrawerOpen,
        showSearchBox,
        setShowSearchBox,
        showProfile,
        setShowProfile,
        openDialog,
        setOpenDialog,
        isAdmin,
        setIsAdmin,
        productDetails,
        setProductDetails,
        cart,
        setCart,
        showCart,
        setShowCart,
        orderSummaryArray,
        setOrderSummaryArray,
        contactUs, 
        setContactUs,
        notifications, 
        setNotifications,
        notificationMessage, 
        setNotificationMessage,
        orderPlaced, 
        setOrderPlaced,
        notificationColor, 
        setNotificationColor,
        userDetails,  // User details are part of the context now
        setUserDetails,  // Function to update user details
    }
    return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}