import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BrandOptionPage } from './brand-option.page';

describe('BrandOptionPage', () => {
  let component: BrandOptionPage;
  let fixture: ComponentFixture<BrandOptionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandOptionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BrandOptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
