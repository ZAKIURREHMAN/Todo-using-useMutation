import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchProducts,categoryList } from "../FetchData/FetchAllData";
import { useSearchParams } from "react-router-dom";


function Pagination() {
  const [searchParams, setSearchParams] = useSearchParams({
    limit: 4,
    skip: 0,
  });
  const skip = parseInt(searchParams.get("skip")) || 0;
  const limit = parseInt(searchParams.get("limit")) || 4;
  const q = searchParams.get("q") || "";
  const category = searchParams.get('category') ||'';

  const { data,isLoading } = useQuery({
    queryKey: ["products", limit, skip, q,category],
    queryFn: () => fetchProducts(limit, skip, q,category),
    placeholderData: keepPreviousData,
  });
  const {data:categoryData} = useQuery({
    queryKey:['category'],
    queryFn:categoryList
  })

  const debouncingFun = (callback, delay) => {
    let timer;
    return function (...arg) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        callback(...arg);
      }, delay);
    };
  };
  const callbackFun = (e) => {
    let newParams = new URLSearchParams(searchParams);
    newParams.set('category','')
    newParams.set("skip", 0);
    newParams.set("q", e.target.value);
    setSearchParams(newParams);
  };
  const callDebouncing = debouncingFun(callbackFun, 2000);

  const getSearchInputData = (e) => {
    callDebouncing(e);
  };

  const nextPag = () => {
    if (skip >= 0) {
      let newParams = new URLSearchParams(searchParams);
      newParams.set("skip", skip + 4);
      setSearchParams(newParams);
    }
  };

  const previousPag = () => {
    if (!skip <= 0) {
      let newParams = new URLSearchParams(searchParams);
      newParams.set("skip", skip - 4);
      setSearchParams(newParams);
    }
  };

  const getCategoryList = (e)=>{
    const newParams = new URLSearchParams(searchParams)
    newParams.set('category',e.target.value)
    newParams.set("skip", 0); 
    setSearchParams(newParams)
  }

  return (
    <div>
      <div className=" border-2 border-red-600 h-[60px] w-[100%]  flex justify-between ">
        <div className="ml-7 flex items-center ">
          <input
            type="text"
            className=" border-2 border-blue-600 w-[300px]"
            placeholder="Search here"
            onChange={getSearchInputData}
          />
        </div>
        <div className="mr-7 mt-4 ">
          <select onChange={getCategoryList} >
            <option value="">Select Category</option>
            {
              categoryData?.map((item,index)=>(
                  <option value={item} key={index}  >{item}</option>
              ))
            }
          </select>
        </div>
      </div>
      <div className=" flex flex-wrap justify-center ">
        {
          isLoading?<h1>is Loading...</h1>:<>
          {
             data?.map((item) => (
              <div
                className="max-w-sm mt-[40px]  h-[400px] mx-auto bg-white rounded-xl shadow-lg overflow-hidden p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out  "
                key={item.id}
              >
                <div className="flex flex-col  items-center space-x-4">
                  <img
                    className="w-[324px] h-[190px] rounded-lg object-cover"
                    src={item.images[0]}
                    alt="Product Image"
                  />
                  <div>
                    <br />
                    <h2 className="text-xl font-semibold text-gray-800">
                      {item.title}
                    </h2>
                    <p className="text-gray-500 mt-2">Price: ${item.price}</p>
                  </div>
                  <div className="mt-4 text-center">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          }
          </>
        }
      </div>
      <div className="flex justify-between ">
        <div
          className="border-2 border-red-600 ml-6  mt-7"
          onClick={previousPag}
        >
          <button>Previous</button>
        </div>
        <div className="border-2 border-red-600 mr-6 mt-7" onClick={nextPag}>
          <button>Next</button>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
