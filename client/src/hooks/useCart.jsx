
import { useUIContext } from '../components/context/ui'


export const useCart = (product) => {
    const {cart,setCart} = useUIContext();
    const addToCart = ()=> {cart.findIndex(c => c._id === product._id) >= 0
        ? setCart(cart.filter(c=> c._id !== product._id))
        : setCart(c => [...c, product]);}
    
    const addToCartText = cart.findIndex((c) => c._id === product._id) >= 0
    ? "Remove from Cart"
    : "Add to Cart";
     return { addToCart, addToCartText}
}

export default useCart;