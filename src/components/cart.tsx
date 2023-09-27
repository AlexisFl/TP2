"use client";
import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import { Button, ProductCardLayout, SectionContainer } from "tp-kit/components";
import {ProductCartLine} from "tp-kit/components/products/product-cart-line";
import {FormattedPrice} from "tp-kit/components/data-display";
import useStore, {addLine, clearCart, removeLine, updateLine} from "../hooks/use-cart";
const products = PRODUCTS_CATEGORY_DATA[0].products.slice(0, 3);


const Cart = () => {

    const lines = useStore((state) => state.lines);

    const handleQtyChange = (line, newQty) => {
        if (newQty > 0) {
            updateLine({ ...line, qty: newQty });
        } else {
            removeLine(line.product.id);
        }
    };

    return (
            <section>
                <h2 className="text-lg font-semibold mb-8 tracking-tight">Mon Panier</h2>
                {lines.map((line) => (
                    <ProductCartLine
                        key={line.id}
                        product={line.product}
                        qty={line.qty}
                        onQtyChange={(qty) => handleQtyChange(line, qty)}
                        onDelete={() => removeLine(line.product.id)}
                    />
                ))}

                <div className="flex justify-between items-center">

                    <div className="text-lg font-semibold">Total</div>
                    <div className="text-lg font-semibold">
                        <FormattedPrice price={lines.reduce((acc, line) => acc + line.product.price * line.qty, 0)}/>
                    </div>
                </div>
                <br/>

                <Button fullWidth>Commander</Button>

                <Button fullWidth variant="ghost" onClick={() => clearCart()}>Vider le panier</Button>

            </section>

    )
}

export default Cart;