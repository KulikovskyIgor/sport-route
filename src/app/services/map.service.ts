import { Http } from '@angular/http';
import { Injectable } from '@angular/core';


@Injectable()
export class MapService {

    private radius   = 3000;
    private appKey   = 'AIzaSyA2bEAEuu9sqN79e0-TVWhRfhOH-PAYWXw';
    private type     = 'gym';
    private sensor   = false;
    public entities: Object  = [];
    public entity: Object  = [];

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


    public fetchEntityDetails(placeId: string){

        return new Promise((resolve, reject) => {
            try{
                this.http.get(`maps/api/place/details/json?placeid=${placeId}&sensor=false&key=${this.appKey}`)
                    .subscribe(responce => {
                        this.entity = responce.json().result;
                        resolve(this.entity);
                    });
            }catch(e){
                reject(e);
            }
        });
    }

    public fetchPhotos(photoreference: string){

        return new Promise((resolve, reject) => {
            try{
                this.http.get(`maps/api/place/photo?maxwidth=400&photoreference=${photoreference}&key=${this.appKey}`)
                    .subscribe(responce => {
                        this.entity = responce.json().result;
                        resolve(this.entity);
                    });
            }catch(e){
                reject(e);
            }
        });
    }
}
