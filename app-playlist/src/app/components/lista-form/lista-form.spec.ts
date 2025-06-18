import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaForm } from './lista-form';

describe('ListaForm', () => {
  let component: ListaForm;
  let fixture: ComponentFixture<ListaForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
