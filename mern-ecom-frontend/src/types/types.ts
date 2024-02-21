import { ReactElement } from "react"

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


type CountAndChange = {
    revenue: number,
    product: number,
    user: number,
    order: number
}

type LatestTransaction = {
    _id: string,
    amount: number,
    discount: number,
    quantity: number, 
    status: string
}

export type Stats = {
    categoryCount: Record<string, number>[],
    changePercent: CountAndChange,
    count: CountAndChange,
    chart: {
        order: number[],
        revenue: number[]
    },
    userRatio: {
        male: number,
        female: number
    },
    latestTransaction: LatestTransaction[]
}

export type Pie = {
    orderFullfillment: {
        processing: number;
        shipping: number;
        delivered: number;
    },
    productCategories: Record<string, number>[],
    stockAvailability: {
        outOfStock: number;
        inStock: number;
    },
    revenueDistribution: {
        netMargin: number;
        discount: number;
        productionCost: number;
        burnt: number;
        marketingCost: number;
    },
    usersAgeGroup: {
        teen: number;
        adult: number;
        old: number;
    },
    adminCustomer: {
        admin: number;
        customer: number;
    }
}


export type Bar = {
    users: number[],
    products: number[],
    orders: number[] 
}


export type Line = {
    users: number[],
    products: number[],
    discount: number[],
    revenue: number[]
}

