import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FilterComponent implements OnInit {

  name: string = '';
  type: string = '';
  
  constructor(private router: Router) {}

  ngOnInit(): void { }

  goToResult() {
    this.router.navigate(['result'], {queryParams: 
      {
        'name': this.name, 
        'type': this.type
      }
    })
  }

}
