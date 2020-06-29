import { Component, OnInit } from '@angular/core';
import {AlertController, NavController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

//services
import {EventService} from "./providers/event.service";
import {AuthService} from "./providers/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private eventService: EventService,
    private _alertCtrl: AlertController,
    private navCtrl: NavController,
    private auth: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async ngOnInit() {

    // Check for network connection
    this.eventService.internetOffline$.subscribe(async () => {
      let alert = await this._alertCtrl.create({
        header: 'No Internet Connection',
        subHeader: 'Sorry, no Internet connectivity detected. Please reconnect and try again.',
        buttons: ['Dismiss']
      });
      alert.present();
    });

    // On Login Event, set root to Internal app page
    this.eventService.userLogined$.subscribe(userEventData => {
      this.navCtrl.navigateRoot(['/default']);
    });

    // On Logout Event, set root to Login Page
    this.eventService.userLoggedOut$.subscribe((logoutReason) => {
      // Set root to Login Page
      this.navCtrl.navigateRoot(['/login']);

      // Show Message explaining logout reason if there's one set
      if (logoutReason) {
        console.log(logoutReason);
        console.log('Invalid Access');
      }
    });

    // Check for network connection
    // this._events.subscribe('navigation:expiredIdCard', (userEventData) => {
    //   this.updateExpiredIdCount();
    // });
    //
    //
    // this._events.subscribe('navigation:printIdCard', (userEventData) => {
    //   this.printIdCount = userEventData;
    // });
  }

  /**
   * update expired count
   */
  updateExpiredIdCount() {
    // this.candidateIdCardService.totalExpiredIds().subscribe(result => {
    //   this.expiredIdCount = result.total;
    // });
  }


  logout(){
    this.auth.logout();
  }
}
