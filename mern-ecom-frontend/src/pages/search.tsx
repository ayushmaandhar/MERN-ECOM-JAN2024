import { useState } from "react";
import ProductCard from "../components/product-card";
import { useCategoriesQuery, useSearchProductsQuery } from "../redux/api/productAPI";
import { CustomError } from "../types/api-types";
import toast from "react-hot-toast";


const Search = () => {

  const {data: categoriesResponse, isError: isCategoryError, error: categoryError, isLoading: isCategoryLoading} = useCategoriesQuery("");

  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<number>(100000);
  const [category, setCategory] = useState<string>("");
  const [page, setPage] = useState<number>(1);


  const {
    isLoading: productLoading,
    data: searchedData,
    isError: isProductError,
    error: productError
  } = useSearchProductsQuery({search, sort, price: maxPrice, category, page});

  console.log(searchedData);

  const addToCardHandler = () => {}

  const isPrevPage: boolean = true;
  const isNextPage: boolean = true;

  if (isCategoryError) {
    const err = categoryError as CustomError;
    toast.error(err.data.message);
  }

  if (isProductError) {
    const err = productError as CustomError;
    toast.error(err.data.message);
  }

  return (
    <div className="product-search-page">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={(e)=>setSort(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Price (Low to High)</option>
            <option value="dsc">Price (High to low)</option>
          </select>
        </div>

        <div>
          <h4>Max Price: {maxPrice || ""}</h4>
          <input 
            type="range" 
            min={100} 
            max={100000} 
            value={maxPrice} 
            onChange={(e)=>setMaxPrice(Number(e.target.value))} 
          />
        </div>

        <div>
          <h4>Category</h4>
          <select
            value={category}
            onChange={(e)=>setCategory(e.target.value)}
          >
            <option value="">ALL</option>
            {
              !isCategoryLoading && 
                categoriesResponse?.categories.map( (i) => (
                  <option key={i} value={i}>
                     {i.toUpperCase()} 
                  </option>
                ))
            }
          </select>
        </div>
      </aside>

      <main>
        <h1>Products</h1>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />
        <div className="search-product-list">
          {
            searchedData?.products.map( product => (
              <ProductCard
                productId={product._id}
                name={product.name}
                price={product.price}
                stock={product.stock}
                handler={addToCardHandler}
                photo={product.photo}
              />
            ))
          }
        </div>
        
          {
            searchedData && (searchedData.totalPage >= 1)
            && (
              <article>
                <button disabled={!isPrevPage} onClick={() => setPage((prev)=>prev-1)}>Prev</button>
                <span>{page} of {searchedData.totalPage}</span>
                <button disabled={!isNextPage} onClick={() => setPage((prev)=>prev+1)}>Next</button>
              </article>
            )
          }

      </main>

    </div>
  )
}

export default Search;
