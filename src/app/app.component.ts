import { HttpClient} from '@angular/common/http';
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
  var code = ""
  code =  await this.httpClient.get<string>("/api/validate").toPromise()
 if(code == this.token){
  document.location.href = 'http://onecause.com'
 }
 else {
   window.location.reload()
   this.invalid = "Invalid email or password pease try again."
 }
}

  async submit(){
  this.token = this.gernerateToken()
  await this.httpClient.post<JSON>("/api/validate",{
    email: this.email,
    password: this.password,
    token: this.token
  }).subscribe()
  this.validate()
}

}

