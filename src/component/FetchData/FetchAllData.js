
export const fetchProducts = async(limit,skip,q,category)=>{
    let  url = `${import.meta.env.VITE_PRODUCTS_URL}/search?limit=${limit}&skip=${skip}&q=${q}`
    if(category){
        url = `${import.meta.env.VITE_DATA_CATEGORY}/${category}?limit=${limit}&skip=${skip}`
    }
    
    const response = await fetch(url)
    if(!response.ok){
        throw new Error('Data are not come from the sever')
        }
    const result = await response.json()
    return result.products
}

export const categoryList = async()=>{
    try{
        const response = await fetch(import.meta.env.VITE_CATEGORY_LIST)
        if(!response.ok){
            throw new Error('Server Response is not ok')
        }
        const data = await response.json()
        return data

    }catch(err){
        return new Error('We are facing error',err)
    }
    
}

export const updateData = async()=>{
    try{
        const response = await fetch(import.meta.env.VITE_POST_URL)
        if(!response.ok){
            throw new Error('Server Response is not ok')
        }
        const data = await response.json()
        return data

    }catch(err){
        return new Error('We are facing error',err)
    }
    
}

export const sendDataOnServer = async(id,doUpdateData)=>{
    let url = `${import.meta.env.VITE_POST_URL}/${id}`
    try{
        let response = await fetch(url,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(doUpdateData)
        })
        if(!response.ok){
            throw new Error('Response from server is not OK')
        }
        const data = await response.json()
        return data
    }catch(err){
        throw new Error('We are facing some issues',err)
    }
}