import { Component } from '@angular/core';
import { User } from './shared/models/user';

@Component({
    moduleId: module.id.replace("/dist","/app"),
    selector: 'my-app',
    templateUrl: './views/app.component.html'
})

export class AppComponent {
    users: User[] = [
        { id: 25, name: "Mika", username: "Viko" },
        { id: 26, name: "Tristan", username: "TriTri94" }
    ];

    activeUser: User;

    selectUser(user) {
        this.activeUser = user;
        console.log(this.activeUser);
    }
}