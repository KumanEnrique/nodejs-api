const form = document.getElementById('form')
const inputName = document.getElementById('name')
const tbody = document.getElementById('tbody')
const getProducts = document.getElementById('getProducts')
let id = 0

form.addEventListener('submit',async(e)=>{
    e.preventDefault()
    const response = await fetch('http://localhost:3000/products',{
        method: 'POST',
        body: JSON.stringify({
            name: inputName.value,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    /* tbody.innerHTML+= `
        <tr>
            <td>${id++}<td>
            <td><input type="text" name="modificable" value="${inputName.value}"><td>
            <td>
                <button class="btn btn-warning">delete</button>
                <button class="btn btn-success">update</button>
            <td>
        </tr`*/
        tbody.innerHTML = ""
        getProducts.click()
    inputName.value  = "" 
})

tbody.addEventListener("click",async(e)=>{
    if(e.target.innerHTML == "delete"){
        const id = e.target.parentNode.parentNode.children[0].innerHTML
        const response = await fetch(`http://localhost:3000/products/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        tbody.innerHTML = ""
        getProducts.click()
        console.log("se borro bien")
    
    }else if(e.target.innerHTML == "update"){
        console.dir(e.target.parentNode.parentNode.children[0].innerHTML);
        const id = e.target.parentNode.parentNode.children[0].innerHTML
        const name = e.target.parentNode.parentNode.children[1].children[0].value
        const response = await fetch(`http://localhost:3000/products/${id}`,{
            method: 'PUT',
            body: JSON.stringify({
                id,
                name
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        tbody.innerHTML = ""
        getProducts.click()
        console.log("se actualizo");
    }
});

getProducts.addEventListener('click',async()=>{
    const response = await fetch('http://localhost:3000/products')
    const data = await response.json()
    const datos = data
    data.forEach((elemento)=>{
        tbody.innerHTML+= `
        <tr>
            <td>${elemento.id}</td>
            <td><input type="text" name="modificable" value="${elemento.name}"></td>
            <td>
                <button class="btn btn-warning">delete</button>
                <button class="btn btn-success">update</button>
            </td>
        </tr>`
    })
});
//min 27.59

// Ejemplo implementando el metodo POST:
/* async function postData(url = '', data = {}) {
    // Opciones por defecto estan marcadas con un *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

postData('https://example.com/answer', { answer: 42 })
    .then(data => {
        console.log(data); // JSON data parsed by `data.json()` call
    }); */

