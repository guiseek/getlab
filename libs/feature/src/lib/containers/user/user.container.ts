import {
  User,
  UserFacade,
  UpdateUserDto,
  CreateUserDto,
} from '@getlab/data-access';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialog } from '../../components';
import { EntityContainer } from '../base';
import { UserForm } from '../../forms';

@Component({
  selector: 'getlab-user',
  templateUrl: './user.container.html',
  styleUrls: ['./user.container.scss'],
})
export class UserContainer extends EntityContainer<User> implements OnInit {
  form = new UserForm();

  destroyRef = inject(DestroyRef);

  override label = 'Usuário';

  bpObserver = inject(BreakpointObserver);
  userFacade = inject(UserFacade);
  route = inject(ActivatedRoute);

  columns$ = this.bpObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    map((match) => {
      return match
        ? ['ref', 'update', 'remove']
        : ['ref', 'name', 'update', 'remove'];
    }),
    shareReplay()
  );

  ngOnInit() {
    this.userFacade.load();

    this.destroyRef.onDestroy(() => {
      this.userFacade.clearUser();
    });

    this.userFacade.user$.pipe(takeUntil(this.subject)).subscribe((user) => {
      if (user) {
        this.form.patchValue(user);
        this.formEl.scrollIntoView({
          behavior: 'smooth',
        });
      }
    });

    this.route.params.pipe(takeUntil(this.subject)).subscribe(({ id }) => {
      if (id) this.userFacade.findUser(id);
    });
  }

  @ConfirmDialog<User>({
    title: 'Remover turma',
    message: 'Tem certeza de que deseja continuar esta ação?',
    prop: 'ref',
  })
  onRemove({ id }: User) {
    if (id) this.userFacade.removeUser(id);
  }

  create(value: CreateUserDto) {
    this.userFacade.createUser(value);
  }

  update(value: UpdateUserDto) {
    this.userFacade.updateUser(value);
  }
}
