// components/CategorySection.tsx
import React from 'react';

type Item = {
  id: number;
  title: string;
  description: string;
};

type CategorySectionProps = {
  title: string;
  items: Item[];
};

const CategorySection: React.FC<CategorySectionProps> = ({ title, items }) => {
  return (
    <section className="w-full mb-8 text-center">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <ul className="list-none p-0">
        {items.map((item) => (
          <li key={item.id} className="border-b border-gray-300 py-4">
            <h3 className="text-lg font-medium">{item.title}</h3>
            <p className="text-gray-600">{item.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CategorySection;
