const table = document.querySelector('#table');
let carbs = 0, protein = 0, fat = 0, calories = 0;
const submitBtn = document.querySelector('.submit-input');
let tableString = '';
let chart;


async function updateList() {
  const res = await axios.get('http://localhost:8000/api/')
  const data = res.data;
  if (data.length===0){
    console.log('working')
    document.querySelector('.chart-data').style.setProperty('display', 'none', 'important');
  }else{
    document.querySelector('.chart-data').style.setProperty('display', 'flex', 'important');
  }
  const tableBody = document.querySelector('.table-body');
  tableBody.innerHTML= '';

  for (let food of data) {
    let buttonId = food.id;
    let buttonElement = document.createElement('i');
    buttonElement.setAttribute('id', buttonId);
    buttonElement.classList.add('delete-button', 'fa-solid', 'fa-trash-can','ms-2');

    let tdButtonElement = document.createElement('td');
    tdButtonElement.appendChild(buttonElement);

    let tdNameElement = document.createElement('td');
    tdNameElement.textContent = food.name;

    let tdCarbsElement = document.createElement('td');
    tdCarbsElement.textContent = food.carbs;

    let tdProteinElement = document.createElement('td');
    tdProteinElement.textContent = food.protein;

    let tdFatElement = document.createElement('td');
    tdFatElement.textContent = food.fat;

    let tdCaloriesElement = document.createElement('td');
    tdCaloriesElement.textContent = food.calories;

    let trElement = document.createElement('tr');
    trElement.appendChild(tdButtonElement);
    trElement.appendChild(tdNameElement);
    trElement.appendChild(tdCarbsElement);
    trElement.appendChild(tdProteinElement);
    trElement.appendChild(tdFatElement);
    trElement.appendChild(tdCaloriesElement);

    tableBody.appendChild(trElement)
  }

  const deleteBtnAll = document.querySelectorAll(".delete-button");
  for (let delBtn of deleteBtnAll) {
    
    delBtn.addEventListener('click', async (e) => {
      e.preventDefault()
      const delBtnId = delBtn.id;
      const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
      const headers = {
        headers: {
          'X-CSRFToken': csrfToken
        }
  
      }
      await axios.delete(`http://localhost:8000/api/${delBtnId}/`, headers)
      await updateList()
      await tableFooter()
    })
  }

  

tableFooter()


}


updateList()





submitBtn.addEventListener('click', async (e) => {
  submitBtn.checkValidity();
  e.preventDefault()
  document.querySelector('.table-body').innerHTML = '';
  const foodname = document.querySelector('#food-name').value;
  const carbs = document.querySelector('#carbs-input').value;
  const protein = document.querySelector('#protein-input').value;
  const fat = document.querySelector('#fat-input').value;
  const calories = document.querySelector('#calories-input').value;
  const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
  const data = { name: foodname, carbs: carbs, protein: protein, fat: fat, calories: calories }
  const headers = {
    headers: {
      'X-CSRFToken': csrfToken
    }
  }

  await axios.post('http://localhost:8000/api/', data, headers);


  updateList()
 
  tableFooter()

})







async function tableFooter() {
carbs = 0;
protein = 0;
fat = 0;
calories = 0;

  for (let i = 1; i < table.rows.length - 1; i++) {
    carbs += parseFloat(table.rows[i].cells[2].innerText);
    protein += parseFloat(table.rows[i].cells[3].innerText);
    fat += parseFloat(table.rows[i].cells[4].innerText);
    calories += parseFloat(table.rows[i].cells[5].innerText);

  }
  document.querySelector('#carbs').innerText = `${Math.round(carbs)} (gms)`
  document.querySelector('#protein').innerText = `${Math.round(protein)} (gms)`
  document.querySelector('#fat').innerText = `${Math.round(fat)} (gms)`
  document.querySelector('#calories').innerText = `${Math.round(calories)} (Kcal)`




  const calLimit = document.querySelector('.cal-limit')
  let calLimitValue = calLimit.value;
  console.log(calLimitValue)

  let calPer = (calories / calLimitValue) * 100;
  if (calLimitValue != '' && calLimitValue != '0') {
    document.querySelector('.progress-bar').setAttribute('style', `width:${Math.round(calPer)}%;`);
    document.querySelector('.progress-bar').innerText = `${Math.round(calPer)}%`;
  }

  let total = carbs + protein + fat;
  let carbsPer = Math.round((carbs / total) * 100)
  let proteinPer = Math.round((protein / total) * 100)
  let fatPer = Math.round((fat / total) * 100)

  const ctx = document.querySelector('.my-chart');

  if (typeof chart !== 'undefined' && chart instanceof Chart){
    chart.destroy();
  }

  chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Carbs', 'Protein', 'Fat'],
      datasets: [{
        label: '%',
        data: [carbsPer, proteinPer, fatPer],
        borderWidth: 1,
        backgroundColor:
          [
            'rgba(255,99,132)',
            'rgba(54,162,235)',
            'rgba(255,206,86)',
          ],
        borderColor: [
          'rgba(255,99,132)',
          'rgba(54,162,235)',
          'rgba(255,206,86)',

        ]

      }]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Breakdown',
          color:'white'
        },
        legend:{
          labels:{
            color:'white'
          },

        }
      }, 
    },
    
  });


}





