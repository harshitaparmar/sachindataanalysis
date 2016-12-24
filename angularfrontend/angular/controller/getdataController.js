myApp.controller('getdataController',['$http','dataService',function($http,dataService) {

  //create a context
  var main = this;
  this.matches=[];
  this.totalRuns=0;
  this.notout=0;
  this.sachinnotbat=0;
  this.catches=0;
  this.wickets=0;
  this.totalinnings=0;
  this.halfcenturyagainst=[];
  this.halfcenturyruns=[];
  this.halfcenturyinnings=[];
  this.halfcenturydate=[];
  this.fullcenturyagainst=[];
  this.fullcenturyruns=[];
  this.fullcenturyinnings=[];
  this.fullcenturydate=[];
  this.runsinbattingfirst=0;
  this.runsinbattingsecond=0;
  this.battinginningone=[];
  this.battinginningtwo=[];
  this.totalbattingscore=[];
  this.runyeararray=[];
  this.runyeardetail={};
  this.fullcentury=0;
  this.halfcentury=0;
    this.battingavg;
  this.getsachindata=function(){
    dataService.getSachindata()
        .then(function successCallback(response) {
          main.matches=response.data;
           console.log(main.matches);
           main.length=main.matches.length;
           console.log(main.length);
           //console.log(main.batting_score);
           angular.forEach(main.matches, function(value){
            if(value.batting_score.toString().indexOf('*') > -1)
              {
                  value.batting_score = value.batting_score.replace('*', '');
                  main.notout++;
              }
              if(isNaN(value.batting_score))
              {
                  main.sachinnotbat++;
              }
              else
              {
                value.batting_score = parseInt(value.batting_score);
                main.totalbattingscore.push(value.batting_score);
                main.totalRuns=main.totalRuns+value.batting_score;
                main.runyeardetail.runs=value.batting_score;
                main.runyeardetail.year=(new Date(Date.parse(value.date))).getFullYear();
                main.runyeararray.push(main.runyeardetail);
                main.totalinnings++;
                if(value.batting_score>=50 && value.batting_score<100)
                {
                  main.halfcenturyruns.push(value.batting_score);
                  main.halfcenturyinnings.push(value.batting_innings);
                  main.halfcenturyagainst.push(value.opposition);
                  main.halfcenturydate.push((new Date(Date.parse(value.date))).getFullYear());
                  main.halfcentury++;
                }
                else if(value.batting_score>=100)
                {
                  
                  main.fullcenturyruns.push(value.batting_score);
                  main.fullcenturyinnings.push(value.batting_innings);
                  main.fullcenturyagainst.push(value.opposition);
                  main.fullcenturydate.push((new Date(Date.parse(value.date))).getFullYear());
                  main.fullcentury++;
                }
                 if(value.batting_innings.toString().indexOf('nd') > -1)
                  {
                    value.batting_innings = value.batting_innings.replace('*', '');
                  }
                  value.batting_innings = parseInt(value.batting_innings);
                  if(value.batting_innings==2)
                  {
                    main.battinginningtwo.push(value.batting_score);
                    main.runsinbattingsecond=main.runsinbattingsecond+value.batting_score;
                    
                  }
                  else if(value.batting_innings==1)
                  {
                    main.battinginningone.push(value.batting_score);
                    main.runsinbattingfirst=main.runsinbattingfirst+value.batting_score;
                    
                  }
              }
              if(!isNaN(value.catches))
              {
                main.catches=main.catches+value.catches;
              }
              if(!isNaN(value.wickets))
              {
                main.wickets=main.wickets+value.wickets;
              }
         
            });
            main.battingavg=(main.totalRuns / (main.totalinnings- main.notout)).toFixed(2);
            console.log(main.battingavg);
           console.log(main.totalRuns);
           console.log(main.notout);
           console.log(main.sachinnotbat);
           console.log(main.halfcentury);
           console.log(main.fullcentury);
           console.log(main.catches);
           console.log(main.wickets);
           console.log(main.runsinbattingsecond);
           console.log(main.runsinbattingfirst);
           console.log(main.runyeararray);
           console.log(main.halfcenturyarray);
           var ctx = document.getElementById("myChart");
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels:main.halfcenturyagainst,
                    datasets: [{
                        label: '# sachin fullcentury',
                        data: main.fullcenturyruns,
                        backgroundColor:'#03A9F4',
                        borderColor:'#03A9F4',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                }
            });
            var ctx1 = document.getElementById("myChart1");
            var myChart1 = new Chart(ctx1, {
                type: 'bar',
                data: {
                    labels:main.fullcenturyagainst,
                    datasets: [{
                        label: '# sachin halfcentury',
                        data: main.halfcenturyruns,
                        backgroundColor:'#26a69a',
                        borderColor:'#26a69a',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                }
            });
            var ctx2 = document.getElementById("myChart2");
            var data1 = {
              labels: [
                  "First Inning",
                  "Second Inning"
              ],
              datasets: [
                  {
                      data: [main.runsinbattingfirst,main.runsinbattingsecond],
                      backgroundColor: [
                          "#26a69a",
                          "#03A9F4"
                      ],
                      hoverBackgroundColor: [
                          "#26a69a",
                          "#03A9F4"
                      ]
                  }]
          };
          var myChart2 = new Chart(ctx2, {
            type: 'doughnut',
            data: data1
        });

        }, function errorCallback(response) {
          alert("some error occurred. Check the console.");
        });
  }  
 }]); // end controller