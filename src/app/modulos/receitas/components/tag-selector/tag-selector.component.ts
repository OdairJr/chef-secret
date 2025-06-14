import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReceitasService } from '../../services/receitas.service';
import { ReceitaTag } from 'src/app/models/receita.model';

@Component({
  selector: 'app-tag-selector',
  templateUrl: './tag-selector.component.html',
  styleUrls: ['./tag-selector.component.css'],
})
export class TagSelectorComponent implements OnInit {
  @Input() selectedTags: ReceitaTag[] = [];
  @Output() tagsSelecionadas = new EventEmitter<ReceitaTag[]>();

  tags: ReceitaTag[] = [];

  constructor(private receitasService: ReceitasService) {}

  ngOnInit(): void {
    this.receitasService.listarTagsReceita().subscribe((tags) => {
      this.tags = tags;
    });
  }

  toggleTagSelection(tag: ReceitaTag): void {
    const index = this.selectedTags.findIndex((t) => t.id === tag.id);
    if (index > -1) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }

    this.tagsSelecionadas.emit(this.selectedTags);
  }

  isSelected(tag: ReceitaTag): boolean {
    return this.selectedTags.some((t) => t.id === tag.id);
  }
}
