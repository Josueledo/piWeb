import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faSearch,
  faArrowLeft,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { ReservaHotel } from '../../services/reserva.service';
import { Reserva } from '../../interfaces/reserva';
import { HotelService } from '../../services/hotel-service';
import { Hotel } from '../../interfaces/hotel';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user-service.service';
@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
})
export class UserPageComponent {
  faSearch = faSearch;
  faArrowLeft = faArrowLeft;
  faRightFromBracket = faRightFromBracket;
  router = inject(Router);
  allReservas: Reserva[] = [];
  userHoteis: Hotel[] = [];
  userReservas:Reserva[] = []
  reservaService = inject(ReservaHotel);
  hotelService = inject(HotelService);
  userService = inject(UserService);
  idUser = localStorage.getItem('angularToken');
  userName: string = '';
  allHotel: Hotel[] = [];
  allUsers:User[] = [];
  logout() {
    localStorage.removeItem('angularToken');
    this.router.navigateByUrl('/login');
  }
  ngOnInit() {
    this.getAllReservas();
    this.getAllHotel();
    this.getAllUsers()
  }
  getAllReservas() {
    this.reservaService.getAllReserva().subscribe({
      next: (data) => (this.allReservas = data),
      error: (err) => console.log(err),
    });
  }
  getAllHotel() {
    this.hotelService.getAllHotel().subscribe({
      next: (data) => {
        this.allHotel = data;
        this.userReserva();
      },
      error: (err) => console.log(err),
    });
  }
  userReserva() {
    this.userHoteis = []
    this.userReservas = []
    for (let i = 0; this.allReservas.length > i; i++) {
      if (this.allReservas[i].idUser === this.idUser) {
        this.userReservas.push(this.allReservas[i]);
        for (let j = 0; this.allHotel.length > j; j++) {
          if (this.allHotel[j].id === this.allReservas[i].idHotel) {
            this.userHoteis.push(this.allHotel[j]);
          }
        }
      }
    }
  }
  getUsername() {
    for(let i = 0;this.allUsers.length > i;i++){
      if(this.allUsers[i].id === this.idUser){
        this.userName = this.allUsers[i].name
      }
    }
  }
  getAllUsers(){
    this.userService.getAll().subscribe({
      next:(data)=>{
        this.allUsers = data
        this.getUsername()
      },
      error:(err) => console.log(err)
    })

  }
}
