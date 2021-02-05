import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'link'
})
export class LinkPipe implements PipeTransform {

  constructor(private _domSanitizer: DomSanitizer) {}

  transform(value: any, args?: any): any {
    return this._domSanitizer.bypassSecurityTrustHtml(this.stylize(value));
  }

  private stylize(text: string): string {
    let stylizedText: string = '';
    if (text && text.length > 0) {
      for (let t of text.split(" ")) {
        if (t.search(/(\((\w+)+\))(\[(.)+\])/g)!=-1 && t.length>1){
            let arrIn = t.split(')[');
            stylizedText += `<a href="#${arrIn[1].replace(']','')}" target="_blank">${arrIn[0].split('(')[1]}</a> `;
        }
        else if (t.search(/(\(([\u0400-\u04FF]+)+\))(\[(.)+\])/g)!=-1 && t.length>1){
          let arrIn = t.split(')[');
          stylizedText += `<a href="#${arrIn[1].replace(']','')}" target="_blank">${arrIn[0].split('(')[1]}</a> `;
        }
        else if (t.search(/(\*\*(\w+)\*\*)/g) !== -1 && t.length > 1){
          stylizedText += `<text style="font-weight: bold">${t.split('**')[1]}</text> `;
        }
        else if (t.search(/(\_\_(\w+)\_\_)/g) !== -1 && t.length > 1){
          stylizedText += `<text style="font-style: italic">${t.split('__')[1]}</text> `;
        }
        else if (t.search(/(\&(\w+)\&(\w+)\&)/g) !== -1 && t.length > 1){
          let arrIn = t.split('&');
          stylizedText += `<text style="color:${arrIn[2]}">${arrIn[1]}</text> `;
        }
        else if (t.search(/(\*\*([\u0400-\u04FF]+)\*\*)/g) !== -1 && t.length > 1){
          stylizedText += `<text style="font-weight: bold">${t.split('**')[1]}</text> `;
        }
        else if (t.search(/(\_\_([\u0400-\u04FF]+)\_\_)/g) !== -1 && t.length > 1){
          stylizedText += `<text style="font-style: italic">${t.split('__')[1]}</text> `;
        }
        else if (t.search(/(\&([\u0400-\u04FF]+)\&(\w+)\&)/g) !== -1 && t.length > 1){
          let arrIn = t.split('&');
          stylizedText += `<text style="color:${arrIn[2]}">${arrIn[1]}</text> `;
        }
        else
          stylizedText += t + " ";
      }
      return stylizedText;
    }
    else return text;
  }

}
