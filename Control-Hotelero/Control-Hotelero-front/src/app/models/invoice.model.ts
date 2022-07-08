export class invoiceModel {
    constructor(
        public id: string,
        public dateInvoice: Date,
        public startDate: Date,
        public finishDate: Date,
        public user: string,
        public hotel: string,
        public room: string,
        public roomPrice: string,
        public services: [],
        public days: number,
        public total: number

    ) {
    }
  }