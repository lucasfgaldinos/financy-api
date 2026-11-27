import { db } from '../prisma/db';

interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: Date;
  type: 'expense' | 'income';
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  categoryId: string;
}

interface Category {
  id: string;
  name: string;
  color: string;
  type: 'expense' | 'income';
  createdAt: Date;
  updatedAt: Date;
  transactions?: Transaction[];
}

type GlobalCategoryInput = {
  name: string;
  color: string;
  type: 'expense' | 'income';
};

const globalCategories: GlobalCategoryInput[] = [
  //Despesas
  { name: 'Alimentação', color: '#FF5733', type: 'expense' },
  { name: 'Transporte', color: '#33A8FF', type: 'expense' },
  { name: 'Moradia', color: '#33FF57', type: 'expense' },
  { name: 'Saúde', color: '#F033FF', type: 'expense' },
  { name: 'Educação', color: '#FF3366', type: 'expense' },
  { name: 'Lazer', color: '#FFBA33', type: 'expense' },
  { name: 'Compras', color: '#33FFF6', type: 'expense' },
  { name: 'Outros', color: '#B033FF', type: 'expense' },

  // Receitas
  { name: 'Salário', color: '#33FF57', type: 'income' },
  { name: 'Freelance', color: '#33A8FF', type: 'income' },
  { name: 'Investimentos', color: '#FFBA33', type: 'income' },
  { name: 'Outros', color: '#B033FF', type: 'income' },
];

export const initializeGlobalCategories = async (): Promise<Category[]> => {
  const createdCategories: Category[] = [];

  for (const category of globalCategories) {
    try {
      const existing = await db.orm.categories
        .where({
          name: category.name,
          type: category.type,
        })
        .first();

      if (!existing) {
        const newCategory = await db.orm.categories.create(category);
        console.log(`✅ Criado: ${newCategory.name}`);
        createdCategories.push(newCategory);
      } else {
        createdCategories.push(existing);
      }
    } catch (error) {
      console.log({ message: 'Erro ao criar categorias.', error });
    }
  }

  console.log('Todas as categorias inicializadas com sucesso.');

  return createdCategories;
};
