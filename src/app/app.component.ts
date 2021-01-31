import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Schnell-Schnell';
  public email = ''
  public password = ''
  private token = ''
  public invalid = ''

  
gernerateToken(){
  var time = new Date();
  var hours = time.getHours().toString();
  var minuets = time.getMinutes().toString();
  let token: string = hours + minuets;
  return token;
}

constructor(
  private httpClient: HttpClient
){}

async validate () {
 var code =  await this.httpClient.get<string>("/api/validate").toPromise()
 if(code == this.token){
   document.location.href = 'http://onecause.com'
 }
 else {
   this.invalid = "wrong username or password"
 }
}

   submit(){
  this.token = this.gernerateToken()
  this.httpClient.post("/api/validate", {
    email: this.email,
    password: this.password,
    token: this.token
  })
  this.validate()
}

}

