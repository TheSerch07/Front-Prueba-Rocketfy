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
          observer.next(sensor)
        });

        this.socket.on('sensor data change 1', (sensor: any) => {
          observer.next(sensor)
        });

        this.socket.on('sensor data change 2', (sensor: any) => {
          observer.next(sensor)
        });

        this.socket.on('sensor data change 3', (sensor: any) => {
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

  public recibeAverage() {

    return new Observable(observer => {
      try {
        this.socket.on('average', (average: any) => {
          observer.next(average)
        })

        this.socket.on('average data 1', (averages: any) => {
          observer.next(averages);
        });

        this.socket.on('average data 2', (averages: any) => {
          observer.next(averages);
        });

        this.socket.on('average data 3', (averages: any) => {
          observer.next(averages);
        });
        
      } catch(e) {
        observer.error(e)
      }
    })
  }

  public average() {
    this.socket.emit('average')
  }

  public selectSensor(sensorId: number) {
    this.socket.emit('select sensor', sensorId);
  }
}
