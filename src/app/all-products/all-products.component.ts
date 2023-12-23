import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  allProducts:any = []
  constructor (private api:ApiService,private toaster:ToasterService){}

  ngOnInit(): void {
    this.api.getAllproductsAPI().subscribe((res:any)=>{
      this.allProducts = res
    })
  }

  addtoWishlist(product:any){
    if(sessionStorage.getItem("token")){
      this.api.addToWishlistAPI(product.id).subscribe({
        next:(res:any)=>{
          this.toaster.showSuccess(`Product added to your wishlist`)
        },
        error:(err:any)=>{
          this.toaster.showError(err.error)
        }
      })
    }else{
      this.toaster.showWarning("Operation denied...please login")
    }

  }
  addtocart(product:any){
    if(sessionStorage.getItem("token")){
      this.toaster.showSuccess("proceed to add item to wishlist")
    }else{
      this.toaster.showWarning("Operation denied...please login")
    }
  }
}
