document.addEventListener("DOMContentLoaded",()=>{
    const button = document.getElementById("buttonSubmit");
    const inputCPF = document.querySelector("#cpf");
    const res = document.querySelector("#res");
    const refresh = document.querySelector("#refresh");
    const buttonClean = document.querySelector("#buttonClean");

    buttonClean.addEventListener("click", function(){
        inputCPF.value = inputCPF.value.slice(0,-1);
    })

    refresh.addEventListener("click",function(){
        window.location.reload();
    });



    inputCPF.addEventListener("input", function () {
        this.value = maskCPF(this.value);
        
    }); 

    
    function getResult(button){ 
        let p = createRes(res);
        button.addEventListener("click",()=>{

            let verificar = isValidCPF();

            inputCPF.value = "";
            p.innerText = "";
            p.innerText = `${verificar}`;

            console.log(p);
        })
    };



    function maskCPF(num) {
        num = num.replace(/\D/g, "");

        if (num.length > 3)
            num = num.slice(0, 3) + "." + num.slice(3);

        if (num.length > 7)
            num = num.slice(0, 7) + "." + num.slice(7);

        if (num.length > 11)
            num = num.slice(0, 11) + "-" + num.slice(11);

        return num.slice(0, 14);
    }


       

    function removeCpfMask(){  //>>>>>>limpa o cpf dos elementos de . -;
        if(inputCPF.value.includes(".") && inputCPF.value.includes("-")){

            inputCPF.value = inputCPF.value.replace(/\D+/g,"");
            return inputCPF.value;
        }
        else{
            alert("insira um CPF");
            inputCPF.value = "";
        }    
    };



    function isValidCPF(){

        const cpf = removeCpfMask();
        const arrayCpf = [...cpf];
        const arrayCpfNumber = arrayCpf.map(Number);
    
        let firstDigit = calculateFirstDigit(arrayCpfNumber);
        let secondDigit = calculateSecondDigit(arrayCpfNumber);

        if(firstDigit === arrayCpfNumber[arrayCpfNumber.length - 2] 
            && secondDigit === arrayCpfNumber[arrayCpfNumber.length - 1]){
                console.log(firstDigit,secondDigit);
            return("cpf válido!");

        }else{
            console.log(firstDigit,secondDigit);
            return("cpf inválido!");
        }

        
    }




    function calculateFirstDigit(array){
        let weightedValues = array.map(function(num, indice) {
                return num * (10 - indice);
        });

        weightedValues.splice(-2,2);
        
        let weightedSum = weightedValues.reduce((acu, n)=>{
            acu += n;
            return acu;
        },0)

        let digit = null;

        if (11 - (weightedSum % 11) > 9){
            digit = 0;
        }else{
            digit = 11 - (weightedSum % 11)
        }

        return digit;
    };




    function calculateSecondDigit(array){
        let weightedValues = array.map(function(num, indice) {
                return num * (11 - indice);
        });

        weightedValues.splice(-1,1);
        
        let weightedSum = weightedValues.reduce((acu, n)=>{
            acu += n;
            return acu;
        },0);

        console.log(weightedSum);

        let digit = null;

        if (11 - (weightedSum % 11) > 9){
            digit = 0;
        }else{
            digit = 11 - (weightedSum % 11)
        }

        return digit;

    }



    function createRes(parent){ //>>>>>>cria um paragrafo
        const p = document.createElement("p");
        parent.appendChild(p);
        return p;
    }



   



    function ClickButtons(){
        this.addEventListener("click",(e)=>{
            const el = e.target;

            if(el.classList.contains("numbersButton")){
                inputCPF.value += el.innerText;
                inputCPF.value = maskCPF(inputCPF.value);
            }
            
        })
    };

    
    ClickButtons();
    getResult(button);



})