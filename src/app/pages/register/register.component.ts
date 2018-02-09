
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { utilityService } from './../../services/app.utility.service';
import { AuthenticationService } from './../authentication.service';

import * as _ from 'underscore';

declare var $:any;

@Component({
    moduleId:module.id,
    selector: 'register-cmp',
    templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit{
    test : Date = new Date();
    title:string = 'BIT-POS PRO';

    userData:any = {
        name:'',
        email:'',
        password:'',
        confirmPassword:'',
        termsAgreement:true
    };
    matchPasswordStatus:boolean = true;

    @ViewChild('passwordInput') password:ElementRef;
    @ViewChild('confirmPasswordInput') confirmPassword:ElementRef;

    constructor(
        private utils:utilityService,
        private authService: AuthenticationService
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
        this.clearInput();
    }
    validatePassword(){
        let password = this.password.nativeElement.value,
            confirmPassword = this.confirmPassword.nativeElement.value;
        this.matchPasswordStatus = (password === confirmPassword);
    }
    saveUser(form:NgForm){
        if(form.valid){
            console.log(form.value);
            let password = form.value.password.trim() || '',
                confirmPassword = form.value.confirmPassword.trim() || '';
            if(password != confirmPassword){
                this.matchPasswordStatus = false;
                return;
            }
            this.authService.saveUser(form.value)
            .subscribe(response=>{
                this.clearInput();
                console.log(response);
                let message = response.message;
                if(response.code > 0){
                    this.utils.showNotification('top','center','danger',message);
                }
                else if(response.code==0){
                    this.utils.showNotification('top','center','success',message);
                }
            },this.utils.showErrorResoponse)
        }
    }
    clearInput(){
        this.userData = {
            name:'',
            email:'',
            password:'',
            confirmPassword:'',
            termsAgreement:true
        };
    }
   
}
