import { AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
  @ViewChildren('gifImage') gifImages!: QueryList<ElementRef<HTMLImageElement>>;

  gifSrcs = [
    'assets/images/Programbilder/search.gif',
    'assets/images/Programbilder/mortarboard.gif',
    'assets/images/Programbilder/notebook.gif'
  ];

  staticSrcs = [
    'assets/images/Programbilder/search.png',
    'assets/images/Programbilder/mortarboard.png',
    'assets/images/Programbilder/notebook.png'
  ];

  ngAfterViewInit(): void {
    this.gifImages.forEach((gifImage, index) => {
      gifImage.nativeElement.addEventListener('mouseenter', () => {
        gifImage.nativeElement.src = this.gifSrcs[index];
      });

      gifImage.nativeElement.addEventListener('mouseleave', () => {
        gifImage.nativeElement.src = this.staticSrcs[index];
      });
    });
  }
}