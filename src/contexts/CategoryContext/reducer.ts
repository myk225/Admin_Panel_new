async function reducer(state,action){

    switch(action.type){
        case "GETCATS":
            const response=await fetch(` http://191.101.14.6:3500/getCategories`);
            const res=await response.json();
            console.log(res.data);
            return({
                ...state,category:res.data
            })

        case "AddCat" :
            break;
            default:

        throw Error('Unknown action: ' + action.type);
        
    }
}

 export default reducer;

