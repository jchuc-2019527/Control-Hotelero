export class roomModel {
    constructor(
        public id: string,
        public name: string,
        public type: string,
        public price: number,
        public dates: [],
        public hotel: string,
        public status: boolean

    ) {
    }
  }