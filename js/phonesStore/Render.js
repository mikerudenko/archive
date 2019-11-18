
class Render {
    constructor(data) {
        this.data = data;
        this.cities = data.cities;
        this.paths = data.paths;
    }


    renderPriceInResults(index, price) {
        $(`.price-${index}`).innerHTML = price;
    }

    renderCountItems() {
        $('.count-items').innerHTML = appStore.bookedPhones.length;
    }

    renderCommonSum(sum) {
        if(sum> 10000) {
            sum *= 0.8;

            sum+='(with discount)'
        }

        $('.common-sum').innerHTML = sum + ' UAH';
    }

    renderBookedPhones() {
        let content = appStore.bookedPhones.reduce((previousResult, item, index)=>{
            return previousResult + `<tr>
                    <td>${item.phone.name}</td>
                    <td>${(item.withMemory) ? 'Yes' : 'No'}</td>
                    <td>${item.countPhones}</td>
                    <td>${item.price}</td>
                    <td><i class="delete-item-${index} fa fa-times delete-item"></i></td>
            </tr>`
        }, ``);

        $('.common-sum-block').style.visibility = 'visible';
        $('.table-booked-phones tbody').innerHTML = content;
    }

    renderResultsToTable(results) {

        function replaceTemplate(template, searchPattern, value) {
            return template.replace(searchPattern, function() {
                return value;
            });
        }

        return fetch('./gridItem.html', {method: 'GET'})
            .then((res)=> {
                if (res.status == 200) {
                    return res.text();
                }
            })
            .then((template)=>{
                let content = results.reduce((previousVal, item, index)=> {

                    let str = replaceTemplate(template, '{{picture}}', item.picture);
                        str = replaceTemplate(str, '{{name}}', item.name);
                        str = replaceTemplate(str, '{{price}}', item.price);
                        str = replaceTemplate(str, '{{index}}', index);
                        str = replaceTemplate(str, '{{index}}', index);
                        str = replaceTemplate(str, '{{index}}', index);
                        str = replaceTemplate(str, '{{index}}', index);

                    return previousVal + str;
                }, ``);

                document.querySelector('#home .inner-panel').innerHTML = content;

                return true;
            });

    }

}