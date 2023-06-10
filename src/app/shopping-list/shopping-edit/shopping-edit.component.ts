import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subsciption: Subscription;
  editMode = false;
  edittedItemIndex: number;
  edittedItem: Ingredient;

  constructor(private slService: ShoppingListService){}

  onAddItem(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount)
    if (this.editMode) {
      this.slService.updateIngredient(this.edittedItemIndex, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }
  
  onDelete(){
    this.slService.deleteIngredient(this.edittedItemIndex);
    this.onClear();
  }
  
  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  ngOnInit(): void {
      this.subsciption = this.slService.startedEditing.subscribe(
        (index: number) => {
          this.editMode = true;
          this.edittedItemIndex = index;
          this.edittedItem = this.slService.getIngredient(index);
          this.slForm.setValue({
            name: this.edittedItem.name,
            amount: this.edittedItem.amount
          })
        }
      );
  }

  ngOnDestroy(): void {
      this.subsciption.unsubscribe();
  }
}
