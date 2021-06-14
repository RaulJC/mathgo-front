import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GroupsService } from '../core/services/groups.service';
import { ProblemSharingService } from '../core/services/problem-sharing.service';
import { PublicServicesService } from '../core/services/public-services.service';
import { IGrupo } from '../shared/interfaces/interfaces';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {

  grupos: IGrupo[];
  grupoSeleccionado : IGrupo;
  componente: string = "grupos";
  filasSeleccionadas : number[] = [];
  enunciado : string;
  problema : string;
  variables: string[];
  datos : string[][];
  guardando: boolean = false;
  generando: boolean = false;
  descargando: boolean = false;
  visualizar: boolean = false;

  crearGrupoForm: FormGroup = new FormGroup({
    titulo: new FormControl(''),
    descripcion: new FormControl('')
  });

  constructor(private grupoService: GroupsService,
     private problemSharingService: ProblemSharingService,
     private publicServices: PublicServicesService) { }

  ngOnInit(): void {
    this.grupoService.obtenerGrupos().subscribe(response=>{
      this.grupos = response.grupos;
    })
  }

  crearGrupo(){
    let titulo : string = this.crearGrupoForm.controls.titulo.value;
    let descripcion : string = this.crearGrupoForm.controls.descripcion.value;
    let nuevoGrupo :IGrupo ={id:0,titulo:titulo,descripcion:descripcion,masterfile:"",variables:[],datos:[]};
    this.grupoService.crearGrupo(nuevoGrupo).subscribe(response=>{
      this.grupos.push(response.grupo);
      this.crearGrupoForm.reset();
    })
  }

  generarEnunciado(event:any){
    this.enunciado = event;
  }

  generarProblema(event:any){
    this.problema = event;
  }

  seleccionarGrupo(idGrupo:number){
    this.componente = "editor";
    this.grupoService.obtenerGrupo(idGrupo).subscribe(response=>{
      this.grupoSeleccionado = response.grupo;
      this.problemSharingService.setProblemaActual(this.grupoSeleccionado);
    })
    
  }
  
  eliminarGrupo(grupo:IGrupo){
      this.grupoService.eliminarGrupo(grupo.id).subscribe(response=>{
        if(response.esEliminado){
          var index = this.grupos.indexOf(grupo);
          this.grupos.splice(index,1)
        } ;
      })
  }

  guardarPlantilla(move:boolean){
    this.guardando = true;
    this.visualizar = false;
    this.problemSharingService.getProblemaActual().subscribe(problema=>{
      this.grupoService.guardarGrupo(problema).subscribe(response=>{
        this.problemSharingService.setProblemaActual(response.grupo);
        this.grupoSeleccionado = response.grupo;
        setTimeout(()=>{
          this.guardando = false;
          if(move) this.componente = "datos";
        },1000);
      });
    }).unsubscribe();
  }

  seleccionarDatos(){
    this.guardarPlantilla(true);
  }

  volverMisGrupos(){
    this.componente = "grupos";
  }

  volverEditor(){
    this.visualizar = false;
    this.componente = "editor";
  }

  onCheckboxChange(numero:number){
    if(this.filasSeleccionadas.includes(numero)){
      var indice = this.filasSeleccionadas.indexOf(numero);
      this.filasSeleccionadas.splice(indice,1);
    }else{
      this.filasSeleccionadas.push(numero);
    }
  }

  customTrackBy(index: number, obj: any): any {
    return index;
  }

  crearFila(){
    let nuevaFila:string[] = [];
    this.grupoSeleccionado.variables.forEach(variable=>{
      nuevaFila.push("");
    });
    this.grupoSeleccionado.datos.push(nuevaFila);
  }

  borrarFila(){
    this.filasSeleccionadas.forEach(indice=>{
      this.grupoSeleccionado.datos.splice(indice,1);
    });
    this.filasSeleccionadas = [];
  }

  generarPDF(){
    this.generando = true;
    if(!this.visualizar){
      this.grupoService.generarPdfEjemplo(this.grupoSeleccionado.id).subscribe(response =>{
        this.visualizar = false;
        if(response) {
          this.generando = false;
          this.visualizar = true;
        }
      });
    }
  }

  descargarPdfs(){
    this.descargando = true;
    if(!this.visualizar){
      this.grupoService.descargarPdfs(this.grupoSeleccionado.id).subscribe(response =>{
        if(response) {
          this.descargando = false;
        }
      });
    }
  }

  visualizarPDF(){
    this.publicServices.visualizarPdf();
  }
}
