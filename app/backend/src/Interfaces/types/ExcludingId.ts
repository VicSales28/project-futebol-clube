/**
Um tipo genérico que representa uma nova entidade, excluindo a propriedade 'id'.
@template T - O tipo base do qual a nova entidade é derivada.
*/

export type ExcludingId<T> = Omit<T, 'id'>;
