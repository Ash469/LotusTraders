
import { CategoryData } from '@/types/type';

interface CategoriesProps {
  category: CategoryData;
}

export default function Categories({ category }: CategoriesProps) {
  const { name, description, products, deals, trendingProducts, newReleases } = category;

  return (
    <div>
      <h1>{name}</h1>
      <p>{description}</p>

      {/* Render products */}
      <div>
        <h2>Products</h2>
        <div>
          {products.map((product) => (
            <div key={product.id}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>Rating: {product.rating}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Render deals */}
      <div>
        <h2>Deals</h2>
        <div>
          {deals.map((deal) => (
            <div key={deal.id}>
              <img src={deal.image} alt={deal.name} />
              <h3>{deal.name}</h3>
              <p>{deal.description}</p>
              <p>{deal.discount}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Render trending products */}
      <div>
        <h2>Trending Products</h2>
        <div>
          {trendingProducts.map((product) => (
            <div key={product.id}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>Rating: {product.rating}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Render new releases */}
      <div>
        <h2>New Releases</h2>
        <div>
          {newReleases.map((product) => (
            <div key={product.id}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>Rating: {product.rating}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}