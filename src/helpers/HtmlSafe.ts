import { Pipe } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Pipe({ name: 'HtmlSafe' })
export class HtmlSafe {
  constructor(private sanitizer: DomSanitizer) { }

  transform(html) : SafeUrl {
    
    return this.sanitizer.bypassSecurityTrustResourceUrl(html);
  }
}