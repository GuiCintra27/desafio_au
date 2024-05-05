import { Products } from '@prisma/client';

export type ProductsData = Omit<Products, 'created_at' | 'updated_at'>;
