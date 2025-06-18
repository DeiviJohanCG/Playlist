import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListaFormComponent } from './components/lista-form/lista-form';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListaFormComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected title = 'app-playlist';
}
