import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'htmlSanitized'
})
export class HtmlSanitizedPipe implements PipeTransform {

  transform(value: string): string {
    return this.decodeHtmlSpecialCaracters(value);
  }

  decodeHtmlSpecialCaracters(value: string) {
    let txt = document.createElement("textarea");
    txt.innerHTML = value;
    return txt.value;
  }
}
