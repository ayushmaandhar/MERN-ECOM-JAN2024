export type User = {
    name: string,
    photo: string,
    dob: string,
    gender: string,
    _id: string,
    role: string,
    email: string
}


export type Product = {
    name: string,
    price: number,
    stock: number,
    category: string,
    photo: string,
    _id: string,
}


export type ShippingInfo = {
    address: string,
    city: string,
    state: string,
    country: string,
    pinCode: string,
}


export type CartItem = {
    productId: string,
    photo: string,
    name: string,
    price: number,
    quantity: number,
    stock: number
}


export type OrderItem = Omit<CartItem, "stock"> & {
    _id: string
}


export type Order = {
    orderItems: OrderItem[],
    shippingInfo: ShippingInfo,
    subTotal: number,
    tax: number,
    shippingCharges: number,
    discount: number,
    total: number,
    status: string,
    user: {
        name: string,
        _id: string
    },
    _id: string,
}
