let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let total=document.getElementById('total');
let category=document.getElementById('category');
let ads=document.getElementById('ads');
let dicount=document.getElementById('discount');
let count=document.getElementById('count');
let submit=document.getElementById('submit');
let tbody=document.getElementById('tbody');


let mode='create';
let tmp;

//-gettotal--------------------



function gettotal(){
    if(price.value!=""){
        let result=(+price.value+ +taxes.value+ +ads.value)- +dicount.value
        total.innerHTML=result;
        total.style.background='green';
    }
    
    else{
        total.innerHTML='';
        total.style.background='red';
    }
   
    

}

//-createproduct
let datapro;
if(localStorage.products!=null){
    //-save data in local storage
    datapro= JSON.parse(localStorage.products)
}
else{
    datapro=[];
}



submit.onclick=function(){


    
    let newpro={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
    };
    console.log(mode);
    if (newpro.title!='' && newpro.count<=100) {
    if(mode==='create'){
        if(newpro.count>1){
            for(let i=0;i<newpro.count;i++){
                datapro.push(newpro);
    
            }
            
            }
            else{
                datapro.push(newpro);
    
            }
            
        }
        else{
            datapro[tmp]=newpro;
            mode='create';
            count.style.display='block';
            submit.innerHTML='create';
            }

            cleardata();
        }
        
        localStorage.setItem('products',JSON.stringify(datapro))
        
        
        showdata();
    
       
        
        

    
    

    
    


}



//-clear inputs

function cleardata(){

    title.value='';
    price.value='';
    taxes.value='';
    discount.value='';
    ads.value='';
    total.innerHTML='';
    count.value='';
    category.value='';

    gettotal();

    
    
}

//-read
function showdata(){

    
    let table='';

    for(let i=0;i<datapro.length;i++){

       table += `<tr>
        <td>${i+1}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].count}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick="updatedata(${i}) "  id="update">update</button></td>
        <td><button onclick="deletdata(${i})" id="delete">delete</button></td>
    </tr>`;

        
    

    }
    
    tbody.innerHTML=table;

    let btnDelete=document.getElementById('deleteall');
    if(datapro.length>0){
        btnDelete.innerHTML=`<button onclick="deleteall()" id='deleteall'>deleteall (${datapro.length})</button>`

        
    }
    else{
        btnDelete.innerHTML='';
    }

}
showdata();

//-------------count--------------





//----------------delete--------------

function deletdata(i){

    datapro.splice(i,1);
    localStorage.products=JSON.stringify(datapro);


    showdata();

}
//-----deleteall---------

function deleteall(){
    localStorage.clear();
    datapro.splice(0);
    showdata();
}
//-update
function updatedata(i){
    title.value=datapro[i].title;
    price.value=datapro[i].price;
    taxes.value=datapro[i].taxes;
    ads.value=datapro[i].ads;
    discount.value=datapro[i].discount;
    gettotal();
    category.value=datapro[i].category;
    count.style.display='none';
    submit.innerHTML='Update';

    mode='update';
    //kanakhdo had motaghayir wahmi kandiro fih index libghina nupdatiw bach nsta3mloh function lfo9 mni nwarko 3la update
    tmp=i;

    scroll({
        top:0,
        behavior:'smooth'
    })
    
    
    



}
//-search
let searchmode='title';
function getserchmode(id){
    let search=document.getElementById('search');
    if(id=='searchTitle'){
        searchmode='title'
        

    }
    else{
        searchmode='category'
        
        

    }
    search.placeholder='search by '+searchmode;
    search.focus();
    search.value='';
    
    showdata();


}


function searchData(value){
    let table='';

    for(let i=0;i<datapro.length;i++){
    
    if(searchmode==='title'){
       
            if(datapro[i].title.includes(value.toLowerCase())){

       table += `<tr>
        <td>${i}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].count}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick="updatedata(${i}) "  id="update">update</button></td>
        <td><button onclick="deletdata(${i})" id="delete">delete</button></td>
    </tr>`;

    

        
    

    
                
                
            }

        
        
        
    }
    else{

        
            if(datapro[i].category.includes(value.toLowerCase())){

                

                

       table += `<tr>
        <td>${i}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].count}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick="updatedata(${i}) "  id="update">update</button></td>
        <td><button onclick="deletdata(${i})" id="delete">delete</button></td>
    </tr>`;

    

        
    

    
                
                
            }

        

    }
}

    tbody.innerHTML=table;
   

}
//-clean data



