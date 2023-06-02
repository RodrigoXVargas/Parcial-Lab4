export class Localidad {
    id: number;
    localidad: string;
    id_provincia: number;


  
    constructor(
      id: number = 0,
      localidad: string = "",
      id_provincia: number = 0
    ) {
      this.id = id;
      this.localidad = localidad;
      this.id_provincia = id_provincia;
    }
  }

  export class LocalidadDTO {
    localidad: string;
    id_provincia: number;


  
    constructor(
      localidad: string = "",
      id_provincia: number = 0,
    ) {
      this.localidad = localidad;
      this.id_provincia = id_provincia;
    }
  }
  