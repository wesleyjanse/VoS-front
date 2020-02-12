import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/security/authentication.service';
import { first } from 'rxjs/operators';
import { ReceptionService } from 'src/app/core/services/reception.service';
import { RFIDCard } from 'src/app/shared/models/rfidCard';
import { ToastService } from 'src/app/toast';

@Component({
  selector: 'app-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.scss']
})
export class ReceptionComponent implements OnInit {

  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  submitButtonValue = 'Scan';
  rfidCard: RFIDCard;

  constructor(private toast: ToastService, private router: Router, private fb: FormBuilder, private authenticationService: AuthenticationService, private receptionService: ReceptionService) {

  }

  ngOnInit() {
    this.f.numberPlate.disable();
    this.f.kind.valueChanges.subscribe(val => {
      console.log(val);
    })
  }

  get f() { return this.receptionForm.controls; }

  receptionForm = this.fb.group({
    kind: new FormControl('True', Validators.compose([
      Validators.required
    ])),
    card: new FormControl('', Validators.compose([
      Validators.required
    ])),
    numberPlate: new FormControl('')
  });

  resetForm() {
    this.submitted = false;
    this.receptionForm.reset();
    this.f.numberPlate.setValue('');
    this.f.kind.setValue('True');
    this.f.card.setValue('');
    this.f.card.enable();
    this.f.numberPlate.disable();
    this.submitButtonValue = "Scan";
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.f.card.value)
    this.f.card.disable();
    if (this.receptionForm.invalid) {
      return;
    }
    this.loading = true;
    if (this.submitButtonValue === 'Scan') {
      this.receptionService.getRFID(this.f.card.value).subscribe(res => {
        this.error = '';
        this.loading = false;
        this.f.numberPlate.setValue(res.licensePlate)
        this.f.numberPlate.enable();
        this.submitButtonValue = "Update";
        this.rfidCard = res;
      }, error => {
        this.error = 'Code is niet herkend';
        this.resetForm();
        this.loading = false;
      })
    } else {
      console.log("whut")
      var newcard: RFIDCard = {
        rfidCardID: this.rfidCard.rfidCardID,
        cardNumber: this.rfidCard.cardNumber,
        licensePlate: this.f.numberPlate.value,
        inSafeZone: this.rfidCard.inSafeZone,
        loadingTruck: this.f.kind.value
      }

      this.receptionService.updateRFID(newcard).subscribe(res => {
        this.error = '';
        this.loading = false;
        this.toast.show({
          text: `Kaart geüpdatet!`,
          type: 'success',
        })
        this.resetForm();
        console.log(res)
      },error => {
        this.error = 'Er is iets fout gegaan, probeer opnieuw.'
        this.resetForm();
        this.loading = false;
      })
    }
  }
}
