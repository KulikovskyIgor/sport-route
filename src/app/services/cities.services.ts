import { Http } from '@angular/http';
import { Injectable } from '@angular/core';


@Injectable()
export class MapService {

    private radius   = 1000;
    private appKey   = 'AIzaSyA2bEAEuu9sqN79e0-TVWhRfhOH-PAYWXw';
    private type     = 'gym';
    private sensor   = false;
    public entities: Object  = [];

    constructor(private http: Http) {
    }

    public fetchEntities(lat: number, lon: number){

        return new Promise((resolve, reject) => {
            try{
                this.http.get(`maps/api/place/search/json?location=${lat},${lon}&radius=${this.radius}&types=${this.type}&sensor=${this.sensor}&key=${this.appKey}`)
                    .subscribe(responce => {
                        this.entities = responce.json().results;
                        resolve(this.entities);
                    });
            }catch(e){
                reject(e);
            }
        });
    }
}
