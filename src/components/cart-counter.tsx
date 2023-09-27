import useStore from "../hooks/use-cart";


const CartCounter = () => {

    const lines = useStore((state) => state.lines);

    console.log("rendu counter")
    return (
        <div>
            <p>{lines.length}</p>
        </div>
    )
}

export default CartCounter