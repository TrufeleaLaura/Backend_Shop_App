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

export const getProductById = async (req: Request, res: Response) => {
    try {
        const productId = req.params.productId;
        const product = await ProductModel.findOne({ id: productId });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(404).json({ error: 'Error fetching product' });
    }
}

export const getFilterProducts = async (req: Request, res: Response) => {
    try{
            const selectedCategories = req.body.categories;
            const nextProductsNumber = req.body.nextProductsNumber;
            const skip = req.body.productsInPage;
            if(selectedCategories.length===0){
                const products = await ProductModel.find()
                    .skip(skip)
                    .limit(nextProductsNumber);
                res.status(200).json(products);
            }
            else {
                const products = await ProductModel.find({category: {$in: selectedCategories}})
                    .skip(skip)
                    .limit(nextProductsNumber);
                res.status(200).json(products);
            }
        } catch (error) {
        console.error('Error retrieving products:', error);
        res.status(500).json({error: 'An error occurred while retrieving products'});
    }
}


export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await ProductModel.distinct('category');
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(404).json({ error: 'Error fetching categories' });
    }
}

export default getAllProducts;
