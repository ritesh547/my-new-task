import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductDataService } from '../../services/product-data.service';
@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnChanges, AfterViewInit {
  @Input() isDisplay: any = [];
  isFormDisplay: any;
  profileForm: any;
  productObj: any = [];
  id: any;
  isUpdate: boolean = false;

  constructor(private formBuilder: FormBuilder, private productDataService: ProductDataService) {
    this.profileForm = this.formBuilder.group({
      name: [''],
      Quantity: [''],
      price: [''],
      Description: [''],
      id: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.isFormDisplay = this.isDisplay;
      this.id = this.isDisplay.id;
      if (this.isDisplay.name) {
        this.isUpdate = true;
        this.productObj = {
          id: this.isDisplay.id,
          name: this.isDisplay.name,
          Quantity: this.isDisplay.Quantity,
          price: this.isDisplay.price,
          Description: this.isDisplay.Description,
        };
        this.profileForm.patchValue(this.productObj);
      }
    }
  }

  ngAfterViewInit(): void {
    this.isFormDisplay = this.isDisplay
  }

  ngOnInit() {
  }


  onSubmit() {
    if (this.profileForm.valid) {
      if (this.isUpdate) {
        this.productDataService.editProduct(this.id,this.productObj).subscribe(res => {
          alert("product update successfull")
        })
      } else {
        alert("product added successfull")
        console.log("dd");
        this.productDataService.addProduct(this.profileForm.value).subscribe(res => {
          alert("product added successfull")
        })
      }

    }
    else {
      console.log("form is not valid");
    }
  }
}
