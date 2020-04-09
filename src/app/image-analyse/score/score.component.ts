import {Component, Input, OnInit} from '@angular/core';
import {names} from '../../types';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {
  @Input() public score: number;
  @Input() public name: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  display(name: string) {
    return names[name];
  }

  getClass(): string {
    if (this.score < 0.33) {
      return 'green';
    } else if (this.score < 0.66) {
      return 'yellow';
    } else {
      return 'red';
    }
  }
}
