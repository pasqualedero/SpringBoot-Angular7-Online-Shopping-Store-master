import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ProductInfo} from '../models/productInfo';
import {apiUrl} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private productUrl = `${apiUrl}/product`;
    private categoryUrl = `${apiUrl}/category`;

    constructor(private http: HttpClient) {
    }

    getAllInPage(page: number, size: number): Observable<any> {
        const url = `${this.productUrl}?page=${page}&size=${size}`;
        return this.http.get(url)
            .pipe(
                // tap(_ => console.log(_)),
            );
    }

    getCategoryInPage(categoryType: number, page: number, size: number): Observable<any> {
        const url = `${this.categoryUrl}/${categoryType}?page=${page}&size=${size}`;
        return this.http.get(url).pipe(
            // tap(data => console.log(data))
        );
    }

    getDetail(id: String): Observable<ProductInfo> {
        const url = `${this.productUrl}/${id}`;
        return this.http.get<ProductInfo>(url).pipe(
            catchError(_ => {
                console.log("Get Detail Failed");
                return of(new ProductInfo());
            })
        );
    }

    update(productInfo: ProductInfo): Observable<ProductInfo> {
        const url = `${apiUrl}/seller/product/${productInfo.productId}/edit`;
        return this.http.put<ProductInfo>(url, productInfo);
    }

    create(productInfo: ProductInfo): Observable<ProductInfo> {
        const url = `${apiUrl}/seller/product/new`;
        return this.http.post<ProductInfo>(url, productInfo);
    }


    delelte(productInfo: ProductInfo): Observable<any> {
        const url = `${apiUrl}/seller/product/${productInfo.productId}/delete`;
        return this.http.delete(url);
    }


    /**

     * @param operation - nome operaz. che fallisce
     * @param result - valore da ritornare e da mostrare
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            console.error(error); // log in console

            // Operaz. continua senza ritornar nulla
            return of(result as T);
        };
    }


  searchProducts(name: string) {
    console.log('searchProducts called with name:', name);
    const url = `${apiUrl}/product/searchPIPINO`;
    return this.http.get(url, { params: { keyword: name } });
  }

  // -----
  searchProductss(name: string, page: number, size: number): Observable<any> {
    console.log('searchProducts called with name:', name);
    const url = `${apiUrl}/product/searchPIPINOS`;
    return this.http.get(url, { params: { keyword: name, page: page.toString(), size: size.toString()  } });
  }
}
