import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Component, ElementRef } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class WebmonetizationLibService {

  total = 0;
  scale = 0;
  assetCode = "";
  classExclusiveContent = "";
  classHiddenContent = "";
  pointer = "";

  constructor(@Inject(DOCUMENT) private document: Document,private meta: Meta,private el: ElementRef) {

        
   }

  /*
        Function name: isBrowserEnabled
        Description: Returns a boolean value specifying if WebMonetization is enabled or not in the browser.
        Parameters: none
        Returns: boolean
    */
  public isBrowserEnabled() {
    if (document.webmonetization === undefined) {
        return false;
    }
    else {
        return true;
    }
  }

  /*
        Function name: getMonetizationState
        Description: Returns a string value specifying state if WebMonetization is enabled or "Not enabled in this browser" if not enabled.
        Parameters: none
        Returns: string
    */
  public getMonetizationState() {
    if (this.isBrowserEnabled()) {
        return document.monetization.state;
    }
    else {
        return "Not enabled in this browser";
    }
  }

  /*
        Function name: registerMonetizedContent
        Description: Register classes for exclusive and hidden content when WebMonetization is in use.
        Parameters: (classExclusiveContent: string, class name with exclusive content), (classHiddenContent: string, class name with hidden content when WebMonetization is enabled and disabled)
        Returns: none
    */
   public registerMonetizedContent(classExclusiveContent, classHiddenContent){
    this.classExclusiveContent = classExclusiveContent;
    this.classHiddenContent = classHiddenContent;
  }

  /*
        Function name: start
        Description: Creates meta tag for WebMonetization and call a function if specified.
        Parameters: (pointer: string, pointer address of creator), (callbackFunction [optional]: funcion for calling after starting WebMonetization)
        Returns: none
    */
   public start(pointer,callbackFunction) {
    if(pointer === null || pointer === undefined) {
        throw new ReferenceError("pointer is required");
    }
    const monetizationTag = document.querySelector('meta[name="monetization"]');
    if (!monetizationTag) {
        var meta = document.createElement('meta');
        meta.name = "monetization";
        this.pointer = pointer;
        meta.content = pointer;
        document.getElementsByTagName('head')[0].appendChild(meta);
        if(this.isBrowserEnabled()){
            if(this.classExclusiveContent){
                document.monetization.addEventListener('monetizationstart', () => {
                  this.el.nativeElement.querySelector("."+this.classExclusiveContent).classList.remove(this.classHiddenContent)
                  });
                document.monetization.addEventListener('monetizationstop', () => {
                  this.el.nativeElement.querySelector("."+this.classExclusiveContent).classList.add(this.classHiddenContent)
                  });
            }
            
            document.monetization.addEventListener('monetizationprogress',  ev => {
                if (this.total === 0) {
                    this.scale = ev.detail.assetScale;
                    this.assetCode = ev.detail.assetCode;
                }
                this.total += Number(ev.detail.amount);
              });
        }
        
    }
    if(callbackFunction){
        callbackFunction();
    }
  }

  /*
        Function name: isPendingState
        Description: Returns a boolean value specifying if WebMonetization is in "pending" state.
        Parameters: none
        Returns: boolean
    */
   public isPendingState() {
    return this.isBrowserEnabled() && document.monetization.state === 'pending';
  }

  /*
        Function name: isStartedState
        Description: Returns a boolean value specifying if WebMonetization is in "started" state.
        Parameters: none
        Returns: boolean
    */
   public isStartedState() {
    return this.isBrowserEnabled() && document.monetization.state === 'started';
  }

  /*
        Function name: isStoppedState
        Description: Returns a boolean value specifying if WebMonetization is in "stopped" state.
        Parameters: none
        Returns: boolean
    */
   public isStoppedState() {
    return this.isBrowserEnabled() && document.monetization.state === 'stopped';
  }

  /*
      Function name: isStoppedState
      Description: Returns a boolean value specifying if WebMonetization is undefined (not enabled in browser).
      Parameters: none
      Returns: boolean
  */
 public isUndefinedState() {
      return document.monetization === undefined;
  }

  /*
        Function name: changePointer
        Description: Change meta tag for WebMonetization with new pointer and call a function if specified.
        Parameters: (pointer: string, pointer address of creator), (createIfNotExist: boolea, creates meta tag if not exists),(callbackFunction [optional]: funcion for calling after starting WebMonetization)
        Returns: none
    */
   public changePointer(pointer, createIfNotExist = false,callbackFunction) {
    if(pointer === null || pointer === undefined) {
        throw new ReferenceError("pointer is required");
    }

    const monetizationTag = document.querySelector('meta[name="monetization"]');
    if (monetizationTag) {
        this.pointer = pointer;
        monetizationTag.setAttribute("content",pointer);
        if(callbackFunction){
            callbackFunction();
        }
    }
    else {
        if(createIfNotExist) {
            this.start(pointer,callbackFunction);
        }
    }
  }

  /*
        Function name: registerStartListener
        Description: add listener to monetizationstart event.
        Parameters: (listenerFunction: function)
        Returns: none
    */
   public registerStartListener(listenerFunction) {
    if (this.isBrowserEnabled()) {
        document.monetization.addEventListener('monetizationstart', () => {
            listenerFunction()
        });
    }
  }

  /*
        Function name: registerProgressListener
        Description: add listener to monetizationprogress event.
        Parameters: (listenerFunction: function)
        Returns: none
    */
   public registerProgressListener(listenerFunction) {
    if (this.isBrowserEnabled()) {
        document.monetization.addEventListener('monetizationprogress',  ev => {
            listenerFunction();
          });
          
    }
  }

  /*
        Function name: getTotalAmountFromCurrentUser
        Description: return the total amount got from current user
        Parameters:
        Returns: Number
    */
   public getTotalAmountFromCurrentUser(){
    return this.total;
  }

  /*
        Function name: getScaleFromCurrentUser
        Description: return the scale for payment from current user
        Parameters:
        Returns: Number
    */
   public getScaleFromCurrentUser(){
    return this.scale;
  }

  /*
        Function name: getCurrentPointer
        Description: return the wallet pointer for payment
        Parameters:
        Returns: string
    */
   public getCurrentPointer(){
    return this.pointer;
  }

  /*
        Function name: getAssetCodeFromCurrentUser
        Description: return the asset code for payment from current user
        Parameters:
        Returns: String
    */
   public getAssetCodeFromCurrentUser(){
    return this.assetCode;
  }

  /*
        Function name: registerStopListener
        Description: add listener to monetizationstop event.
        Parameters: (listenerFunction: function)
        Returns: none
    */
   public registerStopListener(listenerFunction) {
    if (this.isBrowserEnabled()) {
        document.monetization.addEventListener('monetizationstop', () => {
            listenerFunction()
        });
    }
  }

  /*
        Function name: registerPendingListener
        Description: add listener to monetizationpending event.
        Parameters: (listenerFunction: function)
        Returns: none
    */
   public registerPendingListener(listenerFunction) {
    if (this.isBrowserEnabled()) {
        document.monetization.addEventListener('monetizationpending', () => {
            listenerFunction()
        });
    }
  }

  /*
        Function name: executeOnUndefined
        Description: execute a function if WebMonetization is undefined in web browser.
        Parameters: (callbackFunction: function)
        Returns: none
    */
   public executeOnUndefined(callbackFunction) {
    if (this.isUndefinedState()) {
        callbackFunction();
    }
  }

  /*
        Function name: stop
        Description: Remove WebMonetization for web page.
        Parameters: (callbackFunction [optional]: funcion for calling after stop WebMonetization)
        Returns: none
    */
   public stop(callbackFunction) {
    const monetizationTag = document.querySelector('meta[name="monetization"]')
    if (monetizationTag) {
        monetizationTag.remove();

        if(callbackFunction){
            callbackFunction();
        }
    }
  }
}
