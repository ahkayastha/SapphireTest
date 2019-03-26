import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public selectedProviders = [
    
  ];
  public unselectedProviders = [
    {
      id: '1',
      name: 'John',
      address: '123 Greenway Blvd',
      phone: '8991234321'
    },
    {
      id: '2',
      name: 'Mary',
      address: '443 Windwhisper Road',
      phone: '2233211903'
    },
    {
      id: '3',
      name: 'Jason',
      address: '9992 Pumpkin Hollow',
      phone: '4343219384'
    }
  ];

  //selected : any;

 constructor() { }

 ngOnInit() {
   this.loadStorage();   
 }

 
 moveProvider(e:any,flg:string){
   if (flg === 'U')
   {
     this.selectedProviders.push(e);
     this.unselectedProviders.forEach( (item, index) => {
       if(item === e) this.unselectedProviders.splice(index,1);
     });
   }
   else{
     this.unselectedProviders.push(e);
     this.selectedProviders.forEach( (item, index) => {
       if(item === e) this.selectedProviders.splice(index,1);
     });
   }
   
   let sortedBuilds = this.selectedProviders.sort((n1, n2) => {
    return this.naturalCompare(n1.id, n2.id)
  });

  let sortedBuilds1 = this.unselectedProviders.sort((n1, n2) => {
    return this.naturalCompare(n1.id, n2.id)
  });
  

   this.setSessionStorage();
 }


//Set Session Storage
 setSessionStorage()
 {
   sessionStorage.removeItem("unSelected");
   sessionStorage.setItem("unSelected", JSON.stringify(this.unselectedProviders));
   sessionStorage.removeItem("selected");
   sessionStorage.setItem("selected", JSON.stringify(this.selectedProviders));
 }
 
 //Load data from sessionStorage
 loadStorage(){
    if (sessionStorage.length === 0)
    {
      sessionStorage.setItem("unSelected", JSON.stringify(this.unselectedProviders));
      sessionStorage.setItem("selected", JSON.stringify(this.selectedProviders));
    }
    else
    {
      this.unselectedProviders = JSON.parse(sessionStorage.getItem("unSelected"));
      this.selectedProviders = JSON.parse(sessionStorage.getItem("selected"));
    }
  }

  //Sort the array
  naturalCompare(a, b) {
    var ax = [], bx = [];
  
    a.replace(/(\d+)|(\D+)/g, function (_, $1, $2) { ax.push([$1 || Infinity, $2 || ""]) });
    b.replace(/(\d+)|(\D+)/g, function (_, $1, $2) { bx.push([$1 || Infinity, $2 || ""]) });
  
    while (ax.length && bx.length) {
      var an = ax.shift();
      var bn = bx.shift();
      var nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
      if (nn) return nn;
    }
  
    return ax.length - bx.length;
  }
}
