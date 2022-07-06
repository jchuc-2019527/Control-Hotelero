export class reservationModel {
    constructor(
        public id: string,
        public startDate: Date,
        public finishDate: Date,
        public user: string,
        public hotel: string,
        public room: string,
        public services: [],
        public days: number,
        public status: boolean,
        public total: number,

    ) {
    }
  }