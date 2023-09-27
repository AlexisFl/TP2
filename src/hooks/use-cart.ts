
import { create } from 'zustand';
import {CartData, ProductLineData} from "../types";
import {ProductData} from "tp-kit/types";

const useStore = create<CartData>((set) => ({
    lines: [],
    count: 0,
}));

export default useStore;

// [...]

/**
 * Ajoute une nouvelle ligne au panier.
 * Si le produit est déjà dans le panier, augmente la quantité de 1.
 *
 * @param product
 */
export function addLine(product: ProductData) {
    const { lines, count } = useStore.getState();

    const line = lines.find((l) => l.product.id === product.id);
    if (line) {
        updateLine({ ...line, qty: line.qty + 1 });
    } else {
        useStore.setState({ lines: [...lines, { product, qty: 1 }], count: count + 1 });
    }
}

/**
 * Modifie une ligne produit du panier
 *
 * @param line
 */
export function updateLine(line: ProductLineData) {
    const lines = useStore.getState().lines;
    useStore.setState({
        lines: lines.map((l) => (l.product.id === line.product.id ? line : l)),
    });
}

/**
 * Supprime la ligne produit du panier
 *
 * @param productId
 * @returns
 */
export function removeLine(productId: number) {
    const { lines, count } = useStore.getState();

    const updatedLines = lines.filter((line) => line.product.id !== productId);
    const updatedCount = Math.max(count - 1, 0);

    useStore.setState({ lines: updatedLines, count: updatedCount });
}

/**
 * Vide le contenu du panier actuel
 */
export function clearCart() {
    useStore.setState({ lines: [], count: 0 });
}

/**
 * Calcule le total d'une ligne du panier
 */
export function computeLineSubTotal(line: ProductLineData): number {
    return line.product.price * line.qty;
}

/**
 * Calcule le total du panier
 */
export function computeCartTotal(lines: ProductLineData[]): number {
    return lines.reduce((acc, line) => acc + computeLineSubTotal(line), 0);
}
