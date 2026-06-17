console.log("Hey! I'm index.js");

const amountNumEle = document.getElementById("amountNumber");

const inputRateNumEle = document.getElementById("interestNumber");

const timeInYearNumEle = document.getElementById("tenureNumber");


document.querySelectorAll("input[type=range]").forEach(ele => {
    ele.addEventListener("wheel", event => {

        if (ele.id == "amountSlider") {

            if (event.deltaY < 0) {
                ele.valueAsNumber += 1000000;
            } else {
                ele.value -= 1000000;
            }

        } else {

            if (event.deltaY < 0) {
                ele.valueAsNumber += 1;
            } else {
                ele.value -= 1;
            }
        }

        event.preventDefault();
        event.stopPropagation();

    })
});


document.querySelectorAll("input[type=range],input[type=number]").forEach(e => {

    e.addEventListener("wheel", function (e) {

        if (e.target.type == "number") { e.target.parentElement.parentElement.querySelector("input[type=range]").value = e.target.value }
        if (e.target.type == "range") { e.target.parentElement.parentElement.querySelector("input[type=number]").value = e.target.value }

        EMICaluculate();
    })

    e.addEventListener("input", function (e) {

        if (e.target.type == "number") { e.target.parentElement.parentElement.querySelector("input[type=range]").value = e.target.value }
        if (e.target.type == "range") { e.target.parentElement.parentElement.querySelector("input[type=number]").value = e.target.value }

        EMICaluculate();
    })
});

document.querySelectorAll("input[type=range],input[type=number]").forEach((e) => {
    e.addEventListener("change", function (e) {

        if (e.target.type == "number") { e.target.parentElement.parentElement.querySelector("input[type=range]").value = e.target.value }
        if (e.target.type == "range") { e.target.parentElement.parentElement.querySelector("input[type=number]").value = e.target.value }

        EMICaluculate();
    })
});


const EMICaluculate = () => {

    let amount = amountNumEle.valueAsNumber;

    let inputRate = inputRateNumEle.valueAsNumber;

    let rate = inputRate / (12 * 100);

    let timeInYear = timeInYearNumEle.valueAsNumber;

    let time = timeInYear * 12;


    // Define minimum and maximum values
    const minamount = parseFloat(amountNumEle.min);
    const mininputRate = parseFloat(inputRateNumEle.min);
    const maxinputRate = parseFloat(inputRateNumEle.max);
    const minTenure = parseFloat(timeInYearNumEle.min);
    const maxTenure = parseFloat(timeInYearNumEle.max);

    const errorEle = document.getElementById("error");
    errorEle.innerHTML = ``;

    amountNumEle.style.color = "inherit";
    inputRateNumEle.style.color = "inherit";
    inputRateNumEle.style.color = "inherit";
    timeInYearNumEle.style.color = "inherit";
    timeInYearNumEle.style.color = "inherit";


    document.getElementById("EMI").style.color = "inherit";
    document.getElementById("totalInterest").style.color = "inherit";
    document.getElementById("totalPayableAmount").style.color = "inherit";


    console.log(amount)
    console.log(inputRate)
    console.log(timeInYear)

    const errorList = [];


    let hasErrors = false;

    if (amount < minamount || amount == NaN) {

        errorList.push(`Loan amount must be at least ${minamount.toLocaleString("en-IN")}`);
        amountNumEle.style.color = "var(--clr-4)";
        hasErrors = true;

    };

    if (inputRate < mininputRate || inputRate == NaN) {

        errorList.push(`Interest rate must be at least ${mininputRate}% per year.`);
        inputRateNumEle.style.color = "var(--clr-4)";
        hasErrors = true;

    };
    if (inputRate > maxinputRate) {

        errorList.push(`Interest rate cannot exceed ${maxinputRate}% per year.`);
        inputRateNumEle.style.color = "var(--clr-4)";
        hasErrors = true;

    };

    if (timeInYear < minTenure || timeInYear == NaN) {

        errorList.push(`Loan tenure must be at least ${minTenure} year(s).`);
        timeInYearNumEle.style.color = "var(--clr-4)";
        hasErrors = true;

    };
    if (timeInYear > maxTenure) {

        errorList.push(`Loan tenure cannot exceed ${maxTenure} year(s).`);
        timeInYearNumEle.style.color = "var(--clr-4)";
        hasErrors = true;

    };

    if (hasErrors) {

        errorList.forEach(e => {
            let newSpan = document.createElement("span");
            newSpan.textContent = e;
            errorEle.append(newSpan)
        })

        document.getElementById("EMI").innerText = "Nil";
        document.getElementById("totalInterest").innerText = "Nil";
        document.getElementById("totalPayableAmount").innerText = "Nil";
        document.getElementById("totalPayableAmountDetails").innerText = ``;


        document.documentElement.style.setProperty('--piCircleDataPar', `0%`);
        document.getElementById("principalAmountParcent").innerText = "Nil";
        document.getElementById("totalInterestParcent").innerText = "Nil";

        document.getElementById("EMI").style.color = 'var(--clr-4)';
        document.getElementById("totalInterest").style.color = 'var(--clr-4)';
        document.getElementById("totalPayableAmount").style.color = 'var(--clr-4)';


        // errorEle.scrollIntoView({ behavior: "smooth", block: "start" });

        if (errorEle.classList.contains("shake")) {

            errorEle.classList.remove("shake");

            setTimeout(() => {
                errorEle.classList.add("shake");
            }, 100)

        } else {
            errorEle.classList.add("shake");
        }

        return false;
    }


    // If no errors

    let EMI = (amount * rate * Math.pow((1 + rate), time)) / (Math.pow((1 + rate), time) - 1);

    let printEMI = EMI.toFixed(2);

    let totalAmountPayable = (EMI * time).toFixed(2);

    let totalInterest = (totalAmountPayable - amount).toFixed(2);

    let principalAmountInParcent = ((amount / totalAmountPayable) * 100).toFixed(2);

    let totalInterestInParcent = ((totalInterest / totalAmountPayable) * 100).toFixed(2);


    console.log(`Amount : ${amount}\nInput Rate : ${inputRate}\nRate : ${rate}\nTime : ${time}\n\nEMI : ${printEMI}\nInterest : ${totalInterest}\nTotal : ${totalAmountPayable}\n\nPrincipal Amount : ${principalAmountInParcent} %\nTotal Interest : ${totalInterestInParcent} %`);


    document.getElementById("EMI").innerText = Math.round(parseFloat(printEMI)).toLocaleString('en-IN');
    document.getElementById("totalInterest").innerText = Math.round(parseFloat(totalInterest)).toLocaleString('en-IN');
    document.getElementById("totalPayableAmount").innerText = Math.round(parseFloat(totalAmountPayable)).toLocaleString('en-IN');
    document.getElementById("totalPayableAmountDetails").innerText = `(${Math.round(parseFloat(amount)).toLocaleString('en-IN')} + ${Math.round(parseFloat(totalInterest)).toLocaleString('en-IN')})`;

    document.documentElement.style.setProperty('--piCircleDataPar', `${totalInterestInParcent}%`);
    document.getElementById("principalAmountParcent").innerText = principalAmountInParcent;
    document.getElementById("totalInterestParcent").innerText = totalInterestInParcent;

};