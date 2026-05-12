import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    selectedProduct: null,
    searchTerm: ""
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {

        // ✔️ NEW (preferred)
        setProducts: (state, action) => {
            state.products = action.payload;
        },

        // ✔️ NEW (preferred)
        addProduct: (state, action) => {
            state.products.push(action.payload);
        },

        // ❗ OLD (kept - FIXED slightly)
        createProduct: (state, action) => {
            state.products.push(action.payload);
        },

        // ✔️ OLD EDIT (fixed safely)
        editProduct: (state, action) => {
            const updated = action.payload;

            const index = state.products.findIndex(
                product =>
                    product._id === updated._id ||
                    product.id === updated.id
            );

            if (index !== -1) {
                state.products[index] = {
                    ...state.products[index],
                    ...updated
                };
            }
        },

        // ❗ OLD ALL PRODUCTS (kept for compatibility)
        allProduct: (state, action) => {
            state.products = action.payload;
        },

        // ✔️ VIEW SINGLE PRODUCT (fixed safe search)
        viewProduct: (state, action) => {
            const productId = action.payload;

            state.selectedProduct = state.products.find(
                product =>
                    product._id === productId ||
                    product.id === productId
            );
        },

        // ✔️ DELETE (safe both ids)
        deleteProduct: (state, action) => {
            const productId = action.payload;

            state.products = state.products.filter(
                product =>
                    product._id !== productId &&
                    product.id !== productId
            );
        },

        // ✔️ SEARCH TERM (UI ONLY)
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },

        // ✔️ CLEAR SELECTED
        clearSelectedProduct: (state) => {
            state.selectedProduct = null;
        },

        // ✔️ UPDATE (kept + safe merge)
        updateProduct: (state, action) => {
            const updated = action.payload;

            const index = state.products.findIndex(
                p => p._id === updated._id
            );

            if (index !== -1) {
                state.products[index] = {
                    ...state.products[index],
                    ...updated
                };
            }
        }

    }
});

export const {
    createProduct,
    allProduct,
    viewProduct,
    deleteProduct,
    editProduct,
    setSearchTerm,
    clearSelectedProduct,

    // NEW ONES ALSO EXPORTED
    setProducts,
    addProduct,
    updateProduct

} = productSlice.actions;

export default productSlice.reducer;