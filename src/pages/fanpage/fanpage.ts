import { Component } from '@angular/core';


@Component({
  selector: 'page-fan',
  templateUrl: 'fanpage.html'
})
export class FanPage {
  items: Array<string>;

  ngOnInit() {
    this.setItems();
  }

  setItems(){
    this.items =


    this.items = ['John Miller', 'Jake Miller', 'Sally Miller', 'Mike Miller', 'Kate Miller'];
  }

  filterItems(ev: any) {
    this.setItems();
    let val = ev.target.value;

    if(val && val.trim() !== ''){
      this.items = this.items.filter(function(item){
        return item.toLowerCase().includes(val.toLowerCase());
      });
    }
  }

    
}
