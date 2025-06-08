import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TareasComponent } from './tareas/tareas.component';
import { RestorepassComponent } from './restorepass/restorepass.component';
import { NewtareaComponent } from './newtarea/newtarea.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'tareas', component: TareasComponent},
    {path: 'restore', component: RestorepassComponent},
    {path: 'newtarea', component:  NewtareaComponent},
    {path: '', redirectTo:'/login',pathMatch:'full'}
    

];
