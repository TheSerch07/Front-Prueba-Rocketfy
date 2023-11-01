import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SensorsService {

  constructor(private socket: Socket) { }

  public getSensors() {
    
    return new Observable(observer => {
      try {
        this.socket.on('connect', () => {
          console.log('Conected to server')
        })

        this.socket.on('select sensor', (sensor: any) => {
          console.log(sensor)
          observer.next(sensor)
        });

        this.socket.on('sensor data change 1', (sensor: any) => {
          console.log(sensor)
          observer.next(sensor)
        });

        this.socket.on('sensor data change 2', (sensor: any) => {
          console.log(sensor)
          observer.next(sensor)
        });

        this.socket.on('sensor data change 3', (sensor: any) => {
          console.log(sensor)
          observer.next(sensor)
        });

        this.socket.on('disconnect', () => {
          console.log('Disconnected to server')
          observer.complete()
        })

      } catch(e) {
        observer.error(e)
      }
    })
  }

  public selectSensor(sensorId: number) {
    // Envía una solicitud al servidor para seleccionar un sensor por su ID
    this.socket.emit('select sensor', sensorId);
  }
}
