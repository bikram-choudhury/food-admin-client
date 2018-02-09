import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';

import { utilityService } from './../../services/app.utility.service';
import { AuthenticationService } from './../authentication.service';

import * as _ from 'underscore';

declare var $:any;

@Component({
    moduleId:module.id,
    selector: 'login-cmp',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit{
    test : Date = new Date();
    title:string = 'BIT-POS PRO';
    login:any = {
        email:'asd@asd.asd',
        password:'asd@#$fre123APL' 
    }
    constructor(
        private authServ:AuthenticationService,
        private utils: utilityService,
        private routes: Router
    ){

    }
    checkFullPageBackgroundImage(){
        var $page = $('.full-page');
        var image_src = $page.data('image');

        if(image_src !== undefined){
            var image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>'
            $page.append(image_container);
        }
    };
    ngOnInit(){
        this.checkFullPageBackgroundImage();

        setTimeout(function(){
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 700);


        if(typeof(Storage)!=='undefined'){
            let info = sessionStorage.getItem('info') || '';
            if(info){
                let infoObj = JSON.parse(info);
                if(infoObj._id){
                    this.routes.navigate(['/dashboard']);
                }
            }
        }
    }
    onSubmit(){
        console.log(this.login);
        let loginData = {
            email : this.login.email || '',
            password : this.login.password || ''
        };
        this.authServ.loginUser(loginData)
        .subscribe(response=>{
            console.log(response);
            if(response.code > 0){
                this.utils.showNotification('top','right','warning',response.message);
            }
            else if(response.code == 0){
                // this.utils.showNotification('top','center','success',response.message);

                if(typeof(Storage)!=='undefined'){
                    sessionStorage.setItem('info',JSON.stringify(response.userInfo));
                }

                this.routes.navigate(['/dashboard']);
            }
        },this.utils.showErrorResoponse)
    }
    
}
