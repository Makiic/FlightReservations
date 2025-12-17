import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { AgentComponent } from '../components/agent/agent.component';
import { RoleGuard } from '../guards/role.guard';
import { FlightSearchComponent } from '../components/flight-search/flight-search.component';
import { MyReservationsComponent } from '../components/my-reservations/my-reservations.component';
import { ApproveReservationsComponent } from '../components/approve-reservations/approve-reservations.component';
import { AdminFlightComponent } from '../components/admin-flight/admin-flight.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'agent', component: ApproveReservationsComponent, canActivate: [RoleGuard], data: { roles: ['Agent'] } },
  { path: 'visitor', component: FlightSearchComponent, canActivate: [RoleGuard], data: { roles: ['Visitor'] } },
  { path: 'agent-panel', component: AgentComponent },
  { path: 'admin', component: AdminFlightComponent, canActivate: [RoleGuard], data: { roles: ['Administrator'] } },


];