/**
 * Created by Nicolas Delahaigue on 09/10/16.
 */

import { Component, OnInit }    from '@angular/core';

import {
    Vector3
} from 'three';

import { SceneViewer, BoardModelViewer, TexturePoolViewer, PionModelViewer }          from "./threed-viewer/index";

//<select #kk="ngModel" [(ngModel)]="kind" (ngModelChange)="onKindSelected()">
//<option *ngFor="#p of kinds" [value]="p">{{p}}</option>
//</select>
//{{ kk.valid }}

@Component({
    selector  : 'editor',
    template  : `
    <div class="buttons">
        <button (click)="addSquareBoard()">Add 3*3 Board</button>
        <button (click)="addLongBoard()">Add 1*9 Board</button>
        <button (click)="addWhitePion()">Add White Pion</button>
        <button (click)="addBlackPion()">Add Black Pion</button>
        <label *ngFor="let val of modeTypes" >
        <input type="radio"  [value]="val" name="kind" [(ngModel)]="mode" (ngModelChange)="onModeSelected()">
        {{val}}
        </label>
        <button (click)="deleteObject()">Delete Object</button>
    </div>
    <div id="editorContainer"></div>
    `,
    styles    : [`
        .buttons {
            padding:5px;
        }
        .buttons label {
            margin-right : 10px
        }
    `],
    providers : []
})
export class ViewerEditorComponent implements OnInit {
    private scene:SceneViewer;
    private modeTypes = [
        'translate',
        'rotate',
        'scale'
    ];
    private mode = 'translate';

    ngOnInit():void {
        this.scene = new SceneViewer({
            width:1000,
            height:500
        });
        this.scene.setContainer('editorContainer');
        this.scene.setCameraPosition(new Vector3(0, 50.0, 0));
        this.scene.setCameraTarget(new Vector3(0, 0, 0));
        document.getElementById(this.scene.getContainer().toString()).addEventListener('mousedown', (event) => { this.scene.onMouseDown(event) }, false);
        this.scene.render();
        this.scene.animate();
    }

    addSquareBoard() {
        var board = new BoardModelViewer({
            dimensions: [32.6, 2.0, 32.6]

        });
        board.init((mesh) => {
            this.scene.addInScene(mesh);
            this.scene.render();
        });

    }

    addLongBoard() {
        var board = new BoardModelViewer({
            dimensions: [77.8, 2.0, 12.2],
        });
        board.texturesPaths[2] = 'pion_table.png';
        board.init((mesh) => {
            this.scene.addInScene(mesh);
            this.scene.render();
        });

    }

    addBlackPion() {
        var pion = new PionModelViewer({
            dimensions: [3.5, 3.5, 1.5]
        });
        pion.texturesPaths[0] = 'black.png';
        pion.init((mesh) => {
            this.scene.addInScene(mesh);
            this.scene.render();
        });
    }

    addWhitePion() {
        var pion = new PionModelViewer({
            dimensions: [3.5, 3.5, 1.5]
        });
        pion.init((mesh) => {
            this.scene.addInScene(mesh);
            this.scene.render();
        });

    }

    deleteObject() {
        this.scene.deleteSelected();
    }

    onModeSelected() {
        this.scene.setModeControler(this.mode);
    }



}
