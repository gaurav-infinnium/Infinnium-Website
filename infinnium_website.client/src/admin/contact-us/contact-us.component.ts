/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ContactUsService } from '../../services/contactUsService.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-contact-us',
  imports: [CommonModule, FormsModule],
  providers: [ContactUsService],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css',
})
export class ContactUsComponent implements OnInit {
  contactRecords: any = [];
  isStatusDialog = false;
  statusDialogData: any;
  statusMessageString = "not connected yet.";
  inquiryDateString = "2025-04-14";
  mailSentStatusString = "successful";

  constructor(private contactUsService: ContactUsService) {}

  async ngOnInit() {
    this.contactRecords = await this.contactUsService.getAllContactUs();
  }

  openStatusDialog(data: any) {
    this.isStatusDialog = true;
    this.statusDialogData = {
      firstName: data.firstName,
      email: data.email,
      message: data.message,
      isActive: "🟢 active",
      isMailSent: "✅ successful",
      createdAt: data.createdAt
    };
    
    if(!data.isMailSent)
      this.statusDialogData.isMailSent = "❌ failed";

    if(!data.isActive)
      this.statusDialogData.isActive = "🔴 inactive";
  }

  closePopup() {
    this.isStatusDialog = false;
    this.statusDialogData = null;
  }

  // NOT IN USE
  showEditPopup = false;
  recordEdit: any = [];
  editStatus() {
    this.contactUsService.updateContactUs(this.recordEdit);
    // console.log(this.recordEdit);
    this.showEditPopup = false;
  }

  openPopUp(record: any) {
    this.showEditPopup = true;
    this.recordEdit = record;
    // console.log(this.recordEdit);
  }
}
