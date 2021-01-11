import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { GetbooksComponent } from './component/getbooks/getbooks.component';
import { LoginComponent } from './component/login/login.component';
import { MyCartComponent } from './component/my-cart/my-cart.component';
import { OrderComponent } from './component/order/order.component';
import { RegisterComponent } from './component/register/register.component';
import { WishlistComponent } from './component/wishlist/wishlist.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: '', component: LoginComponent },
  {path: 'dashboard',component: DashboardComponent,
    children:[
      { path: '', component: GetbooksComponent },
    ]
  },
  { path:'my-cart',component:MyCartComponent },
  { path:'order',component:OrderComponent },
  { path:'wishlist',component:WishlistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
