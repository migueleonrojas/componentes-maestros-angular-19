import { Routes } from '@angular/router';

export default [
   {
      path: 'graphs',
      loadComponent: () => import('./pages/graphs/graphs.component').then(c => c.GraphsComponent)
   },
   {
      path: 'form-graph',
      loadComponent: () => import('./pages/form-graph/form-graph.component').then(c => c.FormGraphComponent)
   },
   {
      path: 'video',
      loadComponent: () => import('./pages/video/video.component').then(c => c.VideoComponent)
   },
   {
      path: 'chat',
      loadComponent: () => import('./pages/chat/chat.component').then(c => c.ChatComponent)
   }

] as Routes;