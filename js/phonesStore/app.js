let appStore = {
    bookedPhones: []
};

$('#myTabs a').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
});

document.addEventListener('DOMContentLoaded', enterPoint);

function enterPoint() {
    fetch('./data.json', {method: 'GET'})
        .then((res)=> {
            if (res.status == 200) {
                return res.json();
            }
        })
        .then((res)=> {
            appStore.results = res;
            dataRetrievedPoint(res);
        });

}

function dataRetrievedPoint(res) {
    let data = res;
    appStore.renderer = new Render(data);

    appStore.renderer.renderResultsToTable(appStore.results)
        .then(function(success){
            addDynamicallyListerners();
        });
}


function addDynamicallyListerners() {
    Array.prototype.forEach.call($$('.buy-phone-btn'), (item)=> {
        item.addEventListener('click', bookPhoneHandler, false);
    });

    let classes = ['.phoneCount', '.memory'];

    classes.forEach((itemClass)=> {
        Array.prototype.forEach.call($$(itemClass), (item)=> {
            item.addEventListener('change', autoDataChangedHandler, false);
            item.addEventListener('click', autoDataChangedHandler, false);
        });
    });
}

function autoDataChangedHandler(event) {

    let index = parseInt(event.target.classList[0].slice(-1)),
        phoneData = getPhoneData(index);

    //Dynamically calculating the sum
    let price = Phone.calculateSum(phoneData);
    appStore.renderer.renderPriceInResults(index, price);
}



function getPhoneData(index) {
    let phone = appStore.results[index],
        withMemory = $(`.memory-${index}`).checked,
        countPhones = parseInt($(`.phoneCount-${index}`).value);

    return {
        index,
        phone,
        withMemory,
        countPhones
    }
}

function bookPhoneHandler(event) {
    let index = parseInt(event.target.classList[0].slice(-1)),
        data = getPhoneData(index);

    data.price = Phone.calculateSum(data);

    let phone = new Phone(data);
    appStore.bookedPhones.push(phone);

    reRenderPurchaseGrid();
}

function addRemoveBtnListeners() {
    Array.prototype.forEach.call($$('.delete-item'), (item)=> {
        item.addEventListener('click', removeItemHandler, false);
    });
}

function reRenderPurchaseGrid() {
    appStore.renderer.renderBookedPhones();
    appStore.renderer.renderCommonSum(calculateCommonSum());
    appStore.renderer.renderCountItems();
    addRemoveBtnListeners();
}

function removeItemHandler(event) {
    let index = parseInt(event.target.classList[0].slice(-1));

    appStore.bookedPhones.splice(index, 1);
    reRenderPurchaseGrid();

}

function calculateCommonSum() {
    return appStore.bookedPhones.reduce((previousVal, item, index)=> {
        return previousVal + item.price;
    }, 0);
}
