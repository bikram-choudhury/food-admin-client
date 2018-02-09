import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()

export class AuthService {
    constructor(private routes: Router) {}
    
    isLoggedIn(){
        if(typeof(Storage) !='undefined'){
            let loginInfo = sessionStorage.getItem('info'),
                info;
            if(loginInfo){
                info = JSON.parse(loginInfo);
            }
            return info && info._id;
        }
    }
}
