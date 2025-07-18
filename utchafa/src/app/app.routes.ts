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

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'tareas', component: TareasComponent},
    {path: 'restore', component: RestorepassComponent},
    {path: 'newtarea', component:  NewtareaComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'error', component: Error404Component},
    {path: 'ayuda', component: AyudaComponent},
    {path: 'chat', component: ChatbotComponent},
    {path: 'buzon', component: BuzonComponent},
    {path: 'forget', component: ForgetpassComponent},
    {path:'mapa', component:MapaComponent},
    {path: '', redirectTo:'/login',pathMatch:'full'},
    { path: '**', component: Error404Component }  
    

];
