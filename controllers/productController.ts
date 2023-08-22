import { Request, Response } from 'express';
import ProductModel from "../model/product.js";


const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await ProductModel.find();
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(404).json({ error: 'Error fetching products' });
    }
};

export default getAllProducts;
