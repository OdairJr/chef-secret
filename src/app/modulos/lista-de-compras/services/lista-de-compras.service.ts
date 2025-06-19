import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ListaDeCompras } from 'src/app/models/lista-de-compras.model';
import { Material } from 'src/app/models/material.model';
import { API_ENDPOINTS } from 'src/app/config/api.config';

@Injectable({
  providedIn: 'root',
})
export class ListaDeComprasService {
  constructor(private http: HttpClient) {}

  // criarLista(lista: Partial<ListaDeCompras>): Observable<ListaDeCompras> {
  //   return this.http.post<ListaDeCompras>(API_ENDPOINTS.listaDeCompras(), lista);
  // }

  // listarListas(): Observable<ListaDeCompras[]> {
  //   return this.http.get<ListaDeCompras[]>(API_ENDPOINTS.listaDeCompras());
  // }

  // buscarListaPorId(id: string): Observable<ListaDeCompras> {
  //   return this.http.get<ListaDeCompras>(`${API_ENDPOINTS.listaDeCompras()}/${id}`);
  // }

  // atualizarLista(
  //   id: string,
  //   lista: Partial<ListaDeCompras>
  // ): Observable<ListaDeCompras> {
  //   return this.http.put<ListaDeCompras>(`${API_ENDPOINTS.listaDeCompras()}/${id}`, lista);
  // }

  // excluirLista(id: string): Observable<void> {
  //   return this.http.delete<void>(`${API_ENDPOINTS.listaDeCompras()}/${id}`);
  // }

  // buscarMateriais(): Observable<Material[]> {
  //   const materiaisUrl = 'http://localhost:3000/materiais';
  //   return this.http.get<Material[]>(materiaisUrl);
  // }

  criarLista(lista: Partial<ListaDeCompras>): Observable<ListaDeCompras> {
    const listas = this.getLocalListas();
    const novaLista: ListaDeCompras = {
      ...lista,
      id: this.gerarId(),
      itens: lista.itens || [],
    } as ListaDeCompras;
    listas.push(novaLista);
    this.setLocalListas(listas);
    return of(novaLista);
  }

  listarListas(): Observable<ListaDeCompras[]> {
    const listas = this.getLocalListas();
    return of(listas);
  }

  buscarListaPorId(id: string): Observable<ListaDeCompras> {
    const listas = this.getLocalListas();
    const lista = listas.find((l) => l.id === id);
    return of(lista as ListaDeCompras);
  }

  atualizarLista(
    id: string,
    lista: Partial<ListaDeCompras>
  ): Observable<ListaDeCompras> {
    const listas = this.getLocalListas();
    const idx = listas.findIndex((l) => l.id === id);
    if (idx !== -1) {
      listas[idx] = { ...listas[idx], ...lista, id } as ListaDeCompras;
      this.setLocalListas(listas);
      return of(listas[idx]);
    }
    return of(null as any);
  }

  excluirLista(id: string): Observable<void> {
    const listas = this.getLocalListas().filter((l) => l.id !== id);
    this.setLocalListas(listas);
    return of(undefined);
  }

  buscarMateriais(): Observable<Material[]> {
    const materiaisStr = localStorage.getItem('materiais');
    if (materiaisStr) {
      return of(JSON.parse(materiaisStr));
    }
    return of([]);
  }

  private getLocalListas(): ListaDeCompras[] {
    const listasStr = localStorage.getItem('listas-de-compras');
    return listasStr ? JSON.parse(listasStr) : [];
  }

  private setLocalListas(listas: ListaDeCompras[]): void {
    localStorage.setItem('listas-de-compras', JSON.stringify(listas));
  }

  private gerarId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
