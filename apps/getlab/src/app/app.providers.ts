import { MAT_DATE_LOCALE } from '@angular/material/core';
import { registerLocaleData } from '@angular/common';
import ptBR from '@angular/common/locales/extra/br';
import pt from '@angular/common/locales/pt';
import { LOCALE_ID } from '@angular/core';
import { providers } from '@getlab/data-access';

export const appProviders = () => {
  registerLocaleData(pt, 'pt-BR', ptBR);

  providers.infrastructure();
  providers.useCases();
  providers.application();

  const LOCALES = [
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR',
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: ptBR,
    },
  ];

  return [...LOCALES, ...providers.transfer()];
};
