import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Subscription} from "rxjs";
import {JwtResponse} from "../../response/JwtResponse";
import {Router} from "@angular/router";
import {Role} from "../../enum/Role";
import {ProductService} from "../../services/product.service";
import {CardComponent} from "../../pages/card/card.component";

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {
    searchQuery: string = '';
    currentUserSubscription: Subscription;
    name$;
    name: string;
    currentUser: JwtResponse;
    root = '/';
    Role = Role;
    cardComp: CardComponent;
    productList: Object;

    constructor(private userService: UserService,
                private router: Router,
                private prodServ: ProductService,

    ) {

    }


    ngOnInit() {
        this.name$ = this.userService.name$.subscribe(aName => this.name = aName);
        this.currentUserSubscription = this.userService.currentUser.subscribe(user => {
            this.currentUser = user;
            if (!user || user.role == Role.Customer) {
                this.root = '/';
            } else {
                this.root = '/seller';
            }
        });
    }

    ngOnDestroy(): void {
        this.currentUserSubscription.unsubscribe();
        // this.name$.unsubscribe();
    }

    logout() {
        this.userService.logout();
        // this.router.navigate(['/login'], {queryParams: {logout: 'true'}} );
    }

  onSearch(value) {
    console.log('onSearch called with value:', value);
    const name = value.charAt(0).toUpperCase() + value.slice(1);
    this.prodServ.searchProducts(name).subscribe(prods => {
      this.productList = prods;
      console.log('productList:', this.productList);
    },
        error => {
      console.error('Error fetching products by category:', error);
      this.productList = [];
    });

  }
}
