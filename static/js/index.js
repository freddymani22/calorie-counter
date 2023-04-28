const table = document.querySelector('#table');
let carbs = 0,protein = 0, fat=0, calories=0;

for(let i = 1;i<table.rows.length-1;i++){
    carbs += parseFloat(table.rows[i].cells[2].innerText);
    protein += parseFloat(table.rows[i].cells[3].innerText);
    fat += parseFloat(table.rows[i].cells[4].innerText);
    calories += parseFloat(table.rows[i].cells[5].innerText);

}
 document.querySelector('#carbs').innerText = `${Math.round(carbs)} (gms)`
 document.querySelector('#protein').innerText = `${Math.round(protein)} (gms)`
 document.querySelector('#fat').innerText = `${Math.round(fat)} (gms)`
 document.querySelector('#calories').innerText = `${Math.round(calories)} (Kcal)`

let calPer = (calories/2500) * 100;
Math.round(calPer)
document.querySelector('.progress-bar').setAttribute('style',`width:${Math.round(calPer)}%;`);
document.querySelector('.progress-bar').innerText = `${Math.round(calPer)}%`;

let total = carbs+protein+fat;
let carbsPer = Math.round((carbs/total)*100)
let proteinPer = Math.round((protein/total)*100)
let fatPer = Math.round((fat/total)*100)

  const ctx = document.getElementById('myChart');

  new Chart(ctx, {
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
        borderColor:[
            'rgba(255,99,132)',
            'rgba(54,162,235)',
            'rgba(255,206,86)',

        ]

      }]
    },
    options: {
        plugins:{  title: {
            display: true,
            text: 'Chart Title',
          }},
    }
  });
