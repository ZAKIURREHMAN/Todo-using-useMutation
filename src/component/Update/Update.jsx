import { useMutation, useQuery,useQueryClient } from "@tanstack/react-query";
import { updateData,sendDataOnServer } from "../FetchData/FetchAllData";
import { useState } from "react";

function Update() {
    const [showBox,setShowBox] = useState(false)
    const [preValue,setPreValue] = useState('')
    const [userId,setUserId] = useState('')
    const [newValue,setNewValue] = useState({id:'',name:''})
    const queryClient = useQueryClient();

  const { data: displayData } = useQuery({
    queryKey: ["todo"],
    queryFn: updateData,
  });

  const mutation = useMutation({
    mutationFn: (updatedProduct) => sendDataOnServer(updatedProduct.id, updatedProduct),
    onSuccess: () => {
        queryClient.invalidateQueries("todo");
        setShowBox(false);
    },
});

  const handelMapData = (item)=>{
    setShowBox(true)
    setUserId(item.id)
    setPreValue(item.name)
  }

  const manageNewValue = (e)=>{
    const {name,value} = e.target;
    setNewValue({
        id:userId,
        [name]:value
    })
  }
  const handelServerData = ()=>{
    mutation.mutate(newValue)
  }
  return (
    <div >
      {
        !showBox?   displayData?.map((item) => (
            <div key={item.id} className=" mt-10 border-2 border-yellow-900  cursor-pointer" >
              <h3 className=" ml-[50%] " onClick={()=>handelMapData(item)}  > {item.name}</h3>
            </div>
          )):  <div className="h-screen flex justify-center items-center  " >
          <div className="border-2 border-green-800 h-[300px] w-[300px] mt-[20px] ">
              <div className="flex justify-end ">
                  <div><i className="fa-solid fa-xmark cursor-pointer" onClick={()=>setShowBox(false)} ></i></div>
              </div>
              <label>Previous Data: </label> <br />
              {preValue} <br /><br />
              <label>New Data: </label> <br />
              <input type="text" placeholder="Enter Your New Data for Update" name="name" value={newValue.name} className="border-2 border-black outline-none " onChange={manageNewValue}/> <br /> <br />
              <button className="border-2 border-black outline-none" onClick={handelServerData} >Update</button>
            </div>
          </div>
          
      }
    
    </div>
  );
}

export default Update;
