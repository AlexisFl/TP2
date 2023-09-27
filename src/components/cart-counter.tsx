import useStore from "../hooks/use-cart";


const CartCounter = () => {

    const count = useStore((state) => state.count);

    console.log("rendu counter")
    return (
        <div>
            {count}
        </div>
    )
}

export default CartCounter