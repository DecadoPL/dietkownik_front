export class User{
  public id: number;
  public username: string;
  public name: string;
  public surname: string;
  public gender: string;
  public email: string;
  public password: string;

  constructor(
    id: number,
    username: string,
    name: string,
    surname: string,
    gender: string,
    email: string,
    password: string,
  ){
    this.id = id;
    this.username = username;
    this.name = name;
    this.surname = surname;
    this.gender = gender;
    this.email = email;
    this.password = password;
  }
}