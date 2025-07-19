import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TareasComponent } from './tareas/tareas.component';
import { RestorepassComponent } from './restorepass/restorepass.component';
import { NewtareaComponent } from './newtarea/newtarea.component';
import { ContactComponent } from './contact/contact.component';
import { Error404Component } from './error404/error404.component';
import { AyudaComponent } from './ayuda/ayuda.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { BuzonComponent } from './buzon/buzon.component';
import { ForgetpassComponent } from './forgetpass/forgetpass.component';
import { MapaComponent } from './mapa/mapa.component';
// Importa el AuthGuard
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'tareas', component: TareasComponent, canActivate: [AuthGuard] },
    { path: 'restore', component: RestorepassComponent },
    { path: 'newtarea', component: NewtareaComponent, canActivate: [AuthGuard] },
    { path: 'contact', component: ContactComponent },
    { path: 'error', component: Error404Component },
    { path: 'ayuda', component: AyudaComponent, canActivate: [AuthGuard] },
    { path: 'chat', component: ChatbotComponent, canActivate: [AuthGuard] },
    { path: 'buzon', component: BuzonComponent, canActivate: [AuthGuard] },
    { path: 'forget', component: ForgetpassComponent },
    { path: 'mapa', component: MapaComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '', component: Error404Component }

];
