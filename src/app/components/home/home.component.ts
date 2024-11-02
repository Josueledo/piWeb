import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch,faUser,faStar } from '@fortawesome/free-solid-svg-icons';
import { HotelService } from '../../services/hotel-service';
import { Hotel } from '../../interfaces/hotel';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FontAwesomeModule,RouterLink,ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  faSearch = faSearch
  faUser = faUser
  faStar = faStar
  allHotel:Hotel[] = []
  hotelService = inject(HotelService)
  router= inject(Router)
  form = inject(FormBuilder)

  hoteisFiltrados: Hotel[] = []
  filtro = new FormControl('')

  ngOnInit(){

    this.getAllHotel()
  }
  filter(){
    if(this.filtro.value === '' || null){
      this.hoteisFiltrados = this.allHotel
    }

    this.filtro.valueChanges.subscribe(valor =>{
      if(valor === "" || null){
        this.hoteisFiltrados = this.allHotel
      }else{
        this.hoteisFiltrados = []
        for(let i = 0;this.allHotel.length > i;i++){
          if(this.allHotel[i].local.toLocaleLowerCase().includes(this.filtro.value!.toLowerCase())){
            this.hoteisFiltrados.push(this.allHotel[i])
          }
        }
        // this.hoteisFiltrados = this.allHotel.filter(hotel =>{
        //   hotel.local.toLowerCase().includes(valor!.toLocaleLowerCase())
        // })
      }
    })
  }
  getAllHotel(){
    this.hotelService.getAllHotel().subscribe({
      next:(data)=>{this.allHotel = data
        console.log(this.allHotel)
        this.filter()

      },error:(err) => console.log(err)
    })
  }
  openCard(hotelId: number){
    // const hotelString = hotelId.toString()
    this.router.navigate(['/reserva',hotelId])
  }
}
