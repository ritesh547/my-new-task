import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AddProductComponent } from '../add-product/add-product.component';
import { ProductDataService } from '../../services/product-data.service';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [MatTableModule, HttpClientModule, AddProductComponent, MatFormFieldModule, MatSelectModule, MatInputModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  changeDetection: ChangeDetectionStrategy.Default

})

export class ProductListComponent implements OnInit {
  dataSource: any;
  isChildVisible: boolean = true;
  isDisplay: any = [];
  public productList: any = [];
  isShow: boolean = false;
  constructor(private productDataService: ProductDataService,private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    this.productDataService.getProductList().subscribe((res: any) => {
      this.productList = res;
      this.dataSource = this.productList;
    })
  }

  displayedColumns: string[] = ['name', 'Quantity', 'price', 'Description', "action"];

  public removeProduct(id: any) {
    this.productDataService.removeProduct(id).subscribe((res) => {
      this.getProductList();
    })
  }

  editProduct(productItem: any) {
    this.isDisplay = productItem;
    localStorage.setItem("productObj", JSON.stringify(productItem))
  }

  addProduct() {
    this.isShow = true;
    this.cdr.detectChanges();

    // this.isDisplay = true;
  }
}
