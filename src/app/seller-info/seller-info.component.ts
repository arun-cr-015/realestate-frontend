import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-seller-info',
  templateUrl: './seller-info.component.html',
  styleUrls: ['./seller-info.component.css']
})
export class SellerInfoComponent {
  constructor(
    public dialogRef: MatDialogRef<SellerInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  seller: any;

  ngOnInit(): void {
    
    this.seller = this.data.seller;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
