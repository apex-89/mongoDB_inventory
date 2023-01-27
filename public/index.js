console.log("js file connected");

let submitButton = document.getElementById('submit-button');

submitButton.addEventListener('click', async () => {


    let priceNumber = +document.getElementById('price-input').value;
    let inventoryNumber = +document.getElementById('inventory-input').value;
    let deliveryDate = document.getElementById('date-input').value;
    let deliveryAmtNumber = +document.getElementById('amt-input').value;
    let nameString = document.getElementById('name-input').value;

    const item = {
        priceNumber, 
        inventoryNumber, 
        deliveryDate,
        deliveryAmtNumber, 
        nameString
    }

    let response = await fetch('http://localhost:5000/create_item', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item)
    })

    let uploadStatusTag = document.getElementById('upload-status');
        console.log(response.status);
        if (response.status === 200) {
            console.log(response);
            console.log("upload complete!!!");
            uploadStatusTag.textContent = "Upload Completed";
            uploadStatusTag.style.color = "green";

        } else {
            console.log(response);
            console.log("upload failed");
            console.log;
            uploadStatusTag.textContent = "Upload Failed";
            uploadStatusTag.style.color = "red";
        }
});

let clearButton = document.getElementById('clear-button');

clearButton.addEventListener('click', () => {
    document.getElementById('myForm').reset();
});

let stockButton = document.getElementById('stock');

stockButton.addEventListener('click', () => {
    window.location.href = "./display_inventory"
})