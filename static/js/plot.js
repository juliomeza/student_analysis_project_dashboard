function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
  
    // Use the list of school names to populate the select options
    d3.json("static/data/schools_2014-2017.json").then((data) => {
      //console.log(data)
      //console.log(Object.keys(data['School Name']).length)

      var schoolName = []

      for (i = 0; i < Object.keys(data['School Name']).length; i++) {
          //console.log(data['School Name'][i])
          if (schoolName.includes(data['School Name'][i])) {
              console.log('school exists')
          }
          else {
            schoolName.push(data['School Name'][i])
          }
      }

      console.log(schoolName)

      schoolName.forEach((school) => {
        selector
          .append("option")
          .text(school)
          .property("value", school);
      });
  

      
      var firstSchool = schoolName[0];
      addCharts(firstSchool);
    });
};
  
init();



function addCharts(schoolName) {
    d3.json('static/data/schools_2014-2017.json').then((data) => {
        //console.log(data)
        //console.log(data['School Name'])
        //console.log(Object.entries(data))
        //console.log(Object.entries(data['School Name']))

        var position = []
        Object.entries(data['School Name']).forEach((row) => {
            if(row[1] == schoolName) {
                position.push(row[0])
            }
            
            //console.log(row[1])
            //console.log(row[0])
        })
        //console.log(position)

        var year = []
        var grad = []
        var dropout = []
        
        position.forEach((pos) => {
            //console.log(pos)
            //console.log(data['School Name'][pos])
            year.push(data['Cohort Year'][pos])
            grad.push(data['% Grads'][pos])
            dropout.push(data['% Dropout'][pos])
        })
        // console.log(year)
        // console.log(grad)
        // console.log(dropout)



        var trace = [{
            type: 'bar',
            x: year,
            y: grad
          },
          {
            type: 'bar',
            x: year,
            y: dropout
          },
        
        ]
    
          Plotly.newPlot('plot_p_1_1', trace)
    })
}

//addCharts('BRONX HIGH SCHOOL FOR WRITING AND COMMUNICATION ARTS')



d3.selectAll("#selDataset").on("change", updateData);

function updateData() {
  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#selDataset");

  // Assign the dropdown menu item ID to a variable
  var dropdownMenuID = dropdownMenu.property("id");

  // Assign the dropdown menu option to a variable
  var selectedOption = dropdownMenu.property("value");

  //fillTable(selectedOption);
  addCharts(selectedOption);

  // console.log(dropdownMenuID);
  // console.log(selectedOption);
}