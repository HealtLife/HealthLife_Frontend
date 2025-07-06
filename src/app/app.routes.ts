import { Routes } from '@angular/router';
import { NotFoundPage } from './public/pages/not-found/not-found.page';
import { HomeContentComponent } from './HealthLife/Features/pages/home-content/home-content.component';
import { AnalysisContentPage } from './HealthLife/Features/pages/analysis-content/analysis-content.page';
import { AccessPagePage } from './HealthLife/Access/pages/access-page/access-page.page';
import { ProfileEditComponent } from './HealthLife/Features/pages/profile-content/profile-edit/profile-edit.component';
import { ProfileViewComponent } from './HealthLife/Features/pages/profile-content/profile-view/profile-view.component';
import {RutinaListComponent} from './HealthLife/Rutines/components/rutina-list/rutina-list.component';
import { AuthGuard } from './shared/guards/auth.guard';
import {CommunityContentComponent} from './HealthLife/Features/pages/community-content/community-content.component';
import {ActivitiesPageComponent} from './HealthLife/Activities/components/activities-page/activities-page.component';
import {NotificationsComponent} from './HealthLife/Activities/components/notifications/notifications.component';
import {SubscriptionComponent} from './HealthLife/Features/pages/profile-content/subscription/subscription.component';
import {RecommendationsComponent} from './HealthLife/Activities/components/recommendations/recommendations.component';
import {NutritionViewComponent} from './HealthLife/Nutrition/Pages/nutrition-view/nutrition-view.component';


export const routes: Routes = [
  { path: 'home', component: HomeContentComponent}, // { path: 'home', component: HomeContentComponent, canActivate: [AuthGuard] },
  { path: 'home/analysis', component: AnalysisContentPage },
  { path: 'home/nutrition', component: NutritionViewComponent},
  {path: 'home/rutines', component: RutinaListComponent},
  { path: 'home/activities', component: ActivitiesPageComponent},
  { path: 'notifications', component: NotificationsComponent},
  { path: 'access', component: AccessPagePage },
  { path: 'profile/view', component: ProfileViewComponent }, //{ path: 'profile/view', component: ProfileViewComponent, canActivate: [AuthGuard] },
  { path: 'profile/edit', component: ProfileEditComponent}, // { path: 'profile/edit', component: ProfileEditComponent, canActivate: [AuthGuard] },
  { path: 'profile/payment', component: SubscriptionComponent},
  { path: 'recommendations', component: RecommendationsComponent },
  { path: '', redirectTo: '/access', pathMatch: 'full' },
  { path: '**', component: NotFoundPage },
];
