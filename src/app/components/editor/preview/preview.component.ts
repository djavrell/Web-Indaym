/**
 * Created by nicolas on 14/04/17.
 */

import {
  Component,
  OnInit,
  OnDestroy
}                                 from '@angular/core';
import { EventDispatcher }        from 'three';

import { GameControllerService }  from '../../../../services/gameController.service';
import {
  PlayerViewer,
  ModelsLoader
}                                 from '../../../threed-viewer'

@Component({
  selector  : 'ia-preview',
  template  : require('./preview.component.html'),
  styles    : [
    require('./preview.component.css')
  ],
  providers : [],
})
export class PreviewComponent implements OnInit, OnDestroy {
  private gameController;
  private scene:PlayerViewer;
  private modelsLoader:ModelsLoader;
  sset = false;

  constructor(private gameControllerService:GameControllerService) {
    this.gameController = gameControllerService.gameController;
  }

  ngOnInit(): void {
    this.scene = new PlayerViewer({
      width: 1500,
      height: 900
    });
    this.scene.defaultLoad('previewContainer');
    this.scene.domElement.addEventListener('mousedown', (event) => this.scene.onMouseDown(event), false);
    this.scene.domElement.addEventListener('mousemove', (event) => this.scene.onMouseMove(event), false);
    this.scene.domElement.addEventListener('mouseup',   (event) => this.scene.onMouseUp(event), false);

    this.scene.eventDispatcher = new EventDispatcher();
    this.modelsLoader = new ModelsLoader(this.scene);
    this.modelsLoader.loadModels(this.gameController.getObjects());
    this.modelsLoader.initEvents(this.gameController);
    // this.scene.domElement.addEventListener('mousedown', (event) => {
    //   this.scene.onMouseDown(event)
    // }, false);
  }

  ngOnDestroy() {

  }
}
