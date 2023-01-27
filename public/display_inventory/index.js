console.log("Stockroom");

let containerVegElement = document.getElementById('stockroom')
const getData = async () => {
    let data = await fetch("/get_items");
    data.json().then((parsedData) => {
        console.log(parsedData); // array of objects
        // map through and put in HTML
        // push each individual one,  or push an array of HTML 
        parsedData.forEach((object) => {
            // if not ready to eat- red text
            let pTag = document.createElement("p"); // <p></p>
            pTag.textContent = `PRODUCT: ${object.name}`; // <p>apple</p>
            containerVegElement.appendChild(pTag);
        })
    })
}
getData();