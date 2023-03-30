let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let discount = document.getElementById("discount");
let ads = document.getElementById("ads");
let total = document.getElementById("total")
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create")
let search = document.getElementById("search");
let searchtitle = document.getElementById("searchtitle");
let searchcategory = document.getElementById("searchcategory");
let delAll = document.getElementById("deleteAll")

let permission = document.getElementById("permission")
let yes = document.getElementById("yes")
let no = document.getElementById("no")

let mood = "create"
// function to get total price

function getTotal(){
    if(price.value != "" && price.value != 0 ){
        let a = ((+price.value + +taxes.value + +ads.value )* discount.value)
        let b = (+price.value + +taxes.value + +ads.value)
        total.innerHTML = b - a
        total.style.background = "#b366ff"
    }
    else{
        total.style.background = "rgb(124, 255, 253) "
        total.innerHTML = ""
    }
}

// function to disabled creat btn to fill input

create.setAttribute('disabled',"")
create.style.opacity = ".5"
function disabledbtn(){
    if(
        title.value == "" ||
        price.value == "" ||
        taxes.value == "" ||
        ads.value == "" ||
        count.value == "" ||
        category.value == ""
    )
    {
    create.setAttribute('disabled',"")
    create.style.opacity = ".5"
    }
    else{
    create.removeAttribute('disabled')
       create.style.opacity = "1"



    }
}
// function to force clear btn to disable

function forcedDisabled(){
    create.setAttribute('disabled',"")
}


// function to creat product and save it into local storage


let data;

if(localStorage.product != null){
    data = JSON.parse(localStorage.product)
}
else{
    data = [ ]
}


let temp;
create.onclick = function(){
        let newData = {
            title:title.value.toLowerCase(),
            price:price.value,
            taxes:taxes.value,
            discount:discount.value,
            ads:ads.value,
            total:total.innerHTML,
            count:count.value,
            category:category.value.toLowerCase()
        }
        if(mood == "create"){
            for( i = 0 ; i<count.value ; i++){
                data.push(newData)
            }
        }else{
            data [ temp ] = newData
            mood = "create";
            create.value = "create"
            count.style.display = "block"
            total.style.background = "rgb(124, 255, 253) "
        }
        // to save it in local storage
        localStorage.setItem('product', JSON.stringify(data))
        create.style.opacity = ".5"


    forcedDisabled()

    clearData()

    showData()
}

// function to clear data after click on create btn

function clearData(){
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}

// function to read data in table


function showData(){
    let table = '';
    for(let i = 0 ; i<data.length; i++){
        table += `<tr>
        <td>${i}</td>
        <td>${data[i].title}</td>
        <td>${data[i].price}</td>
        <td>${data[i].taxes}</td>
        <td>${data[i].ads}</td>
        <td>${data[i].discount}</td>
        <td>${data[i].total}</td>
        <td>${data[i].category}</td>
        <td onclick = "updateBtn(${i})" id= "update">update</td>
        <td onclick = "deleteItem(${i})" id = "delete">delete</td>
        </tr>
        `

    }
    document.getElementById('tbody').innerHTML = table;
    DisabledDeleteAll()
    numberOfData()
}
showData()

// function to delete item
function deleteItem(i){
    data.splice(i,1)
    localStorage.product= JSON.stringify (data)
    showData()

}

// function to delete all item("delete")
function deleteAll(){
    permission.style.display = "block"
}
function yesfunc(){
    data.splice(0)
    localStorage.clear()
    showData()
    permission.style.display = "none"
}
function nofunc(){
    showData()
    permission.style.display = "none"  
}

// function to disabled delete btn if no data

function DisabledDeleteAll(){
    if(data.length == 0){
        delAll.setAttribute("disabled","")
        delAll.style.opacity = ".5"
    }
    else{
        delAll.removeAttribute("disabled")
        delAll.style.opacity = "1"
    }
}

// function to put number of data with (delete all)
function  numberOfData(){
    delAll.value = ` Delete All(${data.length})`
    }

    // function to updat the product

function updateBtn(i){
    title.value = data[i].title
    price.value = data[i].price
    taxes.value = data[i].taxes
    ads.value = data[i].ads
    discount.value = data[i].discount
    category.value = data[i].category
    count.value = data[i].count
    create.value = "update"

    mood = "update"
    temp = i;
    count.style.display = "none"
    scroll({
        top:0,
        behavior:'smooth'
    })
    delAll.setAttribute("disabled","")
    create.removeAttribute('disabled')
    getTotal()

}




// function  search

let searchBy = "title" 

function typeSearchtitle(){
    search.placeholder = "search by title"
    searchBy = "title"
    search.value = ''
    search.focus()
    showData()
}
function typeSearchcat(){
    search.placeholder = "search by category"
    searchBy = "category"
    search.value = ''
    search.focus()
    showData()
}

function dataSearch(){
    let table = ''
    if(searchBy == "title"){
        for(i = 0 ; i<data.length; i++){
            if(data[i].title.includes(search.value.toLowerCase())){
                table += `<tr>
                <td>${i}</td>
                <td>${data[i].title}</td>
                <td>${data[i].price}</td>
                <td>${data[i].taxes}</td>
                <td>${data[i].ads}</td>
                <td>${data[i].discount}</td>
                <td>${data[i].total}</td>
                <td>${data[i].category}</td>
                <td onclick = "updateBtn(${i})" id= "update">update</td>
                <td onclick = "deleteItem(${i})" id = "delete">delete</td>
                </tr>
                `
            }

        }
    }
    else{
        for(i = 0 ; i<data.length; i++){
            if(data[i].category.includes(search.value.toLowerCase())){
                table += `<tr>
                <td>${i}</td>
                <td>${data[i].title}</td>
                <td>${data[i].price}</td>
                <td>${data[i].taxes}</td>
                <td>${data[i].ads}</td>
                <td>${data[i].discount}</td>
                <td>${data[i].total}</td>
                <td>${data[i].category}</td>
                <td onclick = "updateBtn(${i})" id= "update">update</td>
                <td onclick = "deleteItem(${i})" id = "delete">delete</td>
                </tr>
                `
            }
        }
    }
    // console.log(search.value)
    document.getElementById('tbody').innerHTML = table;
}