export class Provincia {
    id: number;
    provincia: string;


  
    constructor(
      id: number = 0,
      provincia: string = "",
    ) {
      this.id = id;
      this.provincia = provincia;
    }
  }

  export class ProvinciaDTO {
    provincia: string;
    
    constructor(
      provincia: string = "",
    ) {
      this.provincia = provincia;
    }
  }