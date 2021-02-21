import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {NestedTreeControl} from '@angular/cdk/tree';
import {AccountService} from '../../services/account.service';
import { jsPDF } from 'jspdf';

interface DocNode {
  name: string;
  children?: DocNode[];
  progress: boolean;
  link?: string;
}


@Component({
  selector: 'app-diary',
  templateUrl: './lib.component.html',
  styleUrls: ['./lib.component.css']
})
export class LibComponent{
  treeControl = new NestedTreeControl<DocNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<DocNode>();
  hasChild = (_: number, node: DocNode) => !!node.children && node.children.length > 0;

  constructor(private dialogRef: MatDialogRef<LibComponent>, public ass: AccountService) {
    if (!this.ass.getActiveAccount().diary){
      this.dialogRef.close();
    }
    this.ass.getActiveAccount()?.diary?.courses?.forEach(x => {
        this.dataSource.data.push({
          name: x.name,
          progress: x.chapters.every(chapter => chapter.points > 0 ),
          link:  x.name,
          children: x.chapters.map(y => {
            return {
              name: y.name,
              link:  y.name,
              progress: y.points > 0
            };
          })
        });
      });
  }
  load(node: DocNode): void{
    const DATA = document.getElementById(node.link);
    console.log(DATA);
    const doc: jsPDF = new jsPDF('p', 'mm', 'a4');
    doc.html(DATA, {
      // tslint:disable-next-line:no-shadowed-variable
      callback: (doc) => {
        doc.output('bloburl');
      }
    }).then(r => {
      doc.save('assets/' + node.link);
    }).catch(err => {
      console.log(err);
    });
    // window.open('assets/' + node.link);
  }
}
