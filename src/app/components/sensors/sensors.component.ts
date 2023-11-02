import { Component } from '@angular/core';
import { SensorsService } from 'src/app/services/sensors.service';

interface SensorData {
  timestamp: string;
  temperature: number;
  humidity: number;
  pressure: number;
  wind_speed: number;
  noise_level: number;
  air_quality: string;
}

interface Sensor {
  _id: { $oid: string };
  sensor_id: number;
  sensor_name: string;
  data: SensorData[];
}

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.css']
})
export class SensorsComponent {
  sensors = [
    { id: 1, name: 'Sensor de Clima' },
    { id: 2, name: 'Sensor Meteorológico' },
    { id: 3, name: 'Sensor Ambiental' }
  ];

  sensorData: Sensor = {
    _id: {
      $oid: ''
    },
    sensor_id: 0,
    sensor_name: '',
    data: []
  };

  chartData: any[] = [];

  constructor(private sensorsService: SensorsService) {}

  selectSensor(sensorId: number) {
    this.sensorsService.selectSensor(sensorId);

    this.sensorsService.getSensors().subscribe((sensorData: any) => {
      this.sensorData = sensorData;
      this.updateChartData(sensorId);
    });
  }

  getAverage() {
    this.sensorsService.average();

    this.sensorsService.recibeAverage().subscribe((average: any) => {
      console.log('Lo traje bien', average)
    })
  }

  updateChartData(sensorId: number) {
    if (sensorId === 1) {
      this.chartData = [
        {
          name: 'Temperature',
          series: this.sensorData.data.map(item => ({
            name: item.timestamp,
            value: item.temperature
          }))
        },
        {
          name: 'Humidity',
          series: this.sensorData.data.map(item => ({
            name: item.timestamp,
            value: item.humidity
          }))
        },
      ];
    }

    if (sensorId === 2) {
      this.chartData = [
        {
          name: 'Pressure',
          series: this.sensorData.data.map(item => ({
            name: item.timestamp,
            value: item.pressure
          }))
        },
        {
          name: 'Wind Speed',
          series: this.sensorData.data.map(item => ({
            name: item.timestamp,
            value: item.wind_speed
          }))
        }
      ];
    }

    if (sensorId === 3) {
      this.chartData = [
        {
          name: 'Noise Level',
          series: this.sensorData.data.map(item => ({
            name: item.timestamp,
            value: item.noise_level
          }))
        }
      ];
    }
  }
}
