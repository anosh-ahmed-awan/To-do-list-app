function dataontable(){
    let input=document.getElementById("userInput").value;
    
 if(input===""){

    alert("Enter Something!");
    return;

 }

 let table = document.getElementById("datatable");
  let newrow = table.insertRow();           
  let cell = newrow.insertCell(0);            
  cell.textContent = input;    

}
