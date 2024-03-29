"use client";
import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import { Button, ProductCardLayout, SectionContainer } from "tp-kit/components";
import {ProductCartLine} from "tp-kit/components/products/product-cart-line";
import {FormattedPrice} from "tp-kit/components/data-display";
import useStore, {addLine, clearCart, removeLine, updateLine} from "../../hooks/use-cart";
import Cart from "../../components/cart";
import CartCounter from "../../components/cart-counter";
const products = PRODUCTS_CATEGORY_DATA[0].products.slice(0, 3);


export default function DevCartPage() {

    return (
        <SectionContainer
            className="py-36"
            wrapperClassName="flex flex-col lg:flex-row gap-24"
        >
            <CartCounter/>
            {/* Produits */}
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 flex-1">
                {products.map((product) => (
                    <ProductCardLayout
                        key={product.id}
                        product={product}
                        button={<Button variant={"ghost"} fullWidth onClick={()=> addLine(product)}>Ajouter au panier</Button>}
                    />
                ))}
            </section>

            <Cart/>

        </SectionContainer>
    );
}