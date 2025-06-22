import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-lista-de-usuarios',
  templateUrl: './lista-de-usuarios.component.html',
  styleUrls: ['./lista-de-usuarios.component.scss'],
})
export class ListaDeUsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  carregarUsuarios(): void {
    this.usuariosService.listarUsuarios().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
      },
      error: (err) => {
        console.error('Erro ao carregar usuários:', err);
      }
    });
  }

  promover(id?: number): void {
    if (!id) return;
    this.usuariosService.grantAdmin(id).subscribe({
      next: () => {
        const user = this.usuarios.find((u) => u.id === id);
        if (user) {
          user.is_admin = true;
          console.log(`Usuário ${user.name} promovido a admin.`);
        }
      },
      error: (err) => {
        console.error('Erro ao promover usuário:', err);
      }
    });
  }

  removerAdmin(id?: number): void {
    if (!id) return;
    this.usuariosService.revokeAdmin(id).subscribe({
      next: () => {
        const user = this.usuarios.find((u) => u.id === id);
        if (user) {
          user.is_admin = false;
          console.log(`Permissão de admin removida para ${user.name}.`);
        }
      },
      error: (err) => {
        console.error('Erro ao remover permissão de admin:', err);
      }
    });
  }

  excluir(id?: number): void {
    const user = this.usuarios.find((u) => u.id === id);
    if (user && confirm(`Tem certeza que deseja excluir ${user.name}?`)) {
      this.usuarios = this.usuarios.filter((u) => u.id !== id);
      console.log(`Usuário ${user.name} excluído.`);
    }
  }
}
