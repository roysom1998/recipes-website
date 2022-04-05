export class User{
    constructor(
        public email:string,
        public id:string,
        private _token:string,
        private _tokenExpirationDate:Date
    ){  }
    // a getter is a property in which we can write code.
    get token(){
        // if their is no token or if token is already expired
        if(!this._tokenExpirationDate || new Date()>this._tokenExpirationDate){
            return null;
        }
       return this._token;
    }
}